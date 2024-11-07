import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidatorOptions,
	registerDecorator,
} from "class-validator";

/**
 * Custom decorator `ConfirmedPassword` to validate if a confirmation password field matches
 * the specified password field. This is used in form validation for fields like `confirmPassword`
 * to ensure it matches the original `password` field
 *
 * @param {string} property - The name of the property to compare against (password)
 * @param {string} message - Optional value for error message
 * @param {ValidatorOptions} validationOption - Optional validator configuration options
 */
export function ConfirmedPassword(
	property: string,
	message?: string,
	validationOption?: ValidatorOptions
) {
	/** Return a function that registers the decorator */
	return (object: any, propertyName: string) => {
		//* registerDecorator method is used to define and create a new decorator
		registerDecorator({
			//* The target class where this decorator is used (In this case SignupDto)
			target: object.constructor,
			//* Decorator target (The class, variable, function or etc. that comes right under the decorator. In this case confirmPassword)
			propertyName,
			//* Additional validation options
			options: validationOption,
			//* Specifies the properties used in the validation logic (In this case password and message)
			//? 'constraints' typically contains additional data specified by the developer when using the decorator.
			constraints: [property, message],
			//* Specifies the validator class to handle the custom validation logic when the decorator is applied.
			validator: ConfirmedPasswordConstrains,
		});
	};
}

/**
 * Define a validator constraint class `ConfirmedPasswordConstrains`
 * which implements the actual validation logic
 */
@ValidatorConstraint({
	name: "ConfirmedPassword",
})
export class ConfirmedPasswordConstrains
	implements ValidatorConstraintInterface
{
	/**
	 * `validate` method checks if the value of the field decorated with `ConfirmedPassword`
	 * matches the value of the specified `property` (password)
	 * This method is called automatically during validation
	 *
	 * @param value - The value of the decorated property
	 * @param args - ValidationArguments containing context and constraints
	 * @returns `true` if values match; otherwise, `false`
	 */
	validate(value: any, args?: ValidationArguments) {
		//* Note: object contains the data sent by user
		const { object, constraints } = args;
		/** extract the name of the filed that the decorator's target should be compared to (In this case password) */
		const [property] = constraints;
		/** retrieve the value of the filed that the decorator's target should be compared to (In this case password) */
		const relatedValue = object[property];

		return value === relatedValue;
	}

	/**
	 * `defaultMessage` method provides a custom error message when validation fails.
	 */
	defaultMessage(validationArguments?: ValidationArguments): string {
		const message = validationArguments.constraints[1];
		return message ?? "password and confirm password should be equals";
	}
}
