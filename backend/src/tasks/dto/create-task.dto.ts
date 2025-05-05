import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    title!: string;
    @ApiProperty({required: false})
    parentId?: number;
}
  