import winston from 'winston';

const {combine, label, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, label: labelStr, timestamp: timestampStr }) => {
  if (typeof message === 'object') {
    return `${timestampStr} ${labelStr} ${level}: ${JSON.stringify(message, undefined, 2)}`;
  }
  return `${timestampStr} ${labelStr} ${level}: ${message}`;
});

export function makeLogger() {
  return winston.createLogger({
    level: 'verbose',
    format: combine(
      label({ label: '' }),
      timestamp(),
      myFormat
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
}
