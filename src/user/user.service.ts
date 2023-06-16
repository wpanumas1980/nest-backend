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

        return await this.userRepository.findOne({ where: data });
    }

  async  update(id: number, data): Promise<any> {

        return await this.userRepository.update(id, data);

    }

   async remove(id: number) : Promise<any>{
        return this.userRepository.delete(id);
    }



}
