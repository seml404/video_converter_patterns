import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
  private static logger: IStreamLogger | null;

  private static GetInstanceLogger(): IStreamLogger {
    if (ConsoleLogger.logger) {
      return ConsoleLogger.logger;
    } else {
      ConsoleLogger.logger = new ConsoleLogger();
      return ConsoleLogger.logger;
    }
  }

  log(...args: any[]) {
    console.log(args);
  }
  end() {
    console.log("Finished");
  }
  error(): void {
    console.log("Error");
  }
}
