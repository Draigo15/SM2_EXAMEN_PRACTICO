import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginEvent } from '../../domain/entities/login-event.entity';
import { ILoginEventRepository } from '../../application/interfaces/repositories/login-event-repository.interface';

@Injectable()
export class LoginEventRepository implements ILoginEventRepository {
  constructor(
    @InjectRepository(LoginEvent)
    private readonly repository: Repository<LoginEvent>,
  ) {}

  async save(event: LoginEvent): Promise<LoginEvent> {
    return await this.repository.save(event);
  }

  async findRecentByUserId(userId: string, limit = 10): Promise<LoginEvent[]> {
    return await this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findByUserId(userId: string, page = 1, limit = 10): Promise<LoginEvent[]> {
    const skip = Math.max(0, (page - 1) * limit);
    return await this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return await this.repository.count({ where: { userId } });
  }
}