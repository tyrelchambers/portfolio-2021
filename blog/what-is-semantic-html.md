---
  title: What is semantic HTML?
  description: Semantic HTML is something every developer should know. Which elements to use and why, and what role they play.
  date: "July 21, 2021"
  tags: html
  published: true
---

Semantic HTML refers to the meaning of each element within our code. It describes the relationship between elements and helps the developer navigate the codebase. Rather than trying to parse "div soup" and figure out "what's what", we can use certain HTML elements to give us more information about the structure of our code.

Semantic HTML also plays a role in helping people who require assistive devices to navigate our site. Devices like screen-readers can use our elements such as `nav` or `header` to help the person know where they are and where they can go.

## Why it's important

Aside from helping us navigate our codebase and helping assistive devices navigate our site, using proper HTML elements can also help us rank better on search engines. This is known as SEO, but we won't be getting into that today. Using the right elements helps Google, and other search engines, know what content is on our page, and which content is important to show in the search result.

## The most popular HTML elements

Let's look briefly at the most popular HTML elements. This is not an all encompassing list however, just a brief description on how they are used.

**Heading elements (h1, h2, ... h6)** elements are used to describe the importance of the content to which is refers, in the form of titles or headings. If you had a website where you spoke about what you're interested in, an _h1_ tag would represent perhaps, your name because that's an important piece of information. What musical instruments you like isn't as important so you might use an _h2_ or an _h3_ to title them.

**Article** elements are used to describe an independent, self-contained piece of content. You would use an article tag to describe a blog post or a newspaper article.

It would look something like:

```
  <article>
    <h2>My title</h2>
    <p>My content</p>
  </article>
```

**Aside** is used to display information that is more of a "thought" or a small piece of information. It's related to the main text, but in a way that would describe the main point of the text. Say you were talking about a vacation you had and you mention a building that you saw. Maybe you would like to include information about that building, but it isn't necessarily a part of the main story. You would put content like that in an _aside_ tag.

**Details** and **summary** are typically used together. Fun fact: if you need dropdown functionality out of the box, you can use these two tags together to create that without Javascript. It's pretty wild.

Summary is used to summarize the text within the _detail_ tag. It provides a visible heading. Detail is used to provide more information to elaborate upon the summary you give.

Check it out:

<details style={{ backgroundColor: "#F4FAFF", padding: "1em", borderRadius: "5px" }}>
  <summary>
    This is a summary
  </summary>
  And this is a lot more text!
</details>

**Footer** elements can be used multiple times in a page. They are used at the end of a section in a way that provides information to the reader/visitor such as copyright information, links, or author information. You can find these at the bottom of most websites. Footer elements cannot be descendants (placed within) header, address, or other footer tags.

**Header** can be used to introduce content. You'll typically find navigation links, images, search bars or other information used to introduce a section or piece of content. These are typically found at the top of websites, but also sometimes along the side, depending on the design of the website.

**Main** is used to describe the main content of the page. Exactly how it sounds, the most important content gets placed within `main`. Keep in mind that no more than one `main` element can exist on a page.

**Nav** is a big one. Use nav when the content within is used to navigating around your site. These are usually found in the header. While there are nav links found in some footers, they aren't typically found within a nav link as it's not necessary.

Nav tags aren't limited to navigation links, but you can have text that contains links and that is good as well.

**Section** last, but not least. Section is pretty straight forward. It's used to describe a section of contained content, like organizing the content on your page into chunks.

Sections should always have a heading with very few excpetions. It's used when a more semantic (a more specific) tag doesn't apply.
