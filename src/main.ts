import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//? To access configuration values in your NestJS application, you can use the `ConfigService`
	//? from `@nestjs/config`. First, import `ConfigService` and retrieve it using `app.get(ConfigService)`.
	//? This allows you to access environment variables and other configuration settings defined in your
	//? configuration files or `.env` file.
	const configService = app.get(ConfigService);

	//? By accessing `ConfigService` globally in this way, you can retrieve configuration values directly
	//? and use them anywhere in your application. This approach is particularly useful for settings that
	//? need to be accessed outside of standard dependency injection, such as in the main application file.
	const PORT: number = configService.get<number>("App.port");

	await app.listen(PORT ?? 3000, () => {
		console.log(`App is running on http://localhost:${PORT}`);
	});
}
bootstrap();
