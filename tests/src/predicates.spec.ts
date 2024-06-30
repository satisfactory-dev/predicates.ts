import {
	describe,
	it,
} from 'node:test';
import assert from 'node:assert/strict';

import {
	is_non_empty_array,
	is_string,
	object_has_non_empty_array_property,
	object_has_only_properties_that_match_predicate,
	object_has_property,
	object_has_property_that_equals,
	object_only_has_that_property,
	predicate,
	property_exists_on_object,
	value_is_non_array_object,
} from '../../';

void describe('object_has_property', () => {
	const data_sets:[unknown, string, predicate|undefined, boolean][] = [
		[null, 'foo', undefined, false],
		[null, 'foo', is_string, false],
		[{}, 'foo', undefined, false],
		[{}, 'foo', is_string, false],
		[{foo: 1}, 'foo', undefined, true],
		[{foo: 1}, 'foo', is_string, false],
		[{foo: 'bar'}, 'foo', undefined, true],
		[{foo: 'bar'}, 'foo', is_string, true],
	];

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			property,
			predicate,
			expectation,
		] = data_sets[index];

		void it(
			`object_has_property() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					object_has_property(maybe, property, predicate),
					expectation
				)
			}
		)
	}
})

void describe('object_has_only_properties_that_match_predicate', () => {
	const data_sets:[unknown, predicate, boolean][] = [
		[null, is_string, false],
		[{}, is_string, true], // this _feels_ like a false positive
		[{foo: 1}, is_string, false],
		[{foo: 'bar'}, is_string, true],
		[{foo: 'bar', baz: 1}, is_string, false],
		[{foo: 'bar', baz: 'bat'}, is_string, true],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			predicate,
			expectation,
		] = data_sets[index];

		void it(
			`object_has_only_properties_that_match_predicate() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					object_has_only_properties_that_match_predicate(
						maybe,
						predicate
					),
					expectation
				)
			}
		)
	}
})

void describe('property_exists_on_object', () => {
	const data_sets:[{[key: string]: unknown}, string, boolean][] = [
		// empty object will return false regardless of property
		[{}, 'foo', false],
		// the equivalent in php of isset() vs. array_key_exists()
		[{foo: undefined}, 'foo', true],
		// we do not care about type here
		[{foo: 1}, 'foo', true],
		[{foo: 'bar'}, 'foo', true],
		// we care about spelling
		[{fooo: 1}, 'foo', false],
		// we care about case-sensitivty
		[{Foo: 1}, 'foo', false],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			property,
			expectation,
		] = data_sets[index];

		void it(
			`object_has_only_properties_that_match_predicate() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					property_exists_on_object(
						maybe,
						property
					),
					expectation
				)
			}
		)
	}
})

void describe('object_has_non_empty_array_property', () => {
	const data_sets:[unknown, string, predicate|undefined, boolean][] = [
		[null, 'foo', undefined, false],
		[null, 'foo', is_string, false],
		[{}, 'foo', undefined, false],
		[{}, 'foo', is_string, false],
		[{bar: 1}, 'foo', undefined, false],
		[{bar: 1}, 'foo', is_string, false],
		[{bar: []}, 'foo', undefined, false],
		[{bar: []}, 'foo', is_string, false],
		[{bar: [1]}, 'foo', is_string, false],
		[{bar: ['baz']}, 'foo', is_string, false],
		[{foo: 1}, 'foo', undefined, false],
		[{foo: 1}, 'foo', is_string, false],
		[{foo: []}, 'foo', undefined, false],
		[{foo: []}, 'foo', is_string, false],
		[{foo: [1]}, 'foo', is_string, false],
		[{foo: ['baz']}, 'foo', is_string, true],
		[{foo: ['baz', 1]}, 'foo', is_string, false],
		[{foo: ['baz', 'bat']}, 'foo', is_string, true],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			property,
			predicate,
			expectation,
		] = data_sets[index];

		void it(
			`object_has_non_empty_array_property() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					object_has_non_empty_array_property(
						maybe,
						property,
						predicate,
					),
					expectation
				)
			}
		)
	}
})

void describe('object_has_property_that_equals', () => {
	const data_sets:[unknown, string, unknown, boolean][] = [
		[null, 'foo', 'bar', false],
		[{}, 'foo', 'bar', false],
		[{foo:1}, 'foo', 'bar', false],
		[{foo:'bar'}, 'foo', 'bar', true],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			property,
			expects,
			expectation,
		] = data_sets[index];

		void it(
			`object_has_property_that_equals() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					object_has_property_that_equals(
						maybe,
						property,
						expects,
					),
					expectation
				)
			}
		)
	}
})

void describe('value_is_non_array_object', () => {
	const data_sets:[unknown, boolean][] = [
		[null, false],
		[[], false],
		[undefined, false],
		[1, false],
		[{}, true],
		[new Date(), true],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			expectation,
		] = data_sets[index];

		void it(
			`value_is_non_array_object() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					value_is_non_array_object(
						maybe,
					),
					expectation
				)
			}
		)
	}
})

void describe('is_non_empty_array', () => {
	const data_sets:[unknown, predicate|undefined, boolean][] = [
		[null, undefined, false],
		[null, is_string, false],
		[undefined, undefined, false],
		[undefined, is_string, false],
		[{}, undefined, false],
		[{}, is_string, false],
		[[], undefined, false],
		[[], is_string, false],
		[[1], undefined, true],
		[[1], is_string, false],
		[['foo'], is_string, true],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			predicate,
			expectation,
		] = data_sets[index];

		void it(
			`is_non_empty_array() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					is_non_empty_array(
						maybe,
						predicate,
					),
					expectation
				)
			}
		)
	}
})

void describe('object_only_has_that_property', () => {
	const data_sets:[unknown, string, predicate|undefined, boolean][] = [
		[null, 'foo', undefined, false],
		[null, 'foo', is_string, false],
		[{}, 'foo', undefined, false],
		[{}, 'foo', is_string, false],
		[{bar: 1}, 'foo', undefined, false],
		[{bar: 1}, 'foo', is_string, false],
		[{bar: 'baz'}, 'foo', undefined, false],
		[{bar: 'baz'}, 'foo', is_string, false],
		[{foo: 1}, 'foo', undefined, true],
		[{foo: 1}, 'foo', is_string, false],
		[{foo: 'baz'}, 'foo', undefined, true],
		[{foo: 'baz'}, 'foo', is_string, true],
		[{foo: 1, bar: 1}, 'foo', undefined, false],
		[{foo: 1, bar: 1}, 'foo', is_string, false],
		[{foo: 'baz', bar: 1}, 'foo', undefined, false],
		[{foo: 'baz', bar: 1}, 'foo', is_string, false],
		[{foo: 'baz', bar: 'bat'}, 'foo', is_string, false],
	]

	for (let index=0; index < data_sets.length; ++index) {
		const [
			maybe,
			property,
			predicate,
			expectation,
		] = data_sets[index];

		void it(
			`object_only_has_that_property() returns ${
				expectation ? 'true' : 'false'
			} with data set ${
				index
			}`,
			() => {
				assert.strictEqual(
					object_only_has_that_property(
						maybe,
						property,
						predicate,
					),
					expectation
				)
			}
		)
	}
})

void describe('is_string', () => {
	void it('behaves', () => {
		assert.strictEqual(
			is_string(null),
			false,
		)
		assert.strictEqual(
			is_string('foo'),
			true
		)
	})
})
