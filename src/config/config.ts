import { registerAs } from "@nestjs/config";

//? In NestJS you can use both ENV files or NestJS config files in order to create and manage
//? application's secret keys or other configuration related data.

//? The `@nestjs/config` module provides a structured way to manage environment-specific configuration
//? settings, such as database credentials, API keys, or application secrets. Using this module
//? makes it easy to access configuration values and keeps sensitive data out of the source code.

//* Define an enum which will be used to save the name of the configurations
export enum ConfigKeys {
	App = "App",
	Db = "Db",
	Jwt = "Jwt",
}

//* Register application's config
const AppConfig = registerAs(ConfigKeys.App, () => ({
	port: 3000,
}));

//* Register JWT config
const JwtConfig = registerAs(ConfigKeys.Jwt, () => ({
	accessTokenSecret: "aaff0c19a69c609f6b6bcb5af26972364172b4ae",
	refreshTokenSecret: "403803ed36e0cd6ba9d5ed87a1e8d03734ab4f72",
}));

//* Register database's config
const DbConfig = registerAs(ConfigKeys.Db, () => ({
	port: 5432,
	host: "localhost",
	username: "postgres",
	password: "root",
	database: "auth-otp",
}));

//? To set up configuration in your NestJS application, start by creating a new module file to manage
//? your configuration settings. Use the `ConfigModule` from `@nestjs/config` to load your configuration
//? files. Since `ConfigModule` accepts an array of configuration sources, make sure to export your
//? configuration settings as an array. This approach allows you to easily manage and load multiple
//? configuration files as needed.
//? Note that you have to import the newly created module into the "app.module" file in order for it to
//? be effective

//? You can find the module related to this config file in "project-root-dir/src/modules/config/config.module.ts"
export const configuration = [AppConfig, JwtConfig, DbConfig];
