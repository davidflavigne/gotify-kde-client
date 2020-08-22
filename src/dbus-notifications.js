import Dbus from 'dbus';
import Path from 'path';
import Fs from 'fs';

export default class Notifications {
    busType=process.env.DBUS_NOTIFICATION_TYPE;
    busService=process.env.DBUS_NOTIFICATION_SERVICE_NAME;
    busPath=process.env.DBUS_NOTIFICATION_OBJECT_PATH;
    busInterface=process.env.DBUS_NOTIFICATION_INTERFACE;
    busMethod=process.env.DBUS_NOTIFICATION_NOTIFY_METHOD;
    iface = null;
    iconPath=Path.resolve()+'/resources/icons';
    defaultIconName=Path.resolve()+'/resources/icons/notif_64x64.png';

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
        let iconName = this.iconPath+"/"+data.title.toLowerCase()+"_64x64.png";
        let self=this;
        Fs.exists(iconName,exists=>{
            let icon=self.defaultIconName;
            if(exists) icon=iconName;
            
            if(self.iface) self.iface[self.busMethod]("Gotify", 0, icon, data.title, data.message ,[],[],0 );
        })
    }
}