import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {ApiDefinition} from "../decorators/api-standard-response.decorator";
import {TaskResponseDto} from "@/Api/src/tasks/dto/task-response.dto";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Post()
    @ApiDefinition({operationId: 'createTask', response: String})
    create(@Body() dto: CreateTaskDto) {
        return this.tasksService.create(dto);
    }

    @Get()
    @ApiDefinition({operationId: 'findAllTasks', response: [TaskResponseDto]})
    findAll() {
        return this.tasksService.findAll();
    }

    @Get('tree')
    @ApiDefinition({operationId: 'findAllNestedTasks', response: [TaskResponseDto]})
    findAllNested() {
        return this.tasksService.findAllWithNested();
    }

    @Get(':id')
    @ApiDefinition({operationId: 'findTask', response: TaskResponseDto})
    findOne(@Param('id') id: number) {
        return this.tasksService.findOne(id);
    }

    @Get(':id/subtasks')
    @ApiDefinition({operationId: 'findSubtasks', response: [TaskResponseDto]})
    findSubtasks(@Param('id') id: number) {
        return this.tasksService.findSubtasks(id);
    }
}
