export class FixedClock {
  constructor(private readonly current: Date) {}

  now(): Date {
    return new Date(this.current);
  }
}

export class FixedIdGenerator {
  private next = 0;

  constructor(private readonly prefix = "test") {}

  generate(): string {
    this.next += 1;
    return `${this.prefix}-${this.next}`;
  }
}
