import { areFormFieldsValid, isFormFieldValid } from "./validationService";

describe("isFormFieldValid method", () => {
    it("returns true when form field has set no validation rules", () => {
        const value = "test value";
        const rules = undefined;

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(true);
    });

    it("returns true when form field is required and not empty", () => {
        const value = " test value ";
        const rules = { required: true };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(true);
    });

    it("returns false when form field is required but empty", () => {
        const value = "";
        const rules = { required: true };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(false);
    });

    it("returns true when form field has rule 'minLength' and is valid", () => {
        const value = "test test value";
        const rules = { minLength: 6 };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(true);
    });

    it("returns false when form field has rule 'minLength' and is invalid", () => {
        const value = "test";
        const rules = { minLength: 6 };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(false);
    });

    it("returns true when form field has rule 'isEmail' and is valid", () => {
        const value = "test@test.pl";
        const rules = { isEmail: true };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(true);
    });

    it("returns false when form field has rule 'isEmail' and is invalid", () => {
        const value = "test@test";
        const rules = { isEmail: true };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(false);
    });

    it("returns true when form field has rule 'isNumeric' and is valid", () => {
        const value = 10;
        const rules = { isNumeric: true };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(true);
    });

    it("returns false when form field has rule 'isNumeric' and is invalid", () => {
        const value = "test";
        const rules = { isNumeric: true };

        const result = isFormFieldValid(value, rules);

        expect(result).toBe(false);
    });
});

describe("areFormFieldsValid method", () => {
    it("returns false when any of the form fields is invalid", () => {
        const form = {
            email: { valid: false },
            password: { valid: true }
        };

        const result = areFormFieldsValid(form);

        expect(result).toBe(false);
    });

    it("returns true when all of the form fields are valid", () => {
        const form = {
            email: { valid: true },
            password: { valid: true }
        };

        const result = areFormFieldsValid(form);

        expect(result).toBe(true);
    });
});
