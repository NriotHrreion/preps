<div align="center">

# `preps`

[![Author](https://img.shields.io/badge/Author-NriotHrreion-red.svg "Author")](https://github.com/NriotHrreion)
[![LICENSE](https://img.shields.io/badge/License-MIT-green.svg "LICENSE")](./LICENSE)
[![Stars](https://img.shields.io/github/stars/NriotHrreion/preps.svg?label=Stars&style=flat)](https://github.com/NriotHrreion/preps/stargazers)
[![Github Workflow Status](https://img.shields.io/github/actions/workflow/status/NriotHrreion/preps/test.yml)](https://github.com/NriotHrreion/preps/actions/workflows/test.yml)

> Quick shortcut with prepositions

</div>

> This project hasn't completed yet...

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
        - [`map()`](#arr-map)
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
- [Examples](#examples)
- [LICENSE](#license)

## Installation

#### HTML

```html
<script src="https://cdn.jsdelivr.net/gh/NriotHrreion/preps/dist/preps.min.js"></script>
```

#### npm

_Not supported yet..._

## Usage

### `to(obj: string)` <a id="to-string"></a>

- **Return:** [`StringSubject`](#stringsubject)

This allows you to operate a string with `preps`. Available operations such as `as()`, `cut()`, `cutfine()`, ...

```ts
to("hello")
```

### `to(obj: any[])` <a id="to-array"></a>

- **Return:** [`ArraySubject`](#arraysubject)

This allows you to operate an array with `preps`. Available operations such as `as()`, `foreach()`, `remove()`, ...

```ts
to(["ABC", "abc", 150, null, true])
```

### `to(obj: HTMLElement)` <a id="to-dom"></a>

- **Return:** [`DOMSubject`](#domsubject)

This allows you to operate a HTML element with `preps`. Available operations such as `as()`, `clear()`, `on()`, ...

```ts
var elem = document.getElementById("btn");

if(elem) to(elem);
```

### `at(selector: string)` <a id="at"></a>

- **Return:** [`DOMSubject`](#domsubject)

Almost the same as `to(obj: HTMLElement)`, this allows you to get a HTML element by a selector and then operate it with `preps`.

```ts
at("#btn")
```

## API

### `Subject`

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

### `StringSubject`

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

### `ArraySubject`

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

This allows you to sort the array. Plus, this method is only available for number array.

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
to([1, 2, 3, 4]).shuffle().f() // it might return [2, 4, 3, 1]
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

### `DOMSubject`

### `CSSSubject`

## Examples

## LICENSE

[MIT](./LICENSE)
