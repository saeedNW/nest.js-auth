import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OTPEntity } from "./otp.entity";

//* Initialize user entity
@Entity("user")
export class UserEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;
	@Column({ nullable: true })
	firstName: string;
	@Column({ nullable: true })
	lastName: string;
	@Column({ unique: true })
	mobile: string;
	@Column({ nullable: true })
	password: string;
	@Column({ default: false })
	mobile_verify: boolean;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
	//* Create a One to One relation between user and otp tables
	@Column({ nullable: true })
	otpId: number;
	@OneToOne(() => OTPEntity, (otp) => otp.user)
	@JoinColumn({ name: "otpId" })
	otp: OTPEntity;
}
