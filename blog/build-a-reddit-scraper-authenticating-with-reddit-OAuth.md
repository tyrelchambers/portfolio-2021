---
title: "Build a Reddit Scraper: Authenticating With Reddit OAuth"
description: We’re continuing our series on Build a Reddit Scraper. This will be done using JavaScript!
date: "July 12, 2021"
published: true
banner: /images/g2qx8odzn4c4ouw1xi4y.jpeg
tags: react,javascript,reddit,api
---

### **Create Your Reddit Developer App**

We’re continuing our series on Build a Reddit Scraper. This will be done using JavaScript!

To get started with authenticating with the Reddit API, we need to create a developer app that will allow us to actually use the more advanced features of Reddit’s API.

For reference, you can find everything I’m talking about, here: https://github.com/reddit-archive/reddit/wiki/oauth2

I’ll walk you through what I did to create a pretty stable system in my eyes. I’ve done a bunch of different tests - but that’s subjective.

### **Finding The Right Scope**

Alright, the first thing we need to do is direct the user to a special endpoint that will present them with a choice to either give our app permission to authenticate with their account, or not.

You’ll have to fill out the certain portions yourself that call for your app name and secret. You can find these values on the page where you created your Reddit app on their website.

My link looks like this -

```
    const link = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_APP_NAME}&response_type=code&state=RANDOM_STRING&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup&duration=permanent&scope=privatemessages identity`;
```

The documentation does a pretty good job of explaining each individual requirement here, but one thing that tripped me up was try to interpret the actual documentation when it comes to figuring out what scopes you need.

The scope is: what parts of a user’s profile will you need access to? As you can see, with my app, I want to be able to see get the user’s profile itself, so I chose Identity, and I need to be able to send/receive private messages.

If you go to [reddit dev api](https://reddit.com/dev/api) you can see a list of documentation. It’s pretty overwhelming at first and there isn’t a whole lot to help guide you through it. Hopefully I can help with that.

In the left sidebar, it shows you the endpoints that you can access. Look for what you think you’ll need in terms of access, and at the top of that particular section, you’ll find the scope. This scope is what you will need to add into the scope section of the url above.
If you need more than one scope, make sure to add a space between each scope item.

Beside each subtitle in the main column of content on the right, you can also find the REST action that represents that endpoint, and the scope that will be needed to access it (the green rectangle).

So now we have access to our scopes. You can throw that link into a function that gets called on click or something, and have the browser open a new tab, or just change the url in the current tab. The user will be taken to Reddit where they will then allow or deny your app.

If they approve it or deny it, they will be redirected back to your app, to the URL specified when you first created the Reddit app. The redirect uri is the URL that Reddit will redirect to after they have made a decision, so make sure you’re redirecting back to the page that is handling your signup process.

### **Getting The Access Token**

Now the user has hypothetically said “yes” to our app’s request.

We now have to make a post request to another endpoint. But before we can do that, we need to parse the URL query parameters.

When the user is redirected back, the URL includes a “code” parameter that we’ll use to make our POST request to that URL.

```
    const getParams = () => {
    const params = (new URL(window.location)).searchParams;
    const approvalStatus = params.get("code") ? params.get("code") : false;

    if ( approvalStatus !== false ) {
      UserStore.getAccessToken(approvalStatus).then(res => {
        setCredentials({...credentials, access_token: res.access_token, refresh_token: res.refresh_token})
      }).catch(console.log);
      setFlow(2);
      setApproved(true);
    }
  }
```

In case it helps you, there is my code that parses the URL, then does it’s thing in terms of parsing the URL and deciding what to do after.
It then calls another function which is the meat and potatoes of our auth flow.

```
  getAccessToken = async (token) => {
    if (!token) return null;
    const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
    const redditTokens = await Axios.post('https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${token}&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup`,
    {
      headers: {
        "Authorization": `Basic ${encode}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      if (res.data.error) {
        return toast.error("Please re-authenticate");
      };
      return res.data;
    })
    .catch(console.log);


    return redditTokens;
  }
```

If this is successful, you’ll be golden, but only for an hour, then you’ll need to get another code.

When we parse the URL and pull out the “code” parameter, we use that to get our access token which I passed into the above function.

We have to make a POST request to

```
https://www.reddit.com/api/v1/access_token
```

where the body of the request is

```
grant_type=authorization_code&code=${token}&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup
```

We take our code we previously got, and pass it into the code portion of the new URL (just a bunch of confirmations at this point). Make sure to read the OAuth2 documentation I mentioned at the very beginning of this article, it will help you know how to build the link to POST to.
We have to make sure we also encode our app secret and app name and include that in our Authorization header. This was a bit tricky for me to understand at first, mainly how to encode it. They don’t show you flat out how to do it, but mainly allude to it. After some googling and help from a friend, we came to this:

```
window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
```

Which works!

The function getAccessToken is called once we receive the go ahead to authenticate with Reddit. Once that finishes, we are all set.

The problem comes when, after an hour, we need to make another request to an OAuth endpoint.

What I did was created a backend for my app which holds my user model. During the sign up process, I send the access token and refresh token, and save it to the database.

I also created a function that retrieves those tokens. In another post, I’ll go over the auth flow with my actual backend and not Reddit.

Every time my app loads, just for the sake of easiness, I call the function that refreshes my access token.

```
export const renewRefreshToken = async () => {
  const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
  const token = await fetchTokens();
  const jwt = window.localStorage.getItem('token');


  if ( !token || !token.access_token ) return null;


  await Axios.post('https://www.reddit.com/api/v1/access_token',
    `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
  {
    headers: {
      "Authorization": `Basic ${encode}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    saveTokensToDb(res.data.access_token, token.refresh_token, jwt);
    getCurrentAuthenticatedUser(res.data.access_token);
  })
  .catch(console.log);
}
```

The important part is calling the fetchTokens function and waiting for it to finish because what that does is, grabs our locally (localStorage) saved JWT token, decodes it on the backend, and uses the user ID to look up the user.

It then returns both tokens, which allows the code to work. I haven’t run into any issues so far, doing it this way.

Hopefully this sheds light on how to navigate the Reddit docs in a basic way, and hopefully it will help you on your way to authenticating with Reddit using JavaScript. I’ll be attempting to write more posts in this series, if you made it this far, thanks so much for reading!
