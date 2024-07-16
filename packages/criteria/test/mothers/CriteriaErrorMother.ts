import { CriteriaError } from "../../src/CriteriaError";

export class CriteriaErrorMother {
	static withMessage(message: string): CriteriaError {
		return new CriteriaError(message);
	}
}
