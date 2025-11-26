import pino from "pino";

// logger should write to a log file as well as console
import { multistream } from "pino-multi-stream";
import fs from "fs";
import { Transform } from "stream";

// Transform stream to enforce max line length for file output
const maxLineLength = 200;
const truncateStream = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split("\n");
    const processed = lines
      .map((line: string) =>
        line.length > maxLineLength ? line.slice(0, maxLineLength) : line,
      )
      .join("\n");
    callback(null, processed + "\n");
  },
});

fs.mkdirSync("./logs", { recursive: true });

const streams = [
  {
    stream: truncateStream.pipe(
      fs.createWriteStream("./logs/app.log", { flags: "a" }),
    ),
  },
  {
    stream: pino.transport({
      target: "pino-pretty",
      options: { colorize: true },
    }),
  },
];

const logger = pino({ level: "info" }, multistream(streams));

export default logger;
