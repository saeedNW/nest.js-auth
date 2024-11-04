import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SendOtpDto } from "./dto/send-otp.dto";
import { CheckOtpDto } from "./dto/check-otp.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Create a post method to send otp to clients
	 */
	@Post("/send-otp")
	sendOtp(@Body() sendOtpDto: SendOtpDto) {
		return this.authService.sendOtp(sendOtpDto);
	}

	@Post("/check-otp")
	checkOtp(@Body() checkOtpDto: CheckOtpDto) {
		return this.authService.checkOtp(checkOtpDto);
	}
}
