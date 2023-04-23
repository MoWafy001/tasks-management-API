import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => User, (user) => user.taskCategories)
  user: User;

  @ManyToOne(() => Task, (task) => task.category)
  tasks: Task;
}
