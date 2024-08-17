/** @template T */
export class Optional<T> {
	/**
	 * Returns an empty Optional instance
	 * @template T
	 * @returns {Optional<T>}
	 */
	static empty<T_1>(): Optional<T_1>;
	/**
	 * Returns an Optional instance with the non-null value.
	 * @template T
	 * @param {T} value
	 * @returns {Optional<T>}
	 * @throws {Error} if value is null or undefined
	 */
	static of<T_1>(value: T_1): Optional<T_1>;
	/**
	 * Returns an Optional instance with the value, if non-null, otherwise returns an empty Optional instance.
	 * @template T
	 * @param {T} value
	 */
	static ofNullable<T_1>(value: T_1): Optional<T_1>;
	/**
	 * @param {T|null|undefined} value
	 */
	constructor(value: T | null | undefined);
	/**
	 * Return true if there is no value present, otherwise false.
	 */
	isEmpty(): boolean;
	/**
	 * Return true if there is a value present, otherwise false.
	 */
	isPresent(): boolean;
	/**
	 * Returns the result of applying the given mapping function to the value if present, otherwise returns the result of applying the given empty-based mapping function.
	 * @template E,V
	 * @param {()=>E} emptyFn
	 * @param {(value:T)=>V} valueFn
	 */
	fold<E, V>(emptyFn: () => E, valueFn: (value: T) => V): E | V;
	/**
	 * Return the value if present, otherwise throws Error.
	 * @throws {Error} if no value is present
	 */
	get(): T;
	/**
	 * Return the value if present, otherwise return other.
	 * @param {T} other
	 */
	orElse(other: T): T;
	/**
	 * Return the value if present, otherwise throws provided Error
	 * @param {Error} error
	 * @throws {Error} if no value is present
	 */
	orElseThrow(error: Error): T;
	/**
	 * Return an Optional instance with the result of applying the given mapping function to the value if present, otherwise return an empty Optional instance.
	 * @template R
	 * @param {(value:T)=>R} mapper
	 * @returns {Optional<R>}
	 */
	map<R>(mapper: (value: T) => R): Optional<R>;
	#private;
}
