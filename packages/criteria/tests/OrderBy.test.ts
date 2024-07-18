import { describe, expect, test } from "vitest";
import { CriteriaError } from "../src/CriteriaError";
import { OrderBy } from "../src/OrderBy";
import { CriteriaErrorMother } from "./mothers/CriteriaErrorMother";
import { OrderByMother } from "./mothers/OrderByMother";

describe("OrderBy", () => {
	test("can be instanced from constructor", () => {
		const value = OrderByMother.randomValue();
		const orderBy = new OrderBy(value);

		expect(orderBy).toBeInstanceOf(OrderBy);
		expect(orderBy.value()).toEqual(value);
	});

	test("can be instanced from value", () => {
		const value = OrderByMother.randomValue();
		const orderBy = OrderBy.fromValue(value);

		expect(orderBy).toBeInstanceOf(OrderBy);
		expect(orderBy.value()).toEqual(value);
	});

	test("trow a CriteriaError if value is not a string", () => {
		const value = OrderByMother.notStringValues();
		const error = CriteriaErrorMother.mustBeString("OrderBy");

		expect(() => new OrderBy(value)).toThrowError(CriteriaError);
		expect(() => new OrderBy(value)).toThrowError(error);
	});

	describe("isEmpty method", () => {
		test("return true, if is a empty string", () => {
			const orderBy = OrderByMother.empty();

			expect(orderBy.isEmpty()).toBe(true);
		});

		test("return false, if is not a empty string", () => {
			const orderBy = OrderByMother.random();

			expect(orderBy.isEmpty()).toBe(false);
		});
	});
});
