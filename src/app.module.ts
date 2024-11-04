import { Module } from "@nestjs/common";
import { CustomConfigModule } from "./modules/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/Filters/exception.filter";
import { ValidationPipe422 } from "./common/pipe/validation.pipe";
import { TransformerInterceptor } from "./common/interceptor/transformer.interceptor";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		CustomConfigModule,
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfig,
			inject: [TypeOrmConfig],
		}),
		UserModule,
		AuthModule,
		JwtModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe422,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformerInterceptor,
		},
		TypeOrmConfig,
	],
})
export class AppModule {}
