import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({id});
    }

    @Post()
    async create(
        @Body() data: CreateUserDto
    ): Promise<User> {

        const password = bcrypt.hashSync('12345', 12)

        return await this.userService.create({
            ...data,
            password
        });
    }
}
