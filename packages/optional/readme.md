# Optional

Language: English | [Español](readme.es.md)

Un object wrapper for working with values that may be absent (`null` or `undefined`).

- [Install](#install)
- [Usage](#usage)
  - [Creating an `Optional` object](#creating-an-optional-object)
  - [Working with an `Optional` object](#working-with-an-optional-object)
    - [isEmpty](#isempty)
    - [isPresent](#ispresent)
    - [get](#get)
    - [orElse](#orelse)
    - [orElseThrow](#orelsethrow)
    - [map](#map)
    - [fold](#fold)

## Install

```bash
npm install -E @alfredogm/optional@latest
```

## Usage

### Creating an `Optional` object

To start using `Optional`, you must generate a new `Optional` object. Although you can use the `Optional` constructor to create an `Optional` object, **we recommend using one of the named constructors `Optional.of(value)`, `Optional.ofNullable(value)` or `Optional.empty()`.**

```js
import {Optional} from '@alfredogm/optional';

const optional = Optional.of(1); // throws an error if value is null or undefined

const optional2 = Optional.ofNullable(1);

const optional3 = Optional.empty();
```

The type of the content of an `Optional` is inferred from the passed value, except when using `Optional.empty()`, in which case the type of the content is `any`.

If you want to indicate the type of the content of an `Optional` in *TypeScript*, you can indicate it as `Optional<T>` or indicate it in the named constructors. For example:

```ts
import {Optional} from '@alfredogm/optional';

const optional: Optional<number> = Optional.of(1);

const optional2 = Optional.of<number>(1);

const optional3 = Optional.ofNullable<number>(1);

const optional4 = Optional.empty<number>();
```

In the case of *JSdocs*, we can also indicate the type as `Optional<T>`. For example:

```js
import {Optional} from '@alfredogm/optional';

/** @type {Optional<number>} */
const optional = Optional.empty();
```

### Working with an `Optional` object

The API of `Optional` offers the following methods:

#### isEmpty

```ts
optional.isEmpty(): boolean
```

Returns `true` if the `Optional` object does not have a present value, otherwise returns `false`.

```js
import {Optional} from '@alfredogm/optional';

const optional = Optional.of(1);

optional.isEmpty(); // false

const optional2 = Optional.empty();

optional2.isEmpty(); // true
```

#### isPresent

```ts
optional.isPresent(): boolean
```

Returns `true` if the `Optional` object has a present value, otherwise returns `false`.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.isPresent(); // true


const optional2 = Optional.empty();

optional2.isPresent(); // false
```

#### get

```ts
optional.get(): T
```

Returns the present value in the `Optional` object, throws an error if there is no present value.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.get(); // 1


const optional2 = Optional.empty();

optional2.get(); // throws an error
```

The use of `get` requires the use of `isPresent` or `isEmpty` to check if the `Optional` object has a present value or not.

This generates imperative code, so it is recommended to use other methods such as `orElse`, `orElseThrow` or `fold` to handle the absence of a value in a more declarative way.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

if (optional.isPresent()) {
  console.log(optional.get());
}


const optional2 = Optional.empty();

if (optional2.isEmpty()) {
  console.log("Value is empty");
}
```

#### orElse

```ts
optional.orElse(other:T): T
```

Returns the present value in the `Optional` object, if there is no present value, returns the passed parameter `other`.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.orElse(2); // 1


const optional2 = Optional.empty();

optional2.orElse(2); // 2
```

#### orElseThrow

```ts
optional.orElseThrow(error:Error): T
```

Returns the present value in the `Optional` object, if there is no present value, throws the `Error` passed as a parameter.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.orElseThrow(new Error("Value is empty")); // 1


const optional2 = Optional.empty();

optional2.orElseThrow(new Error("Value is empty")); // throws the Error
```

#### map

```ts
optional.map<R>(mapper:(value:T)=>R): Optional<R> 
```

Returns an `Optional` object with the result of applying the passed parameter `mapper` to the value if present, otherwise returns an empty `Optional` object.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.map((value) => value + 1);

optional.orElse(0); // 2


const optional2 = Optional.empty();

optional2.map((value) => value + 1);

optional2.orElse(0); // 0
```

#### fold

```ts
optional.fold<E,V>(emptyFn:()=>E, valueFn:(value:T)=>V): E|V
```

Returns the result of applying the passed parameter `emptyFn` if the `Optional` object is empty, or the passed parameter `valueFn` if it is present.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.fold(
  () => 0,
  (value) => value + 1,
); // 2


const optional2 = Optional.empty();

optional2.fold(
  () => 0,
  (value) => value + 1,
); // 0
```
