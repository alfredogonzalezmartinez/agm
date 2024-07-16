import { CriteriaError } from "../../src/CriteriaError";

export class CriteriaErrorMother {
	static invalidOrderType(value: unknown): CriteriaError {
		return new CriteriaError(`Invalid order type: ${value}`);
	}
}
