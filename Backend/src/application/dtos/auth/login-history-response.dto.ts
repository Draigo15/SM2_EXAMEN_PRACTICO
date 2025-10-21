export class LoginHistoryItemDto {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly deviceInfo: string | null,
    public readonly userAgent: string | null,
  ) {}
}

export class LoginHistoryResponseDto {
  constructor(
    public readonly success: boolean,
    public readonly userId: string,
    public readonly totalCount: number,
    public readonly events: LoginHistoryItemDto[],
  ) {}
}