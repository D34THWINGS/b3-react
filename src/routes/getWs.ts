import {Application} from "express-ws";
import {WebSocket} from "ws";
import {findUserById} from "../repositories/userRepository";

export function getWs(app: Application, sockets: Map<string, WebSocket>) {
  app.ws('/ws', async (ws, req) => {
    const user = await findUserById(req.signedCookies.ssid);
    if (!user) {
      ws.close();
      return
    }
    sockets.set(user.id, ws);
    ws.on('message', (msg) => {
      console.log(msg);
      sockets.forEach((socket) => {
        socket.send(JSON.stringify({
          type: 'reply',
          data: {msg, user}
        }));
      })
    })
    ws.on('close', () => {
      sockets.delete(user.id);
    })
  });
}
