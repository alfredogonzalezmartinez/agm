import { CriteriaError } from "./CriteriaError";

export class OrderBy {
	#value: string;

	constructor(value: string) {
		this.#ensureIsString(value);

		this.#value = value;
	}

	static fromValue(value: string): OrderBy {
		return new OrderBy(value);
	}

	value(): string {
		return this.#value;
	}

	isEmpty(): boolean {
		return this.#value.trim() === "";
	}

	#ensureIsString(value: string): void {
		if (typeof value !== "string") {
			throw new CriteriaError("OrderBy must be a string");
		}
	}
}
