export class LimitExceededErrorResponse {
  constructor(
    private readonly banTime: number
  ) {}

  accessBanTime(): number {
    return this.banTime;
  }
}
