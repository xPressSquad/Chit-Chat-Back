import { IsString, IsArray, IsEnum, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum ServerType {
  DUO = 'duo',
  GROUP = 'group',
}

export class CreateServerDto {
    @IsNotEmpty()
    @IsString()
  name: string;

  @IsUrl()
  cover: string;

  @IsString()
  admin: string;

  @IsArray()
  @IsString({ each: true })
  members: string[];

  @IsEnum(Visibility)
  visibility: Visibility;

  @IsEnum(ServerType)
  type: ServerType;
}
