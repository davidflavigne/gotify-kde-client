import WebSocket from 'ws';

export default class SocketConnection {

    token = process.env.GOTIFY_CLIENT_TOKEN;
    url = process.env.GOTIFY_SERVER_URL;
    messageCallbacks = [];
    errorCallbacks = [];

    constructor(){

        let websocketStr = "ws://"+this.url+"/stream?token="+this.token;
        this.ws = new WebSocket(websocketStr);

        this.ws.onopen = this.opening;
        this.ws.onmessage = this.receiving;
        this.ws.onerror = this.error;
        
        this.ws.onmessage = this.ws.onmessage.bind(this);
        this.ws.onerror = this.ws.onerror.bind(this);
    }

    addMessageCallback(callback){
        this.messageCallbacks.push(callback);
    }

    addErrorCallback(callback){
        this.errorCallbacks.push(callback);
    }

    opening(){
        console.log("Connection established");
    }
    
    error(e){
        console.log("WebSocket Error: " , e);
        this.errorCallbacks.forEach(callback=>{
            callback(JSON.parse(e.data));
        });
    }

    receiving(e){
        console.log("Message received", e.data);
        this.messageCallbacks.forEach(callback=>{
            callback(JSON.parse(e.data));
        });
    }
};