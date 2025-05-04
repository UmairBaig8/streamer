import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;

  constructor() {}

  connect(): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({
        url: `ws://localhost:8000/ws/chat`,
        deserializer: e => e.data,
        serializer: value => JSON.stringify(value)
      });
    }
    return this.socket$;
  }

  send(message: string) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  disconnect() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
