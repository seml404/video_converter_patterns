import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExec } from "../../core/executor/command.types";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { FileService } from "../../files/file.service";
import { FfmpegInput, ICommandExecFfmpeg } from "./ffmpeg.types";
import { PromptType } from "../../core/prompt/prompt.types";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { StreamHandler } from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<FfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<FfmpegInput> {
    const width = await this.promptService.input<number>("Ширина", "number");
    const height = await this.promptService.input<number>("Высота", "number");
    const path = await this.promptService.input<string>(
      "Путь до файла",
      "input"
    );
    const name = await this.promptService.input<string>("Имя файла", "input");
    return { width, height, path, name };
  }
  protected build({
    width,
    height,
    path,
    name,
  }: FfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFiletPath(path, name, "mp4");
    const args = new FfmpegBuilder()
      .input(path)
      .setVideoSize(width, height)
      .output(output);
    return { command: "ffmpeg", args, output };
  }
  protected spawn({
    output,
    command,
    args,
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteExistingFile(output);
    return spawn(command, args);
  }
  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream)
  }
}
