import Dotenv from 'dotenv'
import NodeLogger from 'simple-node-logger'
import Socket from './src/websocket.js'
import Notif from './src/dbus-notifications.js'

Dotenv.config();

const opts = {
	errorEventName:'error',
    logDirectory:process.env.LOG_FILE_PATH, // NOTE: folder must exist and be writable...
    fileNamePattern:'gotify-kde-client-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
const log = NodeLogger.createRollingFileLogger( opts );

log.setLevel('debug');

let conn = new Socket(log);
new Notif(conn,log);
