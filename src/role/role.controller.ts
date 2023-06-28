import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RoleController {

    constructor(private roleService: RoleService) { }


    @Post()
    async create(
        @Body('name') name: string
    ) {
        return this.roleService.create({ name })
    }

    @Get()
    async findAll(): Promise<Role[]> {
        return await this.roleService.findAll();
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.roleService.findOne({ id });
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string
    ) {
        await this.roleService.update(id, { name });
        return this.roleService.findOne({ id });
    }

    @Delete(':id')
    async remove(
        @Param('id') id: number,
    ) {
        return this.roleService.remove(id);
    }
}
