import Dbus from 'dbus'

export default class Notifications {
    busType=process.env.DBUS_TYPE;
    busService=process.env.DBUS_SERVICE_NAME;
    busPath=process.env.DBUS_OBJECT_PATH;
    busInterface=process.env.DBUS_INTERFACE;
    busMethod=process.env.DBUS_NOTIFY_METHOD;
    iface = null;

    constructor(conn){
        let self = this;
        Dbus.getBus(this.busType).getInterface(this.busService, this.busPath, this.busInterface, function(err, res) {
            if (err) {
                return console.log(err);
            }
            self.iface = res;
            return;
        });
        this.notify = this.notify.bind(this);
        if(conn){
            conn.addMessageCallback(this.notify);
        }
    }

    notify(data){
        if(this.iface) this.iface[this.busMethod]("Gotify", 0, "", data.title, data.message ,[],[],0 );
    }
}