import { describe, expect, test } from "vitest";
import { CriteriaError } from "../src/CriteriaError";
import { OrderType, type OrderTypeValue } from "../src/OrderType";
import { OrderTypeMother } from "./mothers/OrderTypeMother";

type OrderTypeTest = {
	NAME: string;
	VALUE: OrderTypeValue;
	NAMED_CONSTRUCTOR: string;
	VALIDATOR: string;
};

const ASC: OrderTypeTest = {
	NAME: "asc",
	VALUE: "asc",
	NAMED_CONSTRUCTOR: "asc",
	VALIDATOR: "isAsc",
};

const DESC: OrderTypeTest = {
	NAME: "desc",
	VALUE: "desc",
	NAMED_CONSTRUCTOR: "desc",
	VALIDATOR: "isDesc",
};

const NONE: OrderTypeTest = {
	NAME: "none",
	VALUE: "none",
	NAMED_CONSTRUCTOR: "none",
	VALIDATOR: "isNone",
};

const VALIDATORS = [ASC.VALIDATOR, DESC.VALIDATOR, NONE.VALIDATOR];

describe("OrderType", () => {
	testOrderType(ASC);
	testOrderType(DESC);
	testOrderType(NONE);

	describe("with invalid value", () => {
		test("can not be created from constructor", () => {
			const value = OrderTypeMother.invalidValue();
			const error = new CriteriaError(`Invalid order type: ${value}`);

			expect(() => new OrderType(value)).toThrowError(error);
		});

		test("can not be created from value", () => {
			const value = OrderTypeMother.invalidValue();
			const error = new CriteriaError(`Invalid order type: ${value}`);

			expect(() => OrderType.fromValue(value)).toThrowError(error);
		});
	});
});

function testOrderType(type: OrderTypeTest) {
	describe(type.NAME, () => {
		testOrderTypeCanBeCreatedFromConstructor(type);
		testOrderTypeCanBeCreatedFromNamedConstructor(type);
		testOrderTypeCanBeCreatedFromValue(type);
		testOrderTypeCanBeValidate(type);
	});
}

function testOrderTypeCanBeCreatedFromConstructor(type: OrderTypeTest) {
	test("can be created from constructor", () => {
		const { VALUE } = type;
		const orderType = new OrderType(VALUE);

		expect(orderType.value()).toBe(VALUE);
	});
}

function testOrderTypeCanBeCreatedFromNamedConstructor(type: OrderTypeTest) {
	test("can be created from named constructor", () => {
		const { NAMED_CONSTRUCTOR, VALUE } = type;
		const orderType = OrderType[NAMED_CONSTRUCTOR]();

		expect(orderType).toBeInstanceOf(OrderType);
		expect(orderType.value()).toBe(VALUE);
	});
}

function testOrderTypeCanBeCreatedFromValue(type: OrderTypeTest) {
	test("can be created from value", () => {
		const { VALUE } = type;
		const orderType = OrderType.fromValue(VALUE);

		expect(orderType).toBeInstanceOf(OrderType);
		expect(orderType.value()).toBe(VALUE);
	});
}

function testOrderTypeCanBeValidate(type: OrderTypeTest) {
	test("can be validate", () => {
		const { VALUE, VALIDATOR } = type;
		const orderType = new OrderType(VALUE);

		VALIDATORS.map((validatorName) => {
			expect(orderType[validatorName]()).toBe(VALIDATOR === validatorName);
		});
	});
}
