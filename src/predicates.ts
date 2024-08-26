export type predicate<Value = unknown> = (maybe:unknown) => maybe is Value;

export function object_has_property<
	Property extends string = string,
	Value = unknown
>(
	maybe: unknown,
	property: Property,
	predicate: undefined|(predicate<Value>) = undefined,
): maybe is {[key: string]: unknown} & {[key in Property]: Value} {
	return (
		value_is_non_array_object(maybe)
		&& property in maybe
		&& (
			undefined === predicate
			|| predicate(maybe[property])
		)
	);
}

export function object_has_only_properties_that_match_predicate<
	Value = unknown
>(
	maybe: unknown,
	predicate:predicate<Value>,
): maybe is {[key: string]: Value} {
	return (
		value_is_non_array_object(maybe)
		&& Object.values(maybe).every(e => predicate(e))
	);
}

export function property_exists_on_object(
	object: {[key: string]: unknown},
	property: string,
) :  property is keyof object {
	return property in object;
}

export function object_has_non_empty_array_property<
	Property extends string = string,
	Value = unknown
>(
	maybe: unknown,
	property: Property,
	predicate:
		| undefined
		| (predicate<Value>) = undefined,
): maybe is (
	& {[key: string]: unknown}
	& {[key in Property]: [Value, ...Value[]]}
) {
	return (
		object_has_property(maybe, property)
		&& is_non_empty_array(maybe[property], predicate)
	);
}

export function object_has_property_that_equals(
	maybe: unknown,
	property: string,
	expects: unknown,
): maybe is {[key: string]: unknown} & {
	[key in typeof property]: typeof expects;
} {
	return object_has_property(maybe, property) && expects === maybe[property];
}

export function value_is_non_array_object(
	maybe: unknown,
): maybe is {[key: string]: unknown} {
	return (
		'object' === typeof maybe
		&& !(maybe instanceof Array)
		&& null !== maybe
	);
}

export function is_non_empty_array<T = unknown>(
	maybe: unknown,
	predicate:
		| undefined
		| (predicate<T>) = undefined,
): maybe is [T, ...T[]] {
	return (
		maybe instanceof Array
		&& maybe.length >= 1
		&& (undefined === predicate || maybe.every((e) => predicate(e)))
	);
}

export function object_only_has_that_property<T = unknown>(
	maybe: unknown,
	property: string,
	predicate: undefined | (predicate<T>) = undefined,
): maybe is {[key in typeof property]: T} {
	return (
		value_is_non_array_object(maybe)
		&& object_has_property(maybe, property)
		&& 1 === Object.keys(maybe).length
		&& (undefined === predicate || predicate(maybe[property]))
	);
}

export function is_string(maybe: unknown): maybe is string {
	return 'string' === typeof maybe;
}
