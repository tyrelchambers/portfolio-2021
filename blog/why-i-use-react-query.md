---
  title: Why I use React Query
  description: React Query has quickly become my go-to tool for executing API calls
  date: "September 4, 2021"
  published: true
  tags: react,react query
  banner: /images/react-query.png
---

I tend to write my APIs as REST. However, when I implemented GraphQL in one of my projects, I loved the way it provided its fetching status, data and other information.

Being able to control your UI via variables such as `isLoading`, was a lot of fun.

I used to try and write my own solid way to fetch data from my APIs but controlling my UI becomes a chore. For example, not loading a page before certain data came in used to be more hit or miss than anything else.

I'd heard of React Query, but I wasn't exactly sure what it did and why I should use it. Like any new project, I decided I'd give it a shot because I like to incorporate something new in every new project. What I was left with was an amazing experience.

It behaves similarly to GQL in the sense that you have access to a bunch of variables that give you finer control over your calls and therefore, over your UI. **Not only that**, but it can also replace your global state management.

I'm by no means an expert on React Query as I've just started using it myself, but maybe I can help you make the decision to give it a try.

## How it can replace global state management

This confused me greatly when I first began using React Query. I wasn't sure how I could get a user, for example, save the data, and use it somewhere else without making a needless call.

When React Query makes a call, the data is cached (this is your "state"). This means that instead of making another call, it will serve up the data it has in its cache and give it to you. When that becomes stale, it will fetch from the API and the process repeats. You can also specify how long data should stay fresh (stay in the cache without being fetched) and you can also invalid other queries, but let's not get ahead of ourselves.

In one of my projects, I replaced 90% of my global state with the help of React Query.

## How React Query is used

**_This may or may not be correct so please don't call me trash on the internet or I'll tell my mom._**

I think in order to effectively communicate what I'm thinking, I like to use pictures so I can walk you through my code.

I'll give you the full snippet here, then break it down piece-by-piece to try and explain it better.

```
// hooks/mutations/useLogin.js
export const useLogin = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutate } = useMutation((data) => login(data), {
    onSuccess: (res) => {
      queryClient.invalidateQueries("currentUser");
      const { token } = res.data;

      window.localStorage.setItem("token", token);
      history.push("/dashboard");
    },
  });

  return mutate;
};
```

If you're familiar with GraphQL, then this will look a little familiar to you and it's what I loved about React Query.

I encourage you not to copy this code if you're learning it for the first time but type it out yourself so you burn that into your memory banks.

Our useMutation function takes in whatever data we pass to it. If you were to look at my LoginForm, you would see a line of code like this:

```
  const login = useLogin()
  login({firstName: "tyrel", lastName: "chambers"})
```

Whatever data you pass to your "login" function (it can be whatever name you want it to be), will get passed as an argument in our useMutation function in our hook. The `login(data)` piece you see there, is the API call we make with the data we passed in from the actual login form. In our case, it's the email and password of the user. Now we can send this to the server to be validated and have our user returned.

In my case, I have a function called **login**.

```
// api/login.js
export const login = ({ email, password } = {}) => {
  return request.get("/login", {
    params: {
      email,
      password,
    },
  });
};
```

Just for the sake of clarity, I've included the function that makes the actual API call.

### We have our user, now what?

Within React Query's mutation and query functions, we have access to the property `onSuccess`. This does what you think it would do, when the query or mutation finishes in a successful state, execute _this_ code.

```
  onSuccess: (res) => {
    queryClient.invalidateQueries("currentUser");
    const { token } = res.data;

    window.localStorage.setItem("token", token);
    history.push("/dashboard");
  },

```

In my `onSuccess` block, I invalidate my initial user query.

You can name queries, you see. This is so if you need to invalidate some data (which means to force React Query to fetch it again from an API). The beauty about this is you can use invalidating queries in tandem with your cache (and stale times) to create an effective system for your API calls. When I invalidate my `currentUser` query, this means that React Query will make a call to the database to fetch my authorized user instead of using the cached version. This is also helpful if you update your user's profile or account in your web app. You can invalidate that query which would force React Query to fetch from the API again, which returns and caches an up-to-date user object. It's pretty wicked.

The rest of the block is saving the JWT I receive and redirecting to the dashboard.

## Accessing React Query's cache

React Query really makes working with API and data, fun. Rather than setting up stores to save my current user (or really anything else), we can use React Query's caching ability. That's where I got a little confused on how to access that data.

I'll provide another quick example of how you can use React Query's caching ability as your data store.

```
export const useUser = () => {
  const token = window.localStorage.getItem("token");
  const info = useQuery("currentUser", getUser, {
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  return { ...info, user: info.data };
};
```

This is my hook that queries my database for the current authorized user. I supply my JWT and off it goes. When it comes back, I set a longer stale time because it's unlikely the user object will change and when it does change, I'll invalidate it anyway and force React Query to fetch an updated user object.

Here is how it is used:

```
  const { isLoading, user } = useUser();
```

When the function `useUser()` is called, it'll do one of two things. First, it'll check to see if this data in its cache is fresh (the data being my user object) and if it isn't it'll do the second action which is fetching the user from the database. So it'll either use the user in cache or it'll fetch a new one.

I thought that if I included `useUser()` that it would call the API regardless so I wasn't sure how to use React Query to avoid that. What I found out is that all I have to do is execute that function call and let React Query do the rest. It'll check its cache and determine whether or not to make a call.

## Conclusion

React Query has been an absolute delight to work with. Going from an unstructured, unopinionated way of making API calls and controlling the flow of information to my UI, to one that gives me finer control over how things flow, makes my code feel more stable. I can count on the data I need, to be there and with the variable they expose, I can control the state of my UI by hiding pages or waiting on data to arrive before proceeding in a more effective manner.

I would 100% recommend you take the time to learn this technology if you're looking for a fun way to make API calls :)

And that ladies and gentlemen, is Why I use React Query.
