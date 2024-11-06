import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [
		//? Import 'AuthModule' to access 'AuthGuard' and its dependencies without re-adding providers
		//? For detailed dependency setup, refer to 'auth.module.ts' file
		AuthModule,
		TypeOrmModule.forFeature([UserEntity]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
