declare module "@agm/optional" {
	export class Optional<T> {
		constructor(value: T | null | undefined);
		static empty<T>(): Optional<T>;
		static of<T>(value: T): Optional<T>;
		static ofNullable<T>(value: T | null | undefined): Optional<T>;
		isEmpty(): boolean;
		isPresent(): boolean;
		fold<E, V>(emptyFn: () => E, valueFn: (value: T) => V): E | V;
		get(): T;
		orElse<E>(other: E): E;
		orElseThrow<E>(error: E): E;
		map<R>(mapper: (value: T) => R): Optional<R>;
	}
}
