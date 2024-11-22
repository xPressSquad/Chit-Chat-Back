import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto, ServerVisibility, ServerType } from './create-server.dto';
import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateServerDto extends PartialType(CreateServerDto) {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsString()
  admin?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  members?: string[];

  @IsOptional()
  @IsEnum(ServerVisibility, {
    message: 'Visibility must be either "public" or "private"'
  })
  visibility?: ServerVisibility;

  @IsOptional()
  @IsEnum(ServerType, {
    message: 'Type must be either "duo" or "group"'
  })
  type?: ServerType;
}