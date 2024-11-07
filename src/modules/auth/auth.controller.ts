import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SendOtpDto } from "./dto/send-otp.dto";
import { CheckOtpDto } from "./dto/check-otp.dto";
import { SignupDto } from "./dto/sign-up.dto";
import { LoginDto } from "./dto/login.dto";
import { plainToClass } from "class-transformer";

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

	/**
	 * Create a post method to validate OTP sent by client
	 */
	@Post("/check-otp")
	checkOtp(@Body() checkOtpDto: CheckOtpDto) {
		return this.authService.checkOtp(checkOtpDto);
	}

	/**
	 * Create a post method to be used in order for clients to signup
	 */
	@Post("/signup")
	signup(@Body() signupDto: SignupDto) {
		/** filter client data and remove unwanted data */
		const filteredData = plainToClass(SignupDto, signupDto, {
			excludeExtraneousValues: true,
		});

		return this.authService.signup(filteredData);
	}

	/**
	 * Create a post method to be used in order for clients to login
	 */
	@Post("/login")
	login(@Body() loginDto: LoginDto) {
		/** filter client data and remove unwanted data */
		const filteredData = plainToClass(LoginDto, loginDto, {
			excludeExtraneousValues: true,
		});

		return this.authService.login(filteredData);
	}
}
