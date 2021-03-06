---
title: "Build a Reddit Scraper: Setting up Dexie.js"
description: Welcome! Today I want to walk you through the basics of setting up Dexie.js.
date: "July 12, 2021"
tags: "react,javascript,reddit,api"
published: true
banner: /images/32nzezokpzaht9h2tz2l.jpeg
---

Welcome! Today I want to walk you through the basics of setting up Dexie.js.

What Dexie is, is a wrapper around IndexedDb. It allows you to save more data than localStorage or sessionStorage could (they hold up to 5mb of data each). If you need to go above that, you can use IndexedDB. In most situations, I wouldn't really recommend it, especially if it's data that needs to persist. However for this scraper, whether the posts we pulled will get wiped or not, doesn't matter, we can just pull them again.

If you'd like to read up more on IndexedDb or Dexie, go to [IndexedDb](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and [Dexie](https://dexie.org/).

Dexie is actually fun to use, simple to setup, and their docs are developer friendly. They give clear examples and how-tos, which I appreciated

## **Setting up Dexie.js**

I'm going to assume you have Dexie installed now. If you don't, go to the link above and download the library.

Thankfully, it's pretty quick to set up and they give you a basic example of using Dexie right on the front page.

For our app, I created a `Database.js` file where I hold the configuration and instantiation of our database.

```js
import Dexie from "dexie";

const db = new Dexie("Reddex");

window.db = db;
db.version(1).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created",
});

db.version(2).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created",
  authors: "++id, author",
  subreddits: "++id, subreddit",
});

db.version(3).stores({
  posts:
    "++id, author, title, selftext, ups, url, num_comments, created, flair",
  authors: "++id, author",
  subreddits: "++id, subreddit",
});

db.version(4).stores({
  posts:
    "++id, author, title, selftext, ups, url, num_comments, created, flair, postId",
  authors: "++id, author",
  subreddits: "++id, subreddit",
});

export default db;
```

That's my entire file.

To make use of this, we need to import it `db`. I used React for this project so I imported it into my app.js file `import db from 'path/to/file'`. If you're using straight vanilla JS, you could do the same thing, just import it into the top of your main scripts file.

`const db = new Dexie("Reddex");` will open the current database (that means it'll use the current database 'Reddex') if it exists, if it doesn't exist, it will create it. I like that.

Each key represents a table in the database, where the comma-separated values represent the columns. The `++id` will add `1` to the prior index so each entry has its own id that continues incrementing. The names of the columns are what will give us access to those values.

So, we import Dexie and create our new database. Inside the Dexie params, will be the name of the database that you want to create. Since my app is called Reddex [Reddex](https://reddex.app), that will be the name of my database.

It's best practice to create a new version for every change to the database model schemas. Every time I need to add something to my database, I create a new version. The one thing I haven't done now, which I'll get to, is upgrading previous versions of the database, to the newer version.

I've already run into database versioning issues which I believe will be solved by upgrading them. From the docs, here is an example of performing an upgrade:

```js
var db = new Dexie("FriendsAndPetsDatabase");

db.version(2)
  .stores({
    friends: "++id,name,birthdate,sex",
    pets: "++id,name,kind",
  })
  .upgrade((tx) => {
    var YEAR = 365 * 24 * 60 * 60 * 1000;
    return tx.friends.toCollection().modify((friend) => {
      friend.birthdate = new Date(Date.now() - friend.age * YEAR);
      delete friend.age;
    });
  });
// Always keep the declarations previous versions
// as long as there might be users having them running.
db.version(1).stores({
  friends: "++id,name,age",
  pets: "++id,name,kind",
});
db.open();
```

## **Saving To Our Dexie Database**

Now that we have set up our database, we're ready to go ahead and begin saving data to it.

As I briefly touched on in a previous post [Build a Reddit Scraper: Fetching Posts](/blog/build-a-reddit-scraper-fetching-posts), I gave a brief overview of this saving process, which I'll touch on again here for the sake of keeping like concepts together.

```js
export const saveToDatabase = async (posts) => {
  const newPosts = [];
  posts.map((x) => newPosts.push(x.data));

  await newPosts.map((x) => {
    return window.db.posts.add({
      author: x.author,
      title: x.title,
      selftext: x.selftext,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created: x.created,
      flair: x.link_flair_text,
    });
  });
  return true;
};
```

In order to access our database from anywhere, the solution I went with was creating a variable and attaching it to the window's scope. I'm sure there's a better way to do this.

To create this variable, it goes something like this `window.db = db;`. Then we can access it from everywhere in our app.

You'll notice we access the window scope again to grab our `db` variable. Because we have a table called `posts`, that's what we chain onto our database variable. It says: I want to access our database and `add()` to our `posts` collection (or table depending on the terminology you're used to).

## **Grabbing Data From Our Database**

Now that we've saved our data, we need a way to grab it. Below I created a function that will do just that.

```js
export const getPostsFromDatabase = async (setPosts) => {
  const db = window.db;
  const posts = await db.posts.toArray();
  return setPosts([...posts]);
};
```

Like saving to our database, we want to grab the data contained in our `posts` collection (I'm calling it collection). We have to turn that data into an array so we can use it like normal later on.

In order to do this, we need our famous global variable which we will use to access our collection once again. To grab the data, we need to access the collection we want to pull from, in our case, it's `posts`, then we need to chain `toArray()` onto it. There, we're done. The next step would be to set whatever state or variable with the data we have.

## **Clearing Records From The Database**

For Reddex, I wipe the database before I write to it. This is because I don't want duplicate entries saved and being retrieved later on. It makes sure that the data being displayed, is the same as the data being saved.

```js
export const deletePostsCollection = () => {
  const db = window.db;
  db.posts.clear().then().catch();
};
```

If I was a good developer I'd probably do something in the `then()` and `catch()` portions of the promise being return, but here we are! (I joke of course (about myself)). This is where you'd display any errors that mean anything to the user or you want to do some random thing once the promise resolves, it's up to you.

That's about it when it comes to using Dexie.js! Give it a shot! Thank you for making it this far.

**FIN**
