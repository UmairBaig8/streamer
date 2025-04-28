import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, ViewChild, ElementRef, NgZone, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements AfterViewChecked {
  @ViewChild('chatBox') private chatBox!: ElementRef;

  userInput: string = '';
  conversation: { sender: string, text: string }[] = [];
  currentBotResponse: string = ''; // Temporary variable to accumulate chunks
  isBotTyping: boolean = false; // Control the typing indicator
  eventSource!: EventSource;

  public typedText: string = '';  // Text currently being typed
  private fullText: string[] = [];  // Queue of accumulated text responses
  isTyping: boolean = false;  // Flag to check if typing is ongoing

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  sendMessage(): void {
    console.log('Sending message:', this.userInput);
    if (this.userInput.trim().length > 0) {
      // Add user message to conversation
      this.conversation.push({ sender: 'user', text: this.userInput });
      // Show typing indicator while the bot is processing
      this.isBotTyping = true;
      // Get bot response (simulate for now or call an API)
      this.fetchBotResponse(this.userInput);

      // Clear the input field after sending the message
      this.userInput = '';
    }
  }

  fetchBotResponse(message: string): void {
    console.log('Fetching bot response for message:', message);
    // Close any existing EventSource connection
    if (this.eventSource && this.eventSource.readyState === EventSource.OPEN) {
      this.eventSource.close();
      console.log('Closed existing EventSource connection');
    }
  
    // Open a new EventSource connection to stream the bot's response
    const chatUrl = `/chat?message=${encodeURIComponent(message)}`;
    this.eventSource = new EventSource(chatUrl);
    this.currentBotResponse = ""; // Reset the current bot response before starting to receive new chunks
    this.eventSource.onopen = () => {
      console.log('EventSource connection opened');
      // Optionally, you can add a message to the conversation indicating that the bot is typing
      // this.conversation.push({ sender: 'bot', text: '...' });
      this.cdr.detectChanges();  // Trigger UI updates
    };
  
    this.eventSource.onmessage = (event) => {
      console.log('Received chunk from server:', event.data);

      const message = event.data; // EventSource message data

      // Append the new message to the queue
      this.fullText.push(message);
      
      // Start typing the next message if it's not already typing
      if (!this.isTyping) {
        this.startTypingNextMessage();
      }

      // Accumulate the streamed data in currentBotResponse
      // this.currentBotResponse += event.data;



      // // Use Angular's zone to update the UI immediately with each chunk
      // this.ngZone.run(() => {
      //   // Remove the previous '...' message
      //   this.conversation.pop(); 
      //   // Add the chunk as the bot's response with typewriter effect class
      //   this.conversation.push({ sender: 'bot', text: this.currentBotResponse });

      //   // Optionally, you can add a delay here if you want to simulate the typing effect per chunk
      //   // setTimeout(() => {
      //   //   this.conversation.push({ sender: 'bot', text: this.currentBotResponse });
      //   // }, 100); // Adjust the delay time as needed
      // });
    };
  
    this.eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      // Optionally, you can close the EventSource connection on error
      this.eventSource.close();  // Close the connection on error
      this.isBotTyping = false;
      // this.conversation.push({ sender: 'bot', text: this.fullText.join('') }); // Add the final response to the conversation
      // this.cdr.detectChanges();  // Trigger UI updates  
    };
  }

  private startTypingNextMessage(): void {
    if (this.fullText.length === 0) {
      return;  // No messages to type
    }

    const messageToType = this.fullText.shift();  // Get the next message
    if (!messageToType) return;

    this.isTyping = true;  // Set the flag to indicate typing is ongoing
    // this.typedText = '';  // Reset the typed text

    let index = 0;
    const typingSpeed = 10;  // Speed of typing effect (in milliseconds)

    const intervalId = setInterval(() => {
      this.typedText += messageToType.charAt(index); // Add one character at a time
      this.cdr.detectChanges();  // Trigger UI updates
      this.scrollToBottom();
      index++;

      if (index === messageToType.length) {
        clearInterval(intervalId);  // Stop when the whole message is typed
        this.isTyping = false;  // Typing is complete
        this.startTypingNextMessage();  // Start typing the next message
      }

      if (messageToType.match(/^-END$/)) {
        this.isTyping = false;  // Typing is complete
        this.conversation.push({ sender: 'bot', text: this.typedText }); // Add the final response to the conversation
        this.typedText = '';  // Reset the typed text
        this.cdr.detectChanges();  // Trigger UI updates  
        clearInterval(intervalId);
      }

    }, typingSpeed);
  }

  // Auto-scroll to the bottom after each update
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) { }
  }
  
}
