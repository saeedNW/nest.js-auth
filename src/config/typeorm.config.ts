import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(
		connectionName?: string
	): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
		return {
			type: "postgres",
			port: this.configService.get("Db.port"),
			host: this.configService.get("Db.host"),
			username: this.configService.get("Db.username"),
			password: this.configService.get("Db.password"),
			database: this.configService.get("Db.database"),
			autoLoadEntities: true,
			synchronize: true,
		};
	}
}
