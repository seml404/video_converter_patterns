export interface IStreamLogger {
  log(...args: any[]): void;
  end(): void;
  error(): void;
}
