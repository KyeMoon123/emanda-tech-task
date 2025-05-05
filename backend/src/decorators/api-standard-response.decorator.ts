// decorators/api-standard-response.decorator.ts
import {applyDecorators, Type} from '@nestjs/common';
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiProperty,
    ApiResponse,
    getSchemaPath,
    ApiOperation,
} from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({required: true})
    statusCode!: number;

    @ApiProperty()
    message!: string;

    @ApiProperty({required: false})
    error?: string;
}

export const ApiDefinition = <TModel extends Type<unknown>>({
                                                                response,
                                                                operationId,
                                                            }: {
    operationId: string;
    response?: TModel | [TModel];
}) => {
    const isArrayResponse = Array.isArray(response);
    const model = isArrayResponse ? response[0] as TModel : response as TModel;

    return applyDecorators(
        ApiOperation({operationId: operationId}),
        ...(response
            ? [
                ApiExtraModels(model, ErrorResponseDto),
                ApiOkResponse({
                    description: 'Success',
                    schema: isArrayResponse
                        ? {
                            type: 'array',
                            items: {$ref: getSchemaPath(model)},
                        }
                        : {$ref: getSchemaPath(model)},
                }),
            ]
            : []),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
            type: ErrorResponseDto,
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            type: ErrorResponseDto,
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            type: ErrorResponseDto,
        }),
        ApiResponse({
            status: 500,
            description: 'Internal Server Error',
            type: ErrorResponseDto,
        }),
    );
};
