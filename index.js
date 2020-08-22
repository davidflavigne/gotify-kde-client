import WebSocket from 'ws'
import Dbus from 'dbus'

var ws = new WebSocket("ws://192.168.1.94:3023/stream?token=Cq28pQfDLb._w64");
var bus =  Dbus.getBus('session');
var iface = false;

bus.getInterface('org.freedesktop.Notifications', '/org/freedesktop/Notifications', 'org.freedesktop.Notifications', function(err, res) {
    if (err) {
        return console.log(err);
    }

    iface = res;
    
    console.log('found interface');

    var params = { 
            app_name: "gotify client", 
            replaces_id:0, 
            app_icon:"", 
            summary: "test notification", 
            body: "biggest" ,
            actions: [],
            hints: [{category:"email"}],
            timeout: 0 
        };

    return;// iface.Notify("gotify client", 0, "", "test notification", "biggest" ,[],[],0 );
    
});

// Event handler for the WebSocket connection opening
ws.onopen = function(e) {
    console.log("Connection established");
 };

// Event handler for receiving text messages
ws.onmessage = function(e) {
    console.log("Message received", e.data);
    let data=JSON.parse(e.data);
    console.log("will send notification with { Gotify, 0, '', ",data.title,", ",data.message,", [], [],0}");
    if(iface) iface.Notify("Gotify", 0, "", data.title, data.message ,[],[],0 );
};

// Event handler for errors in the WebSocket object
ws.onerror = function(e) {
    console.log("WebSocket Error: " , e);
    //Custom function for handling errors
    handleErrors(e);
 };
 