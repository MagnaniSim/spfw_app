var winston = require('winston');
var fs = require( 'fs' );
var logDir = 'logs';

if ( !fs.existsSync( logDir ) ) {
    fs.mkdirSync( logDir );
}

var logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            level: process.env.LOG_LEVEL_FILE,
            filename: './logs/spfw_app.log',
        }),
        new winston.transports.Console({
            level: process.env.LOG_LEVEL_CONSOLE,
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message.slice(0, -1).replace(/\u001b\[[0-9]{1,2}m/g, ''));
    }
};
