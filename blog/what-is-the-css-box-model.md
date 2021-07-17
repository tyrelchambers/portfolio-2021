---
  title: What is the CSS Box Model?
  description: Knowing what the different properties of the CSS box model are, can help you figure out how your content works with padding, margin and borders.
  updatedAt: 2021-07-16
---

The CSS box model describes the area around every HTML element. When you add padding, margin or a border, you manipulate these properties.

A visual representation of the CSS box model can be found in the dev tools of most modern web browsers like Chrome and Firefox. It's a handy tool to see what properties are affecting the layout of your content.

![CSS Box Model](/images/box%20model.png)

## Padding

Padding represents the area adjacent to your content. It is the area that wraps the content itself.

The red area represents the padding being applied to our content.

<div style={{ padding: "10px", backgroundColor: "tomato" }}>
    <p style={{ backgroundColor: "white" }}>content</p>

</div>

## Border

The border is the next layer that sits on top of our padding area, but underneath our margin as show by the green line.

<div style={{ padding: "10px", backgroundColor: "tomato", border: "5px solid green" }}>
  <p style={{ backgroundColor: "white" }}>content</p>
</div>

## Margin

The last property in our CSS box model is the margin represented by the teal area. It adds space to the external area of an element whereas padding adds space to the internal space. The border can be though of the dividing line between the two.

<div style={{ backgroundColor: "cyan", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <div style={{ padding: "10px", width: "100%", backgroundColor: "tomato", border: "5px solid green", margin: "10px",  }}>
      <p style={{ backgroundColor: "white" }}>content</p>

  </div>
</div>

Sometimes when you're just starting out, it can be hard to decide what property would be most appropriate to add spacing to an element or elements. Padding should be used when you want to separate a piece of content from it's parent. It'd be like adding layers of bubble wrap to your package to protect it during shipping.

Furthering that analogy, the box itself could be thought of as the border. The border can be any width, or not exist at all.

Margin would be used to separate our box from other boxes so it's applied to the area outside our content. It's used to separate an element from another element.
