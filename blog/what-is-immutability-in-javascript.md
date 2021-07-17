---
  title: What is immutability in Javascript?
  description: Immutability in Javascript is an important concept in programming. Let's talk about the basics.
  updatedAt: 2021-07-13
  tags: immutability,beginner,javascript
---

Immutability means that the value or data structure given to a variable cannot change. This immutability only applies to `arrays` and `objects` because of how they are stored in memory. As opposed to primitive data types, `objects` and `arrays` are composite (or reference) data types. Composite data types point to the same location.

You can think of reference data types like this. Let's look at the following diagram created with the most advanced design techniques known to man.

![Object Picture](/images/objref.jpeg)

Say we create a new object like in the diagram.

```js
const obj1 = {
  name: "tyrel",
  age: 29,
};
```

This object gets stored in memory as a reference data type.

Now let's copy it.

```js
const obj1 = {
  name: "tyrel",
  age: 29,
};

const obj2 = obj1;

obj2.name = "Steven";

// obj1.name also becomes Steven even though we only targeted obj2. This is because they reference the same object in memory.
```

any object also referencing `obj1`, would have their values changed as well. It's like having an easter egg basket in front of two people. We are both interacting with that basket, eating the eggs (probably Cadbury) and painting them. That basket represents the object in memory and the eggs within it are its properties. If I colour an egg or destroy one, my friend will also have his destroyed or modified because we are looking at the same thing.

If you were to copy a primitive data type in this way, you would literally take the value `let a = 1` and copy it. `let b = a` would create a direct copy which means that `let b` would equal `1` because they become two separate entities rather than pointing to the same value in memory. If you were to then change `b` to `b = 2`, `b` would equal `2` and not `1`.

Now that is a brief explanation of mutability and how reference data types are affected.

Immutability means that everything I explained is not possible. It saves any headaches caused by accidently changing an existing object.

## How do we make an object immutable?

### Object.freeze()

`Object.freeze()` prevents any changes to an object. If you create an object and run `Object.freeze(myObject)`, you won't be able to change, add or remove any properties within.

`Object.preventExtensions()` and `Object.seal()` also accomplish the same thing.

## How we create a new object based on old data

By using pure functions. We want to make sure our original object doesn't change because that could cause some trouble. Pure functions would help solve this. A pure function will take in our current object and return a _new_ object instead of directly mutating our original object.

Our pure function could look like this:

```js
const updateName = (data, newName) => {
  return {
    ...data,
    name: newName,
  };
};
```

this will return a brand new object stored in memory along with our original object. If there are any other variables referencing `obj1`, they will remain the same even though we took the same properties and changed them. If a variable using `obj1` gets reassigned, then that object will disappear and we will be left with our new object.

## Conclusion

Immutability in Javascript (and immutability in general) means that the value or the structure of a variable cannot change. Once it's created, that's it. There are ways to create new objects using an existing data by using pure functions.
