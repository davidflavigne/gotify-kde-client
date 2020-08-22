import WebSocket from 'ws'
import Dbus from 'dbus'
import Dotenv from 'dotenv'

Dotenv.config();

let server=process.env.GOTIFY_SERVER_URL;
let token=process.env.GOTIFY_CLIENT_TOKEN;
let busType=process.env.DBUS_TYPE;
let busService=process.env.DBUS_SERVICE_NAME;
let busPath=process.env.DBUS_OBJECT_PATH;
let busInterface=process.env.DBUS_INTERFACE;
let busMethod=process.env.DBUS_NOTIFY_METHOD;

let websocketStr = "ws://"+server+"/stream?token="+token;

console.log('#NOCOMMIT - websocket: ', websocketStr);

var ws = new WebSocket(websocketStr);
var bus =  Dbus.getBus(busType);
var iface = false;

bus.getInterface(busService, busPath, busInterface, function(err, res) {
    if (err) {
        return console.log(err);
    }
    iface = res;
    return;
    
});

// Event handler for the WebSocket connection opening
ws.onopen = function(e) {
    console.log("Connection established");
 };

// Event handler for receiving text messages
ws.onmessage = function(e) {
    console.log("Message received", e.data);
    let data=JSON.parse(e.data);
    if(iface) iface[busMethod]("Gotify", 0, "", data.title, data.message ,[],[],0 );
};

// Event handler for errors in the WebSocket object
ws.onerror = function(e) {
    console.log("WebSocket Error: " , e);
    //Custom function for handling errors
    handleErrors(e);
 };
 