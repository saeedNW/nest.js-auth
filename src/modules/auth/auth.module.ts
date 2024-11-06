import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { OTPEntity } from "../user/entities/otp.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, OTPEntity])],
	controllers: [AuthController],
	providers: [AuthService, JwtService],
	//? Since 'AuthGuard' depends on 'AuthService', and 'AuthService' itself relies on
	//? 'JwtService' and 'OTPEntity', you need to add these as providers and import
	//? `TypeOrmModule` for any module where you intend to use 'AuthGuard'. This enables
	//? NestJS's dependency injection to resolve these dependencies within that module.

	//? In NestJS, providers handle dependency injection within a module. By including
	//? 'AuthService' and 'JwtService' as providers, NestJS can correctly inject these
	//? dependencies wherever they’re needed, such as in 'AuthGuard' or other components.
	//? Without adding them as providers, attempting to use 'AuthGuard' will result in
	//? a dependency error due to unresolved dependencies.

	//? However, adding these same providers and modules in every module can lead to a
	//? circular dependency issue. To avoid this, consider moving shared dependencies
	//? into a shared module that can be imported across modules as needed.

	//? Instead of adding these dependencies in every module where 'AuthGuard' is used,
	//? you can add an `exports` option to 'AuthModule' for shared providers. This way,
	//? you only need to import 'AuthModule' in modules that require 'AuthGuard', and
	//? all necessary dependencies will be available.
	exports: [AuthService, JwtService, TypeOrmModule],
})
export class AuthModule {}
