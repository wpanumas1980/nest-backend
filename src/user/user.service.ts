import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>

    ) { }

    async create(data): Promise<User> {

        return await this.userRepository.save(data);
    }

    async findAll(): Promise<User[]> {

        return await this.userRepository.find();

    }

    async findOne(data): Promise<User> {

        return this.userRepository.findOne({ where: data });
    }

    update(id: number, updateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }



}
