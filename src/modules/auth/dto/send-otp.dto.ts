import { Expose } from "class-transformer";
import { IsMobilePhone } from "class-validator";

/**
 ** Send OTP dto
 */
export class SendOtpDto {
	//* Check if the phone number is valid
	@IsMobilePhone("fa-IR", {}, { message: "mobile number is invalid" })
	//* Make the data available in class-transformer module
	@Expose()
	mobile: string;
}
