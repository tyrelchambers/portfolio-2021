---
title: What is a Ternary Operator in JavaScript?
description: A ternary operator is a quick and dirty way to write one-liner if statements.
date: "September 8, 2021"
published: true
tags: javascript
---

A ternary operator is a way to write if/else statements in one line, however if you've never heard of them before, they can be tricky to understand.

## Anatomy of a Ternary Operator

They consist of 3 fundamental components.

1. A condition followed by a question mark (?)
2. An expression to execute if the condition is truthy
3. An expression to execute if the condition is falsy

A ternary operator is written like this: `isTrue ? true : false`. We have our condition `isTrue`. It's the variable we are checking. It represents `if (isTrue)` in a traditional if statement.

The `true` after the question mark represents tha expression we will execute if the variable we are checking returns a truthy value.

The `false` is the expression we will execute if the variable is falsy.

It took me a while to figure out how to actually write ternary operators because I didn't understand them, so I stuck with if statements until I forced myself to learn them.

Since then, I use them quite often, however ternary operators shouldn't always be used, in my opinion.

I use ternary operators when I need a quick check if something is true or false. Use whatever gets the job done, but also provides decent readability.

## How it differs from an if statement

Ternary operators work more like if/else statements.

If I were to write...

```
isTrue ? true
```

It would be like writing...

```
if (isTrue) {}
```

The difference is our ternary operator (the first code block) will fail whereas our if statement will succeed.

It needs an expression to execute for a truthy or falsy result. With that said, ternary operators are more like if/else statements.

They really work liike...

```
if (isTrue) {
  truthy()
} else {
  falsy()
}
```

## A complete example

In order to wrap this up with a pretty bow, I'll include a full example of how a ternary operator can be used.

```
const favouriteColour = "blue"

const isBlue = favouriteColour === "blue" ? "it's true! it's blue!" : "it's not blue :("

console.log(isBlue) // "it's true! It's blue!"

// Let's change our fav colour

const favouriteColour = "red"

const isBlue = favouriteColour === "blue" ? "it's true! it's blue!" : "it's not blue :("

console.log(isBlue) // "it's not blue :("
```

Ternary operators are amazing to use. If you're having a tough time understanding it, just keep practicing and working at it. As with anything that is unknown, through consistent practice, you'll understand it before you know it.

Just remember `favouriteColour === "blue" ?` is our condition, `? truthy :` is our code to execute if it's truthy, and `: falsy;` is our code to execute if it's not.
