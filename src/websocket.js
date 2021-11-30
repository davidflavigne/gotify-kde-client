import WebSocket from 'ws';

export default class SocketConnection {

    token = process.env.GOTIFY_CLIENT_TOKEN;
    url = process.env.GOTIFY_SERVER_URL;
    messageCallbacks = [];
    errorCallbacks = [];
    log = null;

    constructor(log){
        let websocketStr = "ws://"+this.url+"/stream?token="+this.token;
        this.log=log;
        this.ws = new WebSocket(websocketStr);

        this.ws.onopen = this.opening;
        this.ws.onmessage = this.receiving;
        this.ws.onerror = this.error;
        
        this.ws.onopen = this.ws.onopen.bind(this);
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
        this.log.info("Connection established");
    }
    
    error(e){
        this.log.error("WebSocket Error: " , e);
        this.errorCallbacks.forEach(callback=>{
            callback(JSON.parse(e.data));
        });
    }

    receiving(e){
        console.log('#NOCOMMIT - message received!!', e.data);
        this.log.debug("Message received", e.data);
        this.messageCallbacks.forEach(callback=>{
            callback(JSON.parse(e.data));
        });
    }
};