import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @ManyToOne(() => Task, (task) => task.subtasks, {nullable: true})
    parent?: Task;

    @OneToMany(() => Task, (task) => task.parent)
    subtasks!: Task[];
}
