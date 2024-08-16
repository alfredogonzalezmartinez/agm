# Optional

Idioma: [English](readme.md) | Español

Un objeto envoltorio para trabajar con valores que pueden estar ausentes (`null` o `undefined`).

- [Instalación](#instalación)
- [Uso](#uso)
  - [Creación de un objeto `Optional`](#creación-de-un-objeto-optional)
  - [Trabajar con un objeto `Optional`](#trabajar-con-un-objeto-optional)
    - [isEmpty](#isempty)
    - [isPresent](#ispresent)
    - [get](#get)
    - [orElse](#orelse)
    - [orElseThrow](#orelsethrow)
    - [map](#map)
    - [fold](#fold)

## Instalación

```bash
npm install -E @alfredogm/optional@latest
```

## Uso

### Creación de un objeto `Optional`

Para empezar a usar `Optional` se debe generar un nuevo objeto `Optional`. Aunque se puede usar el constructor de `Optional` para crear un objeto `Optional`, **se recomienda usar alguno de sus constructores nombrados** `Optional.of(value)`, `Optional.ofNullable(value)` o `Optional.empty()`.

```js
import {Optional} from '@alfredogm/optional';

const optional = Optional.of(1); // throws an error if value is null or undefined

const optional2 = Optional.ofNullable(1);

const optional3 = Optional.empty();
```

El tipo de el contenido de un objeto `Optional` es inferido del valor pasado, excepto cuando se usa  `Optional.empty()`, en cuyo caso el tipo de contenido es `any`.

Si queremos indicar el tipo de contenido de un objeto `Optional` en *TypeScript*, podemos indicarlo como `Optional<T>` o indicarlo en la llamada de los constructores nombrados. Por ejemplo:

```ts
import {Optional} from '@alfredogm/optional';

const optional: Optional<number> = Optional.of(1);

const optional2 = Optional.of<number>(1);

const optional3 = Optional.ofNullable<number>(1);

const optional4 = Optional.empty<number>();
```

En el caso de *JSdocs*, también podemos indicar el tipo como `Optional<T>`. Por ejemplo:

```js
import {Optional} from '@alfredogm/optional';

/** @type {Optional<number>} */
const optional = Optional.empty();
```

### Trabajar con un objeto `Optional`

La API de `Optional` ofrece los siguientes métodos:

#### isEmpty

```ts
optional.isEmpty(): boolean
```

Devuelve `true` si el objeto `Optional` no tiene un valor presente, de lo contrario devuelve `false`.

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

Devuelve `true` si el objeto `Optional` tiene un valor presente, de lo contrario devuelve `false`.

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

Devuelve el valor presente en el objeto `Optional`, si no está presente, lanza un error.

```js
import {Optional} from '@alfredogm/optional';


const optional = Optional.of(1);

optional.get(); // 1


const optional2 = Optional.empty();

optional2.get(); // throws an error
```

El uso de `get` requiere el uso de `isPresent` o `isEmpty` para verificar si el objeto `Optional` tiene un valor presente o no.

Esto genera código mas imperativo, por lo que se recomienda usar otros métodos como `orElse`, `orElseThrow` or `fold` para tratar los casos de ausencia de valor de forma más declarativa.

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

Devuelve el valor presente en el objeto `Optional`, si no está presente, devuelve el valor pasado por el parámetro `other`.

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

Devuelve el valor presente en el objeto `Optional`, si no está presente, lanza el `Error` pasado por el parámetro `error`.

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

Devuelve un objeto `Optional` con el resultado de aplicar la función pasada por el parámetro `mapper` al valor presente en el objeto `Optional`, si no está presente, devuelve un objeto `Optional` vacío.

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

Devuelve el resultado de aplicar la función pasada por el parámetro `emptyFn` si el objeto `Optional` está vacío, o la función pasada por el parámetro `valueFn` si está presente.

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
