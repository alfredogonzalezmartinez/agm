import {
	OrderType,
	type OrderTypeValue,
	orderTypes,
} from "../../src/OrderType";

function randomOrderTypeValue(): OrderTypeValue {
	return orderTypes[Math.floor(Math.random() * orderTypes.length)];
}

const INVALID_VALUES = [
	() => 123,
	() => "",
	() => null,
	() => "invalid",
	() => new Date(),
];

function invalidOrderTypeValue() {
	return INVALID_VALUES[Math.floor(Math.random() * INVALID_VALUES.length)]();
}

export class OrderTypeMother {
	static random(): OrderType {
		return new OrderType(randomOrderTypeValue());
	}

	static invalidValue(): OrderTypeValue {
		return invalidOrderTypeValue() as OrderTypeValue;
	}
}
