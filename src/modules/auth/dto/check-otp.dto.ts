import { Expose } from "class-transformer";
import { IsMobilePhone, IsString, Length } from "class-validator";

/**
 ** Check OTP dto
 */
export class CheckOtpDto {
	//* Check if the phone number is valid
	@IsMobilePhone("fa-IR", {}, { message: "mobile number is invalid" })
	//* Make the data available in class-transformer module
	@Expose()
	mobile: string;

	//* Check if the code is string
	@IsString()
	//* Check if the code length is 5 character
	@Length(5, 5, { message: "incorrect code" })
	//* Make the data available in class-transformer module
	@Expose()
	code: string;
}
