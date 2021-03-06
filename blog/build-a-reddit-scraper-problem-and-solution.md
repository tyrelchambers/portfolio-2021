---
title: "Build a Reddit Scraper: Problem & Solution"
description: This series will cover how I built a Reddit scraper using React/JavaScript and I’m hoping I can help explain a little but of how Reddit’s API works.
date: "July 12, 2021"
tags: "react,javascript,node,mongodb"
published: true
banner: /images/tt2akm8ifst3v8721pqo.jpeg
---

# The Goal of this Series

This series will cover how I built a Reddit scraper using React/JavaScript and I’m hoping I can help explain a little but of how Reddit’s API works. My goal is also to make this beginner friendly, however, a knowledge of HTML/CSS/JS is going to be a must, but hopefully I can help you understand the basics.

### **How Reddex Started**

Reddex is an app I built to make use of Reddit’s API. Being a story narrator that gets my stories from Reddit, I needed a way to speed up the discovery process. It took about 3-4 months (working on my own time) to build out, what I feel is a very solid and useful application.

### **The Problem**

Before I built this app, the process of finding a story to read was a pretty tedious task. I’d login to Reddit and search the NoSleep subreddit and scroll through hundreds of entries to find the one that had a reasonable number of upvotes and comments. I let the community decide which stories were good, so I mainly looked at the upvote count.

For every post that has 1,000 upvotes, you have to scroll past about 30 entries that are between 0-100 upvotes. This amount of time wasted scrolling, built up and accumulated over time to the point where the task just because monotonous; I didn’t look forward to doing it.

I needed a way to cut down on this time, and other than trying to create an AI that will edit my audio for me, I decided this might be more feasible.

Reddex has cut down my discovery time by 99%. Where it used to take maybe 5-10 minutes to find 1 to 2 stories, with just a few clicks, I can send pre-saved messages to multiple article authors, rather than:

- Copying the story title
- Navigate to their account
- Click send message
- Paste title to subject line
- Open Notepad document and copy scripted message
- Paste message in message field and click send

And repeating for each individual story.

### **The Solution**

The solution to this massive problem and time-suck, was to create an application that took advantage of Reddit’s API. This was a lot harder than one would think. Reddit’s API docs aren’t user friendly and you’ll frequently find yourself trying to find your way (by Google) through Reddit’s docs.

I would recommend bookmarking critical docs just for your sanity.

I’ll describe in a general sense, how i solved this issue and built a reddit scraper with React/JavaScript and NodeJS with Express and MongoDB. In future posts, I’ll go over every major component of the application to hopefully help you create your own Reddit scraper using JavaScript.

### **Fetching Posts From A Subreddit**

Reddit doesn’t have an API you’d typically expect to find, however the API is still straight forward and consistent across the board which will help once you get used to how it works.

If you navigate to a subreddit and add .json to the end of the URL, you’ll see a JSON version of that page and all the posts there. This is great because we can fetch that url with .json included, and access those values.

Because they only return up to 250 posts even when accessing the JSON version, we have to create a loop that uses the “after” property on each group of data, to fetch the next 250 post batch.

Once that big fetch is made, I then saved the posts in the browser using Dexie.js which makes use of IndexedDb. I’d recommend checking it out.

I went with Dexie.js because the data I was pulling, was too large to be saved in localstorage. Keep in mind when you’re pulling the posts from Reddit, you’re grabbing a lot of posts, with a lot of text and that adds up over time.There was a slight learning curve with using Dexie.js, but I’ll show you how I setup my database (I may migrate this to my own backend, but anyway).

After we grab the posts, I then call a function that returns the items in the database and displays them on the page.

### **Filtering The Subreddit Posts**

Once the posts are displayed on the screen, a filtering method appears. For filtering, I can filter by upvote count, keywords (that will search the title and body), and by Series Only (this will be expanded to use other flairs too).

This allows me to punch some numbers in, apply the filters, and immediately (it’s instant) see the posts that match my filter query.

### **Sending Messages To Authors**

This was by far the trickiest part and it took me a couple months to figure out and create.

I’ll go into more how I built the UI and my choices in that respect, but in the overall scheme of things, you select 1 or multiple posts, open a modal to confirm each individual message, from there you can send a message to the original poster.

This was the last piece to completely eliminating the hassle of sending messages to people. I can select 10 posts and when I go to confirm each message, the subject is prefilled with the title of the story, the name of the author you’ll be sending your message to is there, your own username, and a textarea prefilled with a default message you can define in the account section of the app. If you want to change the message, you can do it on an individual level. So, populate with a pre-filled message and modify individually.
