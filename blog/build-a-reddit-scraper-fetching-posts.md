---
title: "Build a Reddit Scraper: Fetching Posts"
description: The first step to making our Reddit scraper an actual product, is getting actual posts. I live in the nosleep subreddit, but you can substitute any subreddit and it will be the same result.
date: "July 12, 2021"
tags: "react,javascript,reddit,api"
published: true
banner: /images/68ifs9prng25wqdmlxm8.jpeg
---

### **Getting Our Posts**

The first step to making our Reddit scraper an actual product, is getting actual posts. I live in the nosleep subreddit, but you can substitute any subreddit and it will be the same result.

If you visit [nosleep](https://reddit.com/r/nosleep.json), we can see a crap load of JSON. This is great because we can work with this.

This JSON is a representation of the data on the website and it’ll be the base on which we build our scraper. Every subreddit has a JSON extension that can be used to access that data. They also have a few other queries we can use like: ?limit or ?count. But, we won’t need to use that as we want it to default to its highest value.

Because of Reddit’s API and the way the data is given to you, you can’t grab all subreddit posts at once, we need to make multiple calls to the same url, but modifying the ‘after’ property as we go.

The after property specifies the next group (~250) items to grab, sort of like pagination.

```
export const fetchPosts = async (subreddit, setLoading, setPosts, category) => {
  const sr = subreddit.replace(/\s/g, '').trim();
  let endpoint = "";

  const link = `https://www.reddit.com/r/${endpoint}`;
  let posts = [];
  let after = ``;
  if ( !sr || sr.length === 0 ) return alert("Must include a subreddit");

  for ( let i = 0; (i < 10 && after !== null); i++ ) {
    await Axios.get(`${link}&after=${after}`).then(res => {
      after = res.data.data.after;
      posts = [...posts, ...res.data.data.children];
    }).catch(err => err);
  }

  return setLoading(false);

}
```

This isn’t the full function. I’ve removed some lines that aren’t directly fetch oriented.

The main gist of this function is to make our API calls to Reddit. I want to mainly focus on the for loop with the get request inside it. Chrome yells at me about making functions inside loops so maybe look at a better way of doing this, but anyway here we are so let’s continue.

We want to loop until the after property becomes null. Since Reddit only returns up to about 1000 posts, we can just set our limit at 10.. It’s arbitrary, I’ll probably just loop until after is null instead of limited the variable count, but it’s moreso there as a fail safe.

So, we need to define and attach the after query, you can do this as I’ve done or add it after the first loop, whatever, but the main thing I had to do was use the current after property, on the next request. This way, we can continue looping and calling, while stepping through the pagination style of Reddit’s API. If we didn’t change this value, it would keep grabbing the same set of data until i === 10.

After each successful request, we spread the data that contains our posts, into a variable that we later use to save to our database. We also update our ‘after’ variable with the value from that request.

The whole process takes about 10 seconds to get up to 1000 posts (it’s hit or miss how much is actually returned).

At the end of that function, we set our loading state back to false. If we don't, it will continue showing our loader and that is just counter productive.

Moving on.

```
  posts.shift();
  posts.map(x => results.push(x.data));
  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToLocalStorage(subreddit);
  await setPosts([...results]);
  return setLoading(false);
```

This is a bit nasty to look at but, it works for me (once I refactor this, I’ll update the article). At this point we have setup our indexedDb database, don’t worry, I’ll go over how to do that.

I delete the first entry because it’s usually some announcement from Reddit that isn’t an actual post.

What I had to do was create another array that I could spread into, the actual, literal data we will be using. The reason why I did this was because it made sense in my mind’s natural data flow.

In order to make sure we don’t have duplicate data, or data from another subreddit etc., I deleted every post from the current database and then saved to the database, the data we just received. At this point, everything is up to date.

I then saved the subreddit, but that’s just for UI purposes and it’s a bit janky right at this moment, but it works. Following that, I update our local component state. This is useful for filtering.

```
export const saveToDatabase = async (posts) => {
  const newPosts = [];
  posts.map(x => newPosts.push(x.data));

  await newPosts.map(x => {
    return window.db.posts.add({
      author: x.author,
      title: x.title,
      selftext: x.selftext,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created: x.created,
      flair: x.link_flair_text
    });
  });
  return true;
}
```

Here is the function that I’ve created to save our data. In order to have control over what I’m saving and it’s format, I created a new array. Because the data we have at this point, is inside a ‘data’ object, I didn’t want to save it like that and have to type ‘x.data.author (for example)’, I’d rather type ‘x.author’.

The ‘window.db’ is a reference to a global variable I made in order to access my Dexie database, everywhere, this will be changed at some point as I continue refactoring and I will update this article.

At this point, our posts are currently being displayed because they are saved in state, but we refresh, or close our browser, and come back… it still won’t work… and this is because of the format is currently in.

If we step back and look at:

```
 posts.map(x => results.push(x.data));
```

This is the data we push to our state. We push the results array that is in the same format as the data in our database. And the reason we do that, is because when the component loads:

```
  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, []);
```

We pull the data from our database and load it into our state.

In case you wanted to see the function that gets our posts:

```
export const getPostsFromDatabase = async (setPosts) => {
  const db = window.db;
  const posts = await db.posts.toArray();
  return setPosts([...posts]);
}
```

This just fetches the data in our posts collection and then sets our state with that data.

The final step to displaying our data onto our page is just mapping our the state that holds our posts. I don’t want to confuse you by showing you what I’ve done, but the next step from this would be to, as I said, map over the state and display each piece of data as you’d like.

I hope this has helped point you in the right direction to building your own scraper! More to come.
