import { CriteriaError } from "../../src/CriteriaError";

export class CriteriaErrorMother {
	static invalidOrderType(value: unknown): CriteriaError {
		return new CriteriaError(`Invalid order type: ${value}`);
	}

	static mustBeString(name: string): CriteriaError {
		return new CriteriaError(`${name} must be a string`);
	}
}
