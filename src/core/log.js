/**
 * Logs a message to the console with a timestamp and a color-coded log level.
 * Levels:
 * - 0: LOG
 * - 1: WARN
 * - 2: ERROR
 * - 3: DEBUG
 * @param {string} message - The message to log.
 * @param {number} level - The log level.
 * @returns {string} The output message.
 */
function log(message, level = 0) {
  const levels = {
    0: { label: '\x1b[32m[LOG]\x1b[0m', method: 'log' },
    1: { label: '\x1b[33m[WARN]\x1b[0m', method: 'warn' },
    2: { label: '\x1b[31m[ERROR]\x1b[0m', method: 'error' },
    3: { label: '\x1b[36m[DEBUG]\x1b[0m', method: 'log' },
  };

  const now = new Date();

  const timestamp = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    hour12: false,
  }).format(now);

  const levelObj = levels[level] || levels[0];
  const output = `[${timestamp}] ${levelObj.label} ExposedEndpointBot: ${message}`;

  console[levelObj.method](output);

  return output;
}

module.exports = log;
