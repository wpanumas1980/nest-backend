import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) { }

    async create(data): Promise<Role> {

        return await this.roleRepository.save(data);
    }

    async findAll(): Promise<Role[]> {

        return this.roleRepository.find();

    }

    async findOne(data): Promise<Role> {

        return await this.roleRepository.findOne({ where: data });
    }

    async update(id: number, data): Promise<any> {

        return await this.roleRepository.update(id, data);

    }

    async remove(id: number): Promise<any> {
        return this.roleRepository.delete(id);
    }

}

