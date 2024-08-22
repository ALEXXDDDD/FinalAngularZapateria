import { Component, AfterViewInit } from '@angular/core';

interface ApiResponse {
  outputs: {
    'out-0': string;
  };
  run_id: string;
  metadata: null | object;
}

@Component({
  selector: 'app-chat-pages',
  templateUrl: './chat-pages.component.html',
  styleUrls: ['./chat-pages.component.css']
})
export class ChatPagesComponent implements AfterViewInit {

  async query(userMessage: string): Promise<ApiResponse> {
    const response = await fetch(
      "https://api.stack-ai.com/inference/v0/run/ea140acc-1655-40f4-9f45-bf48bf9a23f3/669451e996950d6dd7113ca6",
      {
        headers: {
          'Authorization': 'Bearer 0f44e4f2-3704-4710-a496-defd0fbe66fd',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "user_id": "12345", "in-0": userMessage }),
      }
    );
    const result: ApiResponse = await response.json();
    return result;
  }

  ngAfterViewInit() {
    document.getElementById('chat-icon')?.addEventListener('click', this.toggleChatContainer.bind(this));
    document.getElementById('close-btn')?.addEventListener('click', this.toggleChatContainer.bind(this));
    document.getElementById('send-btn')?.addEventListener('click', this.sendMessage.bind(this));
  }

  toggleChatContainer() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.classList.toggle('hidden');
    }
  }

  async sendMessage() {
    const userInput = (document.getElementById('user-input') as HTMLInputElement).value;
    if (userInput.trim() !== '') {
      const chatBox = document.getElementById('chat-box') as HTMLElement;

      // Añadir mensaje del usuario en una burbuja de chat
      const userMessageDiv = document.createElement('div');
      userMessageDiv.className = 'user-message';
      userMessageDiv.textContent = userInput;
      chatBox.appendChild(userMessageDiv);

      // Limpiar el input
      (document.getElementById('user-input') as HTMLInputElement).value = '';

      // Realizar la consulta a la API
      const response = await this.query(userInput);
      const botMessage = response.outputs['out-0'] || 'No se pudo obtener una respuesta.';

      // Añadir mensaje del bot en una burbuja de chat
      const botMessageDiv = document.createElement('div');
      botMessageDiv.className = 'bot-message';
      botMessageDiv.textContent = botMessage;
      chatBox.appendChild(botMessageDiv);

      // Desplazarse al final del chat
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
}
