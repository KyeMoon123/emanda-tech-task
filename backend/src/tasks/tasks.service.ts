import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Task} from './entities/tasks.entity';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskResponseDto} from "@/Api/src/tasks/dto/task-response.dto";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const task = new Task();
            task.title = createTaskDto.title;
            if (createTaskDto.parentId) {
                const parentTask = await this.tasksRepo.findOne({
                    where: {id: createTaskDto.parentId},
                    relations: ['parent'],
                });
                task.parent = parentTask ?? undefined;
            }
            return this.tasksRepo.save(task);
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }

    /**
     * Fetches all tasks from the database. including their subtasks
     * @returns {Promise<Task[]>}
     */
    async findAll(): Promise<TaskResponseDto[]> {
        const result = await this.tasksRepo.find({relations: ['subtasks', 'parent']});
        return this.mapToTaskResponseDto(result);
    }

    /**
     * Fetches a task by its ID.
     * @param id
     * @returns {Promise<Task | null>} null if not found
     */
    async findOne(id: number): Promise<TaskResponseDto> {
        const result = await this.tasksRepo.findOne({where: {id}, relations: ['subtasks', 'parent']});
        if (!result) {
            throw new Error(`Task with ID ${id} not found`);
        }
        return this.mapSingleTask(result)
    }

    /**
     * Fetches all tasks and their subtasks, building a nested structure.
     * @returns {Promise<Task[]>}
     */
    async findAllWithNested(): Promise<TaskResponseDto[]> {
        const tasks = await this.tasksRepo.find({relations: ['subtasks', 'parent']});
        return this.buildTaskTree(tasks);
    }

    /**
     * Fetches all subtasks of a task by its ID.
     * @param id
     * @returns {Promise<Task[]>}
     */
    async findSubtasks(id: number): Promise<TaskResponseDto[]> {
        const task = await this.tasksRepo.findOne({
            where: {id},
            relations: ['subtasks'],
        });
        if (!task) {
            throw new Error(`Task with ID ${id} not found`);
        }
        return this.mapToTaskResponseDto(task.subtasks)
    }

    /**
     * Builds a tree structure from a flat list of tasks and their subtasks.
     * @param tasks
     * @private
     */
    private buildTaskTree(tasks: Task[]): TaskResponseDto[] {
        const taskMap = new Map<number, Task>();
        tasks.forEach(task => {
            task.subtasks = [];
            taskMap.set(task.id, task);
        });

        const tree: Task[] = [];

        tasks.forEach(task => {
            if (task.parent) {
                const parentTask = taskMap.get(task.parent.id);
                if (parentTask) {
                    parentTask.subtasks.push(task);
                }
            } else {
                tree.push(task);
            }
        });

        return this.mapToTaskResponseDto(tree)
    }

    private mapToTaskResponseDto(tasks: Task[]): TaskResponseDto[] {
        return tasks.map((task) => this.mapSingleTask(task));
    }

    private mapSingleTask(task: Task): TaskResponseDto {
        return {
            id: task.id,
            title: task.title,
            parentId: task.parent?.id,
            subtasks: task.subtasks ? this.mapToTaskResponseDto(task.subtasks) : [],
        };
    }
}
