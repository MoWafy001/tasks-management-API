import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Task } from "./Task";
import { Category } from "./Category";

@Entity({ name: "users" })
export class User extends BaseEntity {
  // id
  @PrimaryGeneratedColumn()
  id: number;

  // name
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  // email
  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  // SHA256 hash of the password
  @Column({
    type: "varchar",
    length: 64,
  })
  password: string;

  // tasks (one-to-many relationship with Task)
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  // task categories
  @OneToMany(() => Category, (category) => category.user)
  taskCategories: Category[];

  // createdAt
  @CreateDateColumn()
  createdAt: Date;

  // updatedAt
  @UpdateDateColumn()
  updatedAt: Date;
}
