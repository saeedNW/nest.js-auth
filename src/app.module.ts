import { Module } from "@nestjs/common";
import { CustomConfigModule } from "./modules/config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";

@Module({
	imports: [
		CustomConfigModule,
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfig,
			inject: [TypeOrmConfig],
		}),
	],
	controllers: [],
	providers: [TypeOrmConfig],
})
export class AppModule {}
