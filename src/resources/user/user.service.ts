import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { passwordToHash } from 'src/utils/crypto/transform';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashed = await passwordToHash(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashed,
    });

    const created = this.userRepository.save(user);
    return instanceToPlain(created);
  }

  async findAll() {
    const users = await this.userRepository.find();

    return instanceToPlain(users);
  }

  async findOneRaw(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
