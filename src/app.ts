// import { inquirer } from 'inquirer';
import { Console } from "console";
import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { PromptService } from "./core/prompt/prompt.service";
import { ConsoleLogger } from "./out/console-logger/console-logger";
export class App {
  async run() {
    // const res = await (new PromptService()).input<number>(
    //   "Введите число",
    //   "input"
    // );
    // console.log(res);

    ///final
    new FfmpegExecutor(ConsoleLogger.GetInstanceLogger()).execute();
  }
}

const app = new App();

app.run();
