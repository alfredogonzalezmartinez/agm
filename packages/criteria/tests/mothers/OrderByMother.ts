import { OrderBy } from "../../src/OrderBy";

const FIELDS = [
	"field0",
	"field1",
	"field2",
	"field3",
	"field4",
	"field5",
	"field6",
	"field7",
	"field8",
	"field9",
];

function field(): string {
	return FIELDS[Math.floor(Math.random() * FIELDS.length)];
}

const NOT_STRING_VALUES = [123, null, new Date(), [], {}];

function notStringValue() {
	return NOT_STRING_VALUES[
		Math.floor(Math.random() * NOT_STRING_VALUES.length)
	];
}

export class OrderByMother {
	static random(): OrderBy {
		return new OrderBy(field());
	}

	static empty(): OrderBy {
		return new OrderBy("");
	}

	static randomValue(): string {
		return field();
	}

	static notStringValues(): string {
		return notStringValue() as string;
	}
}
