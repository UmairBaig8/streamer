import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatboxComponent } from './chatbox/chatbox.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatboxComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent {
  title = 'chatbot';
}
