---
title: "Build a Reddit Scraper: Composing Messages"
description: Today let's talk about composing and sending messages via the Reddit API using JavaScript and React (is that good SEO?).
date: "July 12, 2021"
tags: "react,javascript,reddit,api"
published: true
banner: /images/oe51ziw64u0g0usp9xbk.jpeg
---

Today let's talk about composing and sending messages via the Reddit API using JavaScript and React (is that good SEO?).

This requires that the user has said "ok" to you using their account, in fact, the majority of what I'm talking about is based off that.

So let's assume they said "ok" and you've set up your form and all we need to do is access that info and send a message with the API.

The context of this post will be in our confirm message component. This is the part where we have selected our posts and are ready to send our messages.

## **Creating Our Submit Handler**

The link we will be making our post call to, is:

```
https://oauth.reddit.com/api/compose
```

Because we originally authenticated using the OAuth method, we need to make calls to the OAuth subdomain endpoint `api/compose`.

The tricky part was that you can't just send a post body request like normal, but instead we have to create some FormData. This is the way I ended up getting it to work, maybe there's a better way!

Let's pick apart the function.

```js
export const sendMessageToAuthors = async (
  author,
  subject,
  message,
  removeMessagedAuthor
) => {
  const tokens = await fetchTokens().catch((err) => false);
  const fmtSubject = subject;
  const link = `https://oauth.reddit.com/api/compose`;

  if (!tokens || !author) return toast.error("Something went wrong");
  if (!message) return toast.error("A messaged is needed to send");
  if (!fmtSubject) return toast.error("A subject is needed");
};
```

The reason why I stored my tokens for Reddit in the database was because I can now fetch them whenever and wherever I need them. I thought what might happen if local storage got cleared, or this or that. Atleast I know these tokens are always up to date because whenever the app is loaded, the app takes the refresh_token in the database, asks Reddit for a new access_token, then saves it to the user by passing the JWT token saved in localstorage, to the database.

So, we call that function to get our tokens which we will use to handshake with Reddit, which is to say, we will use it to show Reddit we are authenticated.

Because the ability to send messages is a power that requires great responsibility, the checks have to be on point. If anything is missing, we return, if anything is falsey, we return. This will prevent situations where perhaps we send a message and the title is `undefined`.

#### **Formatting Our FormData**

The next portion of the function, which will be added below our validation checks, is:

```js
const body = new FormData();
body.set("to", `/u/${author}`);
body.set("subject", fmtSubject);
body.set("text", message);
await Axios.post(link, body, {
  headers: {
    Authorization: `bearer ${tokens.access_token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
  .then((res) => {
    toast.success(`Message sent to ${author}`);
    removeMessagedAuthor();
  })
  .catch(console.log);
```

If any of our variables are empty, we immediately return and run away.

Otherwise, we start setting our form data. Your username is technically a "subreddit" according to the Reddit API, I was confused by that. That's why we need `/u/` before our actual author's name. I'm assuming it stands for a user's endpoint, but is referred to as a subreddit in the docs.

Instead of doing the encryption we did before, in the original request to get our tokens, we instead include our access_token as the bearer token. The `x-www-form-urlencoded` portion is also very important.

Why you ask? Because it sends our `author`, `subject`, and `message` as key/value pairs separated by `&` for each pair, and assigned using `=`. More info on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).

It's just another way to tell the server what type of data we are sending; what the structure is.

The toast is just sending a notification and removing the author is just a personal touch from me. What it does, is it automatically removes the author you sent a message to, from the list of total selected messages. This is useful for rapidly sending messages. Whereas before you'd send a message, click next, send, next etc., now it'll automatically go to the next one ultimately by resetting the index to 0 (more on that later).

#### **Save Our Author to the Database**

Just in case you're interested. For our Reddit scraper in this particular use case, I save the author to the database because our app will automatically choose between two different saved messages that I'll show you about once we get to the account page.

```js
export const saveAuthorToDb = async (author, postId) => {
  const token = window.localStorage.getItem("token");
  await Axios.post(
    `${process.env.REACT_APP_BACKEND}/api/profile/saveAuthors`,
    {
      author,
      postId,
    },
    {
      headers: {
        token,
      },
    }
  )
    .then()
    .catch(console.log);
};
```

We send the name of the author to our backend and save it. Then, when we retrieve it, we can cross reference with the author of the currently displayed author and go from there.

```js
const messageHandler = () => {
  let authorExists = false;

  userProfile.authorsMessaged.map((x) =>
    x === data.author ? (authorExists = true) : null
  );

  if (authorExists) {
    setDefaultMessage(userProfile.altMessage);
  } else {
    setDefaultMessage(userProfile.defaultMessage);
  }
};
```

#### **Handling Our Component State**

```js
const [defaultMessage, setDefaultMessage] = useState("");
const [subject, setSubject] = useState("");
const [redditProfile, setRedditProfile] = useState({});

useEffect(() => {
  setSubject(data.title);
  const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

  setRedditProfile({ ...profile });
}, [data.title]);

useEffect(() => {
  messageHandler();
}, [data]);
```

The reason why I did the state this way, is because if you need to make an adjustment to the current title, or message body, you can, and it won't affect the next post. It becomes prefilled with the message you've created, or, you can add you're own.

The useEffect's are just updating our state when the app mounts and when either data or data.title changes (you can reference the messageHandler function in the prior snippet).

That's about it! Just build out the UI as you'd like, and this info will helpfully get you going with sending messages!

At the time of writing, I don't have a loader on the button. I'd recommend this. When someone sends a messages, a loader should replace the button. This, to me, is just good UX and by getting rid of the button, it can prevent spamming.

I hope you enjoyed this post, now go make yourself an awesome Reddit scraper using JavaScript and React (more SEO, I think).

Bye!
