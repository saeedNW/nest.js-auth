import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { OTPEntity } from "./entities/otp.entity";

@Module({
	//* Activate user's entity on user module
	imports: [TypeOrmModule.forFeature([UserEntity, OTPEntity])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
