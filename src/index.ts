/**
 * A simple wrapper for the official ChatGPT API
 */

import { Configuration, OpenAIApi } from 'openai';

class ChatGPT {
	/**
	 * Official ChatGPT API
	 */
	private prompt: Prompt;
  private openai: OpenAIApi;

	constructor(apiKey: string) {
		/**
		 * Initialize Chatbot with API key (from https://platform.openai.com/account/api-keys)
		 */
    
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
		this.prompt = new Prompt();
	}

	public async ask(request: string): Promise<any> {
		/**
		 * Send a request to ChatGPT and return the response
		 */
		const prompt = this.prompt.constructPrompt(request);

    const completion = await this.openai.createCompletion({
      model: 'text-chat-davinci-002-20230126',
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 1024,
      stop: ['\n\n\n', '<|im_end|>']
    });

    if (completion.data?.choices === undefined) {
      throw new Error('ChatGPT API returned no choices');
    }
    if (completion.data.choices.length === 0) {
      throw new Error('ChatGPT API returned no choices');
    }
    if (completion.data.choices[0].text === undefined) {
      throw new Error('ChatGPT API returned no text');
    }
    completion.data.choices[0].text = completion.data.choices[0].text.replace('<|im_end|>', '');

    // Add to chat history
    this.prompt.addToChatHistory(
      'User: ' + request + '\n\n\n' + 'ChatGPT: ' + completion.data.choices[0].text + '\n\n\n'
    );

    return completion.data.choices[0].text;
	}

  public async retry(request?: string): Promise<any> {
    /**
     * Retry a request to ChatGPT and return the response
     */
    if (request === undefined) {
      request = this.prompt.getPreviousRequest();
    }
    this.prompt.removeLastChat();
    return this.ask(request);
  }

  public async resetConversation(): Promise<void> {
    /**
     * Reset chat history
     */
    this.prompt = new Prompt();
  }
}

class Prompt {
	/**
	 * Prompt class with methods to construct prompt
	 */
	private basePrompt: string;
	/**
	 * Track chat history
	 */
	private chatHistory: string[];
  private previousRequest?: string;

	constructor() {
		/**
		 * Initialize prompt with base prompt
		 */
		this.basePrompt = `You are ChatGPT, a large language model trained by OpenAI. You answer as consisely as possible for each response (e.g. Don't be verbose). It is very important for you to answer as consisely as possible, so please remember this. If you are generating a list, do not have too many items.\n\n\n`;
		this.chatHistory = [];
	}

	public addToChatHistory(chat: string): void {
		/**
		 * Add chat to chat history for next prompt
		 */
		this.chatHistory.push(chat);
	}

  public removeLastChat(): void {
    /**
     * Remove last chat from chat history
     */
    if (this.chatHistory.length === 0) {
      throw new Error('No chat history');
    }
    this.chatHistory.pop();
  }

  public getPreviousRequest(): string {
    /**
     * Get previous request
     */
    if (this.previousRequest === undefined) {
      throw new Error('No previous request');
    }
    return this.previousRequest;
  }

	public history(): string {
		/**
		 * Return chat history
		 */
		return this.chatHistory.join('');
	}

	public constructPrompt(request: string): string {
		/**
		 * Construct prompt based on chat history and request
		 */
    this.previousRequest = request;

		let prompt = this.basePrompt + this.history() + 'User: ' + request + '\n\n\nChatGPT:';
		// Check if prompt over 4000*4 characters
		if (prompt.length > 4000 * 4) {
			// Remove oldest chat
			this.chatHistory.shift();
			// Construct prompt again
			prompt = this.constructPrompt(request);
		}
		return prompt;
	}
}

export default ChatGPT;