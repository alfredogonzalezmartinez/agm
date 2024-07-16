import { CriteriaError } from "./CriteriaError";

export const ORDER_TYPE = Object.freeze({
	ASC: "asc",
	DESC: "desc",
	NONE: "none",
});

export const orderTypes = Object.values(ORDER_TYPE);

export type OrderTypeValue = (typeof orderTypes)[number];

export class OrderType {
	#value: OrderTypeValue;

	constructor(value: OrderTypeValue) {
		this.#ensureIsValid(value);
		this.#value = value;
	}

	#ensureIsValid(value: OrderTypeValue): void {
		if (!orderTypes.includes(value)) {
			throw new CriteriaError(`Invalid order type: ${value}`);
		}
	}

	static asc() {
		return new OrderType(ORDER_TYPE.ASC);
	}

	static desc() {
		return new OrderType(ORDER_TYPE.DESC);
	}

	static none() {
		return new OrderType(ORDER_TYPE.NONE);
	}

	static fromValue(value: string): OrderType {
		return new OrderType(value as OrderTypeValue);
	}

	value(): OrderTypeValue {
		return this.#value;
	}

	toString(): string {
		return this.#value;
	}

	isNone(): boolean {
		return this.#value === ORDER_TYPE.NONE;
	}

	isAsc(): boolean {
		return this.#value === ORDER_TYPE.ASC;
	}

	isDesc(): boolean {
		return this.#value === ORDER_TYPE.DESC;
	}
}
