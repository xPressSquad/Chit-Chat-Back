import { IsString, IsArray, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

// Enums for validation
export enum ServerVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum ServerType {
  DUO = 'duo',
  GROUP = 'group',
}

export class CreateServerDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsString()
  @IsNotEmpty()
  admin: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  members?: string[] = [];

  @IsEnum(ServerVisibility, {
    message: 'Visibility must be either "public" or "private"'
  })
  visibility: ServerVisibility;

  @IsEnum(ServerType, {
    message: 'Type must be either "duo" or "group"'
  })
  type: ServerType;
}