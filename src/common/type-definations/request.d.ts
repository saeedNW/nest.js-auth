import { UserEntity } from "src/modules/user/entities/user.entity";

//? The original Request interface in Express does not include a "user" property, which results in
//? a type error whenever you try to set or access `user` on the Request object in NestJS or any TypeScript code.
//? To resolve this issue, you can extend the Request interface in Express to include a `user` property.

/** Declare a global module augmentation */
declare global {
	/** Extend the Express namespace */
	namespace Express {
		/** Extend the Request interface within the Express namespace */
		interface Request {
			/** Add an optional `user` property of type `UserEntity` to the Request interface */
			user?: UserEntity;
		}
	}
}
