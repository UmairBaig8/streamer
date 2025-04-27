import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-typing-effect',
  standalone: true,
  imports: [],
  templateUrl: './typing-effect.component.html',
  styleUrls: ['./typing-effect.component.scss']
})
export class TypingEffectComponent implements OnInit, OnDestroy {
  public typedText: string = '';  // Text currently being typed
  private eventSource: EventSource | undefined; // EventSource instance
  private fullText: string[] = [];  // Queue of accumulated text responses
  private isTyping: boolean = false;  // Flag to check if typing is ongoing

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.startEventSource();
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  private startEventSource(): void {
    // Replace this URL with the URL of your EventSource endpoint
    const sourceUrl = 'http://localhost:8000/chat?message=Hello';

    this.eventSource = new EventSource(sourceUrl);

    this.eventSource.onmessage = (event: MessageEvent) => {
      const message = event.data; // EventSource message data

      // Append the new message to the queue
      this.fullText.push(message);
      
      // Start typing the next message if it's not already typing
      if (!this.isTyping) {
        this.startTypingNextMessage();
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      this.eventSource?.close();
    };
  }

  private startTypingNextMessage(): void {
    if (this.fullText.length === 0) {
      return;  // No messages to type
    }

    const messageToType = this.fullText.shift();  // Get the next message
    if (!messageToType) return;

    this.isTyping = true;  // Set the flag to indicate typing is ongoing
    //this.typedText = '';  // Reset the typed text

    let index = 0;
    const typingSpeed = 100;  // Speed of typing effect (in milliseconds)

    const intervalId = setInterval(() => {
      this.typedText += messageToType.charAt(index); // Add one character at a time
      this.cdr.detectChanges();  // Trigger UI updates
      index++;

      if (index === messageToType.length) {
        clearInterval(intervalId);  // Stop when the whole message is typed
        this.isTyping = false;  // Typing is complete
        this.startTypingNextMessage();  // Start typing the next message
      }
    }, typingSpeed);
  }
}
