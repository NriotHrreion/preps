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
    - [`ArraySubject`](#arraysubject)
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
```

#### `log()` <a id="log"></a>

- **Return:** void

This method is to finalize a series of operations and print the result into the console.

```ts
to("hello").add(" world").log() // "hello world"
```

### `StringSubject`

### `ArraySubject`

### `DOMSubject`

## Examples

## LICENSE

[MIT](./LICENSE)
