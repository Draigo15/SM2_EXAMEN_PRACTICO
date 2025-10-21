import { LoginEvent } from '../../../domain/entities/login-event.entity';

export interface ILoginEventRepository {
  save(event: LoginEvent): Promise<LoginEvent>;
  findRecentByUserId(userId: string, limit?: number): Promise<LoginEvent[]>;
  findByUserId(userId: string, page: number, limit: number): Promise<LoginEvent[]>;
  countByUserId(userId: string): Promise<number>;
}