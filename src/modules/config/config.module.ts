import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "src/config/config";

//* Create a new module which has the duty of loading configurations
@Module({
	imports: [
		ConfigModule.forRoot({
			//* Load configurations
			load: configuration,
			//* Set the configs to be globally accessible
			isGlobal: true,
		}),
	],
})
export class CustomConfigModule {}
