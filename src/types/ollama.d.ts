declare module 'ollama' {
  export interface OllamaOptions {
    baseUrl?: string;
    model?: string;
  }

  export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
  }

  export interface ChatResponse {
    message: ChatMessage;
  }

  export class Ollama {
    constructor(options?: OllamaOptions);
    chat(options: {
      messages: ChatMessage[];
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }): Promise<ChatResponse>;
  }
} 