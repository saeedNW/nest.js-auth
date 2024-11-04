import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { OTPEntity } from "../user/entities/otp.entity";
import { SendOtpDto } from "./dto/send-otp.dto";
import { randomInt } from "crypto";
import { CheckOtpDto } from "./dto/check-otp.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TTokensPayload } from "./types/token-payload.type";

@Injectable()
export class AuthService {
	constructor(
		//* Define user repository and its entity type
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,

		//* Define otp repository and its entity type
		@InjectRepository(OTPEntity)
		private otpRepository: Repository<OTPEntity>,

		//* Define a private service for using jwt and its service type
		private jwtService: JwtService,

		//* Define a private service for configs
		private configService: ConfigService
	) {}

	/**
	 * The process of sending the otp code
	 * @param {SendOtpDto} otpDto - client phone number
	 *
	 * @returns {Promise<object} - Return on object contains a message and the otp code
	 */
	async sendOtp(otpDto: SendOtpDto): Promise<object> {
		const { mobile } = otpDto;

		/** check if there is any user with this phone number */
		let user: UserEntity | null = await this.userRepository.findOneBy({
			mobile,
		});

		if (!user) {
			/** create new user */
			user = this.userRepository.create({ mobile });
			user = await this.userRepository.save(user);
		}

		/** create user's otp code */
		const code: string = await this.createOtpCode(user);

		//TODO: Add a condition to prevent sending the OTP code in production environment
		return {
			message: "OTP sent successfully",
			code,
		};
	}

	async checkOtp(otpDto: CheckOtpDto): Promise<object> {
		const { mobile, code } = otpDto;

		/** check if there is any user with this phone number */
		let user: UserEntity | null = await this.userRepository.findOne({
			where: { mobile },
			relations: ["otp"],
		});

		/** throe error if user was not found */
		if (!user) {
			throw new UnauthorizedException("User was not found");
		}

		/** throw error if otp is invalid */
		if (user?.otp?.code !== code) {
			throw new UnauthorizedException("invalid OTP code");
		}

		/** throw error if OTP was expired */
		if (user?.otp?.expires_in < new Date()) {
			throw new UnauthorizedException("this code has been expired");
		}

		/** update user phone verification status */
		if (!user.mobile_verify) {
			await this.userRepository.update(
				{ id: user.id },
				{ mobile_verify: true }
			);
		}

		const { accessToken, refreshToken } = this.createAccessToken({
			id: user.id,
			mobile,
		});

		return {
			message: "Logged in successfully",
			accessToken,
			refreshToken,
		};
	}

	/**
	 * Process of creating user's OTP code
	 * @param {UserEntity} user - User's data
	 */
	async createOtpCode(user: UserEntity): Promise<string> {
		/** generate OTP code data */
		const code: string = randomInt(10000, 99999).toString();
		const expires_in: Date = new Date(new Date().getTime() + 1000 * 60 * 2);

		/** check if user has an OTP or not */
		let otp: OTPEntity | null = await this.otpRepository.findOneBy({
			userId: user.id,
		});

		if (otp) {
			/** throw error if OTP not expired */
			if (otp.expires_in > new Date()) {
				throw new BadRequestException("OTP code not expired");
			}

			/** update otp data */
			otp.code = code;
			otp.expires_in = expires_in;
		} else {
			/** create new otp */
			otp = this.otpRepository.create({ code, expires_in, userId: user.id });
		}

		/** save otp data */
		otp = await this.otpRepository.save(otp);

		/** update user otp data */
		user.otpId = otp.id;
		await this.userRepository.save(user);

		return code;
	}

	/**
	 * Generates access and refresh tokens for user
	 * @template TTokensPayload - The type of the payload required to generate tokens
	 * @param {TTokensPayload} payload - The payload data used to generate the tokens
	 * @returns {{ accessToken: string; refreshToken: string }} An object containing access and refresh tokens
	 */
	createAccessToken(payload: TTokensPayload): {
		accessToken: string;
		refreshToken: string;
	} {
		/** create user access token */
		const accessToken: string = this.jwtService.sign(payload, {
			secret: this.configService.get("Jwt.accessTokenSecret"),
			expiresIn: "30d",
		});

		/** create user refresh token */
		const refreshToken: string = this.jwtService.sign(payload, {
			secret: this.configService.get("Jwt.refreshTokenSecret"),
			expiresIn: "1y",
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	/**
	 * Clients' access token validation process
	 * @param {string} token - Access token retrieved from client's request
	 * @throws {UnauthorizedException} - In case of invalid token throw "Unauthorized Exception" error
	 * @returns {Promise<UserEntity | never>} - Returns user's data or throw an error
	 */
	async validateAccessToken(token: string): Promise<UserEntity | never> {
		try {
			/** verify access token */
			const payload = this.jwtService.verify<TTokensPayload>(token, {
				secret: this.configService.get("Jwt.accessTokenSecret"),
			});

			/** proceed if the verified payload is an object and has a id property */
			if (typeof payload === "object" && "id" in payload) {
				/** retrieve user's data from database */
				const user = await this.userRepository.findOneBy({ id: payload.id });

				/** throw error if user was not found */
				if (!user) {
					throw new UnauthorizedException("login on your account ");
				}

				/** return user's data */
				return user;
			}

			throw new UnauthorizedException("login on your account ");
		} catch (error) {
			throw new UnauthorizedException("login on your account ");
		}
	}
}
