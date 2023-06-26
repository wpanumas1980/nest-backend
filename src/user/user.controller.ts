import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(@Query('page') page = 1): Promise<User[]> {
        return await this.userService.paginate(page);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({ id });
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

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: UpdateUserDto
    ) {
        await this.userService.update(id, data);
        return this.userService.findOne({ id });
    }

    @Delete(':id')
    async remove(
        @Param('id') id: number,
    ) {
        return this.userService.remove(id);
    }
}
