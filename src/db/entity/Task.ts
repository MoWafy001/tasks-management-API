import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

/**
 * title
 * description
 * status (enum: "todo" | "in-progress" | "done")
 * createdAt
 * updatedAt
 * userId (foreign key to User)
 * categoryId (foreign key to Category)
 */

export enum StatusTypes {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

@Entity({ name: "tasks" })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  description: string;

  @Column({
    type: "enum",
    enum: StatusTypes,
    default: StatusTypes.TODO,
  })
  status: StatusTypes;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Category, (category) => category.tasks)
  category: Category;
}
