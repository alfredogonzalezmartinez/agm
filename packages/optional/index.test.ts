import { describe, expect, test } from "vitest";
import { Optional } from "./index.js";

describe("Optional should", () => {
	test("validate is present an existing value", () => {
		const optional = Optional.of(1);

		expect(optional.isPresent()).toBe(true);
	});

	test("validate is present a non existing value", () => {
		const optional: Optional<number> = Optional.empty();

		expect(optional.isPresent()).toBe(false);
	});

	test("validate is empty an existing value", () => {
		const optional = Optional.of(1);

		expect(optional.isEmpty()).toBe(false);
	});

	test("validate is empty a non existing value", () => {
		const optional: Optional<number> = Optional.empty();

		expect(optional.isEmpty()).toBe(true);
	});

	test("fold an existing value", () => {
		const optional = Optional.of(1);

		expect(
			optional.fold(
				() => 1,
				(value) => value * 5,
			),
		).toBe(5);
	});

	test("fold a non existing value", () => {
		const optional: Optional<number> = Optional.empty();

		expect(
			optional.fold(
				() => 1,
				(value) => value * 5,
			),
		).toBe(1);
	});

	test("get an existing value value", () => {
		const optional = Optional.of(1);

		expect(optional.get()).toBe(1);
	});

	test("throw Error when get a non existing value", () => {
		const optional: Optional<number> = Optional.empty();

		expect(() => optional.get()).toThrowError("Value is empty");
	});

	test("get other value if is not present", () => {
		const optional: Optional<number> = Optional.empty();

		expect(optional.orElse(1)).toBe(1);
	});

	test("not get other value if is present", () => {
		const optional = Optional.of(1);

		expect(optional.orElse(2)).toBe(1);
	});

	test("throw custom Error when get a non existing value", () => {
		const optional: Optional<number> = Optional.empty();

		expect(() => optional.orElseThrow(new Error("Custom Error"))).toThrowError(
			"Custom Error",
		);
	});

	test("not throw custom Error when get an existing value", () => {
		const optional = Optional.of(1);

		expect(optional.orElseThrow(new Error("Custom Error"))).toBe(1);
	});

	test("map an existing value", () => {
		const optional = Optional.of(1);

		expect(optional.map((value) => value * 5).get()).toBe(5);
	});

	test("map a non existing value", () => {
		const optional: Optional<number> = Optional.empty();

		expect(optional.map((value) => value * 5).isPresent()).toBe(false);
	});
});
