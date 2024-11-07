import { Expose } from "class-transformer";
import { IsMobilePhone, IsString, Length } from "class-validator";
import { ConfirmedPassword } from "src/common/decorators/password.decorator";

export class SignupDto {
	@IsString()
	@Expose()
	firstName: string;

	@IsString()
	@Expose()
	lastName: string;

	@IsMobilePhone("fa-IR", {}, { message: "Invalid phone number" })
	@Expose()
	mobile: string;

	@IsString()
	@Length(6, 20, { message: "Invalid password" })
	@Expose()
	password: string;

	@IsString()
	@ConfirmedPassword("password")
	@Expose()
	confirm_password: string;
}
