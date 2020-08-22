import Dotenv from 'dotenv'
import Socket from './src/websocket.js'
import Notif from './src/dbus-notifications.js'

Dotenv.config();

let conn = new Socket();
new Notif(conn);
