/** @template T */
export class Optional {
	#value;

	/**
	 * @param {T|null|undefined} value
	 */
	constructor(value) {
		this.#value = value ?? null;
	}

	/**
	 * Returns an empty Optional instance
	 * @template T
	 * @returns {Optional<T>}
	 */
	static empty() {
		return new Optional(null);
	}

	/**
	 * Returns an Optional instance with the non-null value.
	 * @template T
	 * @param {T} value
	 * @returns {Optional<T>}
	 * @throws {Error} if value is null or undefined
	 */
	static of(value) {
		if (value == null) {
			throw new Error("Value cannot be null or undefined");
		}

		return new Optional(value);
	}

	/**
	 * Returns an Optional instance with the value, if non-null, otherwise returns an empty Optional instance.
	 * @template T
	 * @param {T} value
	 */
	static ofNullable(value) {
		return new Optional(value);
	}

	/**
	 * Return true if there is no value present, otherwise false.
	 */
	isEmpty() {
		return this.#value === null;
	}

	/**
	 * Return true if there is a value present, otherwise false.
	 */
	isPresent() {
		return !this.isEmpty();
	}

	/**
	 * Returns the result of applying the given mapping function to the value if present, otherwise returns the result of applying the given empty-based mapping function.
	 * @template E,V
	 * @param {()=>E} emptyFn
	 * @param {(value:T)=>V} valueFn
	 */
	fold(emptyFn, valueFn) {
		return this.isEmpty() ? emptyFn() : valueFn(this.#value);
	}

	/**
	 * Return the value if present, otherwise throws Error.
	 * @throws {Error} if no value is present
	 */
	get() {
		return this.fold(
			() => {
				throw new Error("Value is empty");
			},
			(value) => value,
		);
	}

	/**
	 * Return the value if present, otherwise return other.
	 * @param {T} other
	 */
	orElse(other) {
		return this.fold(
			() => other,
			(value) => value,
		);
	}

	/**
	 * Return the value if present, otherwise throws provided Error
	 * @param {Error} error
	 * @throws {Error} if no value is present
	 */
	orElseThrow(error) {
		return this.fold(
			() => {
				throw error;
			},
			(value) => value,
		);
	}

	/**
	 * Return an Optional instance with the result of applying the given mapping function to the value if present, otherwise return an empty Optional instance.
	 * @template R
	 * @param {(value:T)=>R} mapper
	 * @returns {Optional<R>}
	 */
	map(mapper) {
		return this.fold(
			() => Optional.empty(),
			(value) => Optional.of(mapper(value)),
		);
	}
}
