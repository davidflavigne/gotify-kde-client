= Gotify Client for freedesktops =

Affiche les notifications provenant d'un serveur gotify en utilisant dbus.
- [Gotify](https://gotify.net/)
- [D-bus](https://developer.gnome.org/notification-spec/)

Envoi de notifications depuis la ligne de commande: 
- Créer une application gotify (via l'api rest de gotify ou via l'ui web), puis:
```
curl "http://push.piserver.flavigne/message?token=<gotify_application_token>" -F "title=Gotify" -F "message=Vous avez reçu une notification" -F "priority=5"
```