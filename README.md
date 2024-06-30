[![Coverage Status](https://coveralls.io/repos/github/satisfactory-dev/predicates.ts/badge.svg?branch=main)](https://coveralls.io/github/satisfactory-dev/predicates.ts?branch=main)
[![Workflow Status](https://github.com/satisfactory-dev/predicates.ts/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/satisfactory-dev/predicates.ts/actions/workflows/node.js.yml?query=branch%3Amain)

# Installation

`npm install --save @satisfactory-dev/predicates.ts`

# Usage

```ts
import {
	is_string,
	object_only_has_that_property,
} from '@satisfactory-dev/predicates.ts';

export function foo(maybe: unknown): maybe is {foo: string} {
	return object_only_has_that_property(maybe, 'foo', is_string);
}

foo({foo: 1}); // would return false
foo({foo: 'bar'}); // would return true
foo({foo: 'bar', baz: 1}); // would return false
```
