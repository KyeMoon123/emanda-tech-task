import {ApiProperty} from "@nestjs/swagger";

export class TaskResponseDto {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    title!: string;

    @ApiProperty()
    parentId?: number;

    @ApiProperty({ type: () => TaskResponseDto, isArray: true })
    subtasks!: TaskResponseDto[];
}
