---
title: Why do I Use Custom React Hooks?
description: React hooks exist, but sometimes it can be hard to know when to use a custom hook to make your state more maneuverable.
date: "September 8, 2021"
banner: /images/react hooks.png
tags: react,hooks
published: true
---

If you're like me, you know hooks exist and you know you can make your own, but you might not be sure how to do that, or why. In this article, I'm going to try to explain when you can use custom React Hooks to clean up your code and abstract your state.

## Why do I use custom hooks?

Custom React Hooks are fantastic at abstracting your state away from any one component and allowing other components to tap into that data. I've refactored a few large apps of mine using custom hooks. A huge benefit of this refactor was being able to share my state across a couple components without worrying about messing it up.

Having your state encapsulated in its own function ensures that wherever that state is used, it'll be consistent. You won't have to worry about passing state down through props to child components, just call the function!

## Make sure your custom hook begins with "use"

When you're building your own React Hook, our hooks must begin with "use". As silly as it may sound sometimes, that's how it's done. If you're building a hook to store the current user, you would create your own `hooks` folder and inside it, you would have `useUser.js` which would also be the name of the hook itself!

I like to show examples of what I'm talking about because that's just how I learn.

Let's look at a barebones `useUser` hook:

```
export const useUser = () => {
  const [currentUser, setState] = useState()

  const setUser = data => {
    setState(data)
  }

  return {
    currentUser,
    setUser
  }
}
```

When we want to take advantage of this custom hook, inside the component you want to access this state, you would include:

```
export const SomeComponent = () => {
  const {currentUser} = useUser()
  /* code */
}

```

## You can pass in an initial state too

A cool thing about writing a custom React Hook is, among other things, you can pass in an initial state, just like you can with the useState hook (because useState is just a hook anyway).

I'm not sure if it necessarily needs to be said, but, here is how we would initialize our state in our custom React Hook with existing data.

Copying our previous example:

```
export const useUser = (initialState) => {
  const [currentUser, setState] = useState(initialState)

  const setUser = data => {
    setState(data)
  }

  return {
    currentUser,
    setUser
  }
}
```

As you can see, we pass our hook some data that gets passed to useState.

```
export const SomeComponent = () => {
  const {currentUser} = useUser({
    name: "Tyrel"
  })
  /* code */
}

```

So now when our `currentUser` state is initialized, it will have `{name: "Tyrel"}` already existing inside its state.

This makes it pretty easy to say pull data from an API, then pass it into a custom hook with some other functionality.

## You don't always need a custom hook

I'm no expert, but you don't always need a custom hook.

As I've already mentioned, using custom React Hooks is great for using state across multiple components. If you need to keep track of certain data and it's scoped to only one component and maybe any children and doesn't need to be accessed anywhere else, `useState` within that particular component is acceptable. Don't make things any more complicated than they need to be.

Using my own hooks has changed the way my code looks and operates and it makes me a better developer!

If you would like to read more about custom hooks, check out [React's official documentation](https://reactjs.org/docs/hooks-custom.html)
