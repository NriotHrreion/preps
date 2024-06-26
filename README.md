<div align="center">

# `preps`

[![Author](https://img.shields.io/badge/Author-NriotHrreion-red.svg "Author")](https://github.com/NriotHrreion)
[![LICENSE](https://img.shields.io/badge/License-MIT-green.svg "LICENSE")](./LICENSE)
[![Stars](https://img.shields.io/github/stars/NriotHrreion/preps.svg?label=Stars&style=flat)](https://github.com/NriotHrreion/preps/stargazers)
[![Github Workflow Status](https://img.shields.io/github/actions/workflow/status/NriotHrreion/preps/test.yml)](https://github.com/NriotHrreion/preps/actions/workflows/test.yml)

Quick shortcut with prepositions

</div>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [`to(obj: string)`](#to-string)
    - [`to(obj: any[])`](#to-array)
    - [`to(obj: HTMLElement)`](#to-dom)
    - [`at(selector: string)`](#at)
- [API](#api)
    - [`Subject`](#subject)
        - [`final()`](#final)
        - [`log()`](#log)
    - [`StringSubject`](#stringsubject)
        - [`as(str: string | ((value: string) => string | void))`](#str-as)
        - [`is(str: string)`](#str-is)
        - [`add(str: string)`](#str-add)
        - [`cut(index: number)`](#str-cut)
        - [`split(separator: string)`](#str-split)
        - [`cutfine()`](#str-cutfine)
    - [`ArraySubject`](#arraysubject)
        - [`as(operation: array | ((value: array) => array | void))`](#arr-as)
        - [`is(arr: array)`](#arr-is)
        - [`foreach(cb: (item: T, index: number, arr: array) => T | void)`](#arr-foreach)
        - [`remove(which: number | T)`](#arr-remove)
        - [`removeIndex(index: number)`](#arr-removeindex)
        - [`removeItem(item: T)`](#arr-removeitem)
        - [`removeItems(target: T)`](#arr-removeitems)
        - [`put(index: number, item: T)`](#arr-put)
        - [`join(separator: string)`](#arr-join)
        - [`sort()`](#arr-sort)
        - [`reverse()`](#arr-reverse)
        - [`shuffle()`](#arr-shuffle)
        - [`filter(cb: (item: T) => boolean)`](#arr-filter)
        - [`cut(index: number)`](#arr-cut)
        - [`final(index?: number)`](#arr-final)
    - [`DOMSubject`](#domsubject)
        - [`as(element: HTMLElement | ((value: HTMLElement) => HTMLElement | void))`](#dom-as)
        - [`clear()`](#dom-clear)
        - [`classes()`](#dom-classes)
        - [`has(className: string)`](#dom-has)
        - [`attr(key: string, value?: string)`](#dom-attr)
        - [`css()`](#dom-css)
        - [`on(event: string, handler: (ev: Event) => void)`](#dom-on)
        - [`once(event: string, handler: (ev: Event) => void)`](#dom-once)
        - [`off(event: string)`](#dom-off)
    - [`CSSSubject`](#csssubject)
        - [`get(key: string)`](#css-get)
        - [`set(key: string, value: string)`](#css-set)
        - [`is(key: string, value: string)`](#css-is)
        - [`map()`](#css-map)
    - [`Tool`](#tool)
        - [`random(min: number, max: number)`](#tool-random)
        - [`sleep(ms: number)`](#tool-sleep)
        - [`is(obj1: any, obj2: any)`](#tool-is)
- [LICENSE](#license)

## Installation

`preps` is available for both browsers and Node.js.

#### HTML

```html
<script src="https://cdn.jsdelivr.net/gh/NriotHrreion/preps/dist/preps.min.js"></script>
```

#### npm

```bash
npm install preps
```

```js
// esm
import { to, by } from "preps";

// commonjs
const { to, by } = require("preps");
```

## Usage

`preps` supports chain calling, which means you can do multiple operations with just one line of code. Take the following as an example:

```ts
const { to } = require("preps");

to(["3", "2", "4", true, "5", "1", false, {}, "6"])
  .filter((value) => typeof value !== "string")
  .foreach((num) => parseInt(num) + 1)
  .sort()
  .reverse()
  .filter((num) => num % 2 === 0)
  .f();
```

Run the code, and you would get:

```js
[7, 5, 3]
```

`preps` also provides some utilities, and you can get the utils with `by()`. For example:

```ts
const { by } = require("preps");

by().is({ abc: 1, test: "Hello" }, { test: "Hello", abc: 1 }); // true
```

For detailed usage, please refer to [API](#api).

## API

#### `to(obj: string)` <a id="to-string"></a>

- **Return:** [`StringSubject`](#stringsubject)

This allows you to operate a string with `preps`. Available operations such as `as()`, `cut()`, `cutfine()`, ...

```ts
to("hello")
```

#### `to(obj: any[])` <a id="to-array"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to operate an array with `preps`. Available operations such as `as()`, `foreach()`, `remove()`, ...

```ts
to(["ABC", "abc", 150, null, true])
```

#### `to(obj: HTMLElement)` <a id="to-dom"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to operate a HTML element with `preps`. Available operations such as `as()`, `clear()`, `on()`, ...

```ts
var elem = document.getElementById("btn");

if(elem) to(elem);
```

#### `at(selector: string)` <a id="at"></a>

- **Return:** [`DOMSubject`](#domsubject)

Almost the same as `to(obj: HTMLElement)`, this allows you to get a HTML element by a selector **directly** and then operate it with `preps`.

```ts
at("#btn")
```

#### `by()` <a id="by"></a>

- **Return:** [`Tool`](#tool)

This allows you to get the `Tool` class for the utilities.

```ts
by()
```

---

### Subject

All the functions [above](#usage) returns an object that extends `Subject`. This class provides some basic methods.

#### `final()` <a id="final"></a>

- **Return:** The final result of your operations
- **Alias:** `f()`

This method is to finalize a series of operations.

```ts
to("hello").add(" world").final() // "hello world"
// or
to("hello").add(" world").f() // "hello world"
```

#### `log()` <a id="log"></a>

- **Return:** `void`

This method is to finalize a series of operations and print the result into the console.

```ts
to("hello").add(" world").log() // "hello world"
```

### StringSubject

This class is for the operations of strings.

#### `as(operation: string | ((value: string) => string | void))` <a id="str-as"></a>

- **Return:** [`StringSubject`](#stringsubject)

This allows you to change the content of the string.

```ts
to("hello").as("hi").f() // "hi"
to("hello").as((value) => value.length.toString()).f() // "5"
```

#### `is(str: string)` <a id="str-is"></a>

- **Return:** `boolean`

This allows you to check if the string is equal to another string.

```ts
to("hello").is("hello") // true
to("hello").is("hi") // false
```

#### `add(str: string)` <a id="str-add"></a>

- **Return:** [`StringSubject`](#stringsubject)

This allows you to add a string to the end of the string.

```ts
to("hello").add(" world").f() // "hello world"
```

#### `cut(index: number)` <a id="str-cut"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to divide the string into two parts.

```ts
to("hello").cut(2).f() // ["he", "llo"]
```

#### `split(separator: string)` <a id="str-split"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to divide the string into pieces by a separator.

```ts
to("hello").split("l").f() // ["he", "", "o"]
```

#### `cutfine()` <a id="str-cutfine"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to divide the string into pieces, and each piece is no more than one character.

```ts
to("hello").cutfine().f() // ["h", "e", "l", "l", "o"]
```

### ArraySubject

This class is for the operations of arrays.

> Here, we took `T[]` as `array` for understandability and simplicity.

#### `as(operation: array | ((value: array) => array | void))` <a id="arr-as"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to change the value of the array.

```ts
to([1, 2, 3]).as([3]).f() // [3]
to([1, 2, 3]).as((value) => [...value, 4]).f() // [1, 2, 3, 4]
```

#### `is(arr: array)` <a id="arr-is"></a>

- **Return:** `boolean`

This allows you to check if the array is equal to another array.

```ts
to([1, 2, 3]).is([1, 2, 3]) // true
to([1, 2, 3]).is([1, 2, 4]) // false
```

#### `foreach(cb: (item: T, index: number, arr: array) => T | void)` <a id="arr-foreach"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to iterate the array.

```ts
to([1, 2, 3]).foreach((item) => item + 1).f() // [2, 3, 4]
```

#### `remove(which: number | T)` <a id="arr-remove"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to remove an item from the array by the index or the item itself.

```ts
to([1, "2", true]).remove(2).f() // [1, "2"]
to([1, "2", true]).remove("2").f() // [1, true]
```

#### `removeIndex(index: number)` <a id="arr-removeindex"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to remove an item from the array by the index.

#### `removeItem(item: T)` <a id="arr-removeitem"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to remove an item from the array by the item itself.

#### `removeItems(target: T)` <a id="arr-removeitems"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to remove all of the items in the array that are equal to the target.

```ts
to([1, 2, 3, 3, 3, 4, 3, 5, 3]).removeItems(3).f() // [1, 2, 4, 5]
```

#### `put(index: number, item: T)` <a id="arr-put"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to insert an item into the array by the index.

```ts
to([1, 2, 3]).put(1, 4).f() // [1, 4, 2, 3]
```

#### `join(separator: string)` <a id="arr-join"></a>

- **Return:** [`StringSubject`](#stringsubject)

This allows you to join the array into a string.

#### `sort()` <a id="arr-sort"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to sort the array.

> [!NOTE]   
> This method is only available for number arrays.

```ts
to([3, 7, 2, 5, 4, 6, 1]).sort().f() // [1, 2, 3, 4, 5]
to(["Hello", 7, 2, 5, 4, 6, 1]).sort().f() // Error
```

#### `reverse()` <a id="arr-reverse"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to reverse the array.

```ts
to([1, 2, 3]).reverse().f() // [3, 2, 1]
```

#### `shuffle()` <a id="arr-shuffle"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to shuffle the array.

```ts
to([1, 2, 3, 4]).shuffle().f()
```

#### `filter(cb: (item: T) => boolean)` <a id="arr-filter"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to filter the array with the specific condition.

```ts
to([1, 2, 3, 4, 5]).filter((item) => item > 2).f() // [3, 4, 5]
```

#### `cut(index: number)` <a id="arr-cut"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to divide the array into two parts.

```ts
to([1, 2, 3, 4, 5]).cut(2).f() // [[1, 2], [3, 4, 5]]
```

#### `final(index?: number)` <a id="arr-final"></a>

- **Return:** The final result of your operations to the array or the specific item in the array.
- **Alias:** `f(index?: number)`

Overriding the `final()` method in [`Subject`](#subject), this allows you to get a specific item in the final array. You can also use this method in the common way, which gives you the final result of your operations to the array.

```ts
to([1, 2, 3, 4, 5]).final(2) // 3
```

### DOMSubject

This class is for the operations of HTML elements. It is only available in browser environment.

The following code snippets are shown in the context of this HTML file:

```html
<button id="#btn-1" class="cls-1 cls-2">Test 1</button>
<button id="#btn-2" data-attr="1">Test 2</button>

<div id="container">
    <p>Hello</p>
    <p>World</p>
</div>

<span style="color: red">Hello World</span>
```

#### `as(operation: HTMLElement | ((value: HTMLElement) => HTMLElement | void))` <a id="dom-as"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to change the value of the HTML element.

```ts
at("#btn-1").as(() => document.querySelector("#btn-2")).f(); // <button id="#btn-2">Test 2</button>
```

#### `clear()` <a id="dom-clear"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to clear the child nodes of the HTML element.

```ts
at("#container").clear().f() // <div id="container"></div>
```

#### `classes()` <a id="dom-classes"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to get the class list of the HTML element.

```ts
at("#btn-1").classes().f() // ["cls-1", "cls-2"]
```

#### `has(className: string)` <a id="dom-has"></a>

- **Return:** `boolean`

This allows you to check if the HTML element has the specific class.

```ts
at("#btn-1").has("cls-1").f() // true
at("#btn-2").has("cls-1").f() // false
```

#### `attr(key: string, value?: string)` <a id="dom-attr"></a>

- **Return:** [`DOMSubject`](#domsubject) | [`StringSubject`](#stringsubject)

This allows you to get or set the attribute of the HTML element. If the value is specified, it will set the attribute value. Otherwise, it will return the attribute value.

```ts
at("#btn-2").attr("data-attr").f() // "1"
at("#btn-2").attr("data-attr", "2").f() // <button id="#btn-2" data-attr="2">Test 2</button>
```

#### `css()` <a id="dom-css"></a>

- **Return:** [`CSSSubject`](#csssubject)

This allows you to get the `CSSSubject` instance of the HTML element, which enables you to edit the CSS styles.

```ts
at("span").css().f() // CSSSubject { color: "red" }
```

#### `on(event: string, handler: (ev: Event) => void)` <a id="dom-on"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to add an event listener to the HTML element.

```ts
at("#btn-1").on("click", () => alert("Hello World!")).f()
```

#### `once(event: string, handler: (ev: Event) => void)` <a id="dom-once"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to add a one-time event listener to the HTML element.

```ts
at("#btn-1").once("click", () => alert("Hello World!")).f()
```

#### `off(event: string)` <a id="dom-off"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to remove events of a specific event type from the HTML element.

```ts
// Remove all the click handlers of the button
at("#btn-1").off("click").f()
```

### CSSSubject

This class is for editing the CSS styles of HTML elements. It is only available in browser environment.

You can only get the instance by the `css()` method in `DOMSubject`.

#### `get(key: string)` <a id="css-get"></a>

- **Return:** `string`

This allows you to get the value of the CSS property.

```ts
at("span").css().get("color") // "red"
```

#### `set(key: string, value: string)` <a id="css-set"></a>

- **Return:** [`CSSSubject`](#csssubject)

This allows you to set the value of the CSS property.

```ts
at("span").css().set("color", "blue").f() // CSSSubject { color: "blue" }
```

#### `is(key: string, value: string)` <a id="css-is"></a>

- **Return:** `boolean`

This allows you to check if the CSS property is the specified value.

```ts
at("span").css().is("color", "red") // true
at("span").css().is("color", "blue") // false
```

#### `map()` <a id="css-map"></a>

- **Return:** `Map<string, string>`

This allows you to get the map of the CSS properties.

```ts
at("span").css().map() // Map { color: "red" }
```

### Tool

This class is a utility class.

#### `random(min: number, max: number)` <a id="random"></a>

- **Return:** `number`

This allows you to get a random number between the specified range.

```ts
by().random(1, 10)
```

#### `sleep(ms: number)` <a id="sleep"></a>

- **Return:** `void`
- **Async**

This allows you to let the program sleep for a specified time.

```ts
await by().sleep(1000)
```

#### `is(obj1: any, obj2: any)` <a id="is"></a>

- **Return:** `boolean`

This allows you to check if two values are equal. It supports comparing objects, arrays, etc.

```ts
by().is(1, 1) // true
by().is(1, 2) // false
by().is({ a: 1, b: 2 }, { b: 2, a: 1 }) // true
```

## LICENSE

[MIT](./LICENSE)
