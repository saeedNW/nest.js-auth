import { Expose } from "class-transformer";
import { IsMobilePhone, IsString, Length } from "class-validator";

export class LoginDto {
	@IsMobilePhone("fa-IR", {}, { message: "Invalid phone number" })
	@Expose()
	mobile: string;

	@IsString()
	@Length(6, 20, { message: "Invalid password" })
	@Expose()
	password: string;
}
