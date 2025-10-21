import { Injectable, Inject, Logger } from '@nestjs/common';
import { ILoginEventRepository } from '../../interfaces/repositories/login-event-repository.interface';
import { LoginHistoryItemDto, LoginHistoryResponseDto } from '../../dtos/auth/login-history-response.dto';

interface GetLoginHistoryParams {
  userId: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class GetLoginHistoryUseCase {
  private readonly logger = new Logger(GetLoginHistoryUseCase.name);

  constructor(
    @Inject('ILoginEventRepository')
    private readonly loginEventRepository: ILoginEventRepository,
  ) {}

  async execute({ userId, page = 1, limit = 10 }: GetLoginHistoryParams): Promise<LoginHistoryResponseDto> {
    this.logger.debug(`Fetching login history for user: ${userId}, page ${page}, limit ${limit}`);

    const events = await this.loginEventRepository.findByUserId(userId, page, limit);
    const totalCount = await this.loginEventRepository.countByUserId(userId);

    const items = events.map(e => new LoginHistoryItemDto(e.id, e.createdAt, e.deviceInfo, e.userAgent));

    return new LoginHistoryResponseDto(true, userId, totalCount, items);
  }
}