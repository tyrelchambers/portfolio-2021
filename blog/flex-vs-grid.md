---
title: When to use Flex vs. Grid
description: In the hottest head-to-head to ever arise since the dawn of man. We will talk about the differences between Flex and Grid.
date: "August 18, 2021"
tags: css
published: true
---

Confusion around Flex and Grid is still prevalent in today's developmental world. It's easy to miss the difference between the two since, on a basic level, they do the same thing. They help you layout your page in a structured way.

It took me a while to see the difference between them and why I should use Grid in some circumstances and Flex in the others. Hopefully, I can help you decide when to use Grid and when to use Flex.

This won't be a tutorial like you'd expect- there won't be any code. This article will be more of a high-level explanation on why/when we use Grid and why/when we use Flex. I know there are a ton of posts and videos out there talking about this particular comparison, but I'm hoping that maybe I can help you understand the difference.

Grid was designed for 2-dimensional layouts (rows and columns at the same time). Flex was designed for 1-directional layouts (rows or columns). These two methods share similar properties and behaviours, but both have their own use-cases.

## Grid

Grid is amazing for creating a predictable layout on a macro level where the structure is important. It makes it easy to work with different screen sizes without worrying about throwing your page out of whack. Sometimes Flex can act a little unpredictably on a grand scale and if you've worked with Flex, you know what I mean.

In the example below, there is a list of items, of which I've only shown four, that shows a Grid layout in action.

Keep in mind that in reality, I could use a Flex layout to achieve this Grid look. However, when using Grid, it gives me more control over the width of the items, how they wrap around and flow down the page, and makes my UI a lot more stable.

This example comes from [Reddex](https://reddex.app).

![Grid example](/images/grid%20vs%20flex%201.png)

Each item is part of a Grid. It's currently 2-wide on larger screens but shrinks to a 1-wide grid.

![Grid example 2](/images/grid.jpg)

If there are multiple items to be shown on a page and structure matters, I tend to use Grid. I know the graphic isn't the most high-tech or advanced, but using it in the way that is shown, is how I tend to use it. It's also used because we are working with a multi-dimensional layout.

## Flex

Flex is great for working with individual items. It allows you to work the whitespace around your items to your advantage. The size of each Flex item will determine how much size it takes up in its parent container. Using certain properties, you can decide how they interact with their siblings.

On the other hand, Flex is great for layouts on a micro-level. I use Flex religiously on a smaller scale like with the screenshot below.

![Flex example](/images/grid%20vs%20flex%202.png)

The parent of each item is `display: Flex` (oops, I included some code). This lays out my content on the X-axis, in a row. When the parent gets too small to fit them on the same axis, they will wrap below each other.

Technically, I could use Grid to accomplish the same task, but it would add a little more work and a little more structure. Because that content is only on 1-axis, using Flex makes more sense.

![Flex example 2](/images/flex.jpg)

In this example, I use Flex on a small scale where the structure of these items isn't entirely important.

## Conclusion

Grid is used to layout content on a multi-dimensional level whereas Flex is only used in 1-dimension.

If you need flexibility, use Flex. If you need structure and predictability, use Grid.
