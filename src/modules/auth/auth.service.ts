import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { OTPEntity } from "../user/entities/otp.entity";
import { SendOtpDto } from "./dto/send-otp.dto";
import { randomInt } from "crypto";

@Injectable()
export class AuthService {
	constructor(
		//* Define user repository and its entity type
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,

		//* Define otp repository and its entity type
		@InjectRepository(OTPEntity)
		private otpRepository: Repository<OTPEntity>
	) {}

	/**
	 * The process of sending the otp code
	 * @param {SendOtpDto} otpDto - client phone number
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

		return {
			message: "OTP sent successfully",
			code,
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
}
