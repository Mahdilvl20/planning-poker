import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "src/messages/entities/message.entity";
import {Repository} from "typeorm";

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {
    }
  async create(createMessageDto: CreateMessageDto):Promise<Message> {
    const message=this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async findByRoomId(roomId:string):Promise<Message[]> {
        return this.messageRepository.find({
            where: {roomId},
            order:{timestamp:'ASC'},
        });
  }

  async deleteByRoomId(roomId: string): Promise<void> {
        await this.messageRepository.delete({ roomId });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
