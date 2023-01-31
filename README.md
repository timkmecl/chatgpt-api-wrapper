# ChatGPT API Conversation Wrapper
A simple Node.js wrapper for connecting to ChatGPT using official OpenAI API, which allows you to easily send requests and get responses from the API in a conversational manner.

You only need to provide your OpenAI API key (no session tokens or using pupeteer for browser automation) - get it [here](https://platform.openai.com/account/api-keys).

Based on [this method](https://twitter.com/GodlyIgnorance/status/1620270384150093825) and [this Python API](https://github.com/acheong08/ChatGPT) by [acheong08](https://github.com/acheong08).

## Installation
```bash
npm install chatgpt-api-wrapper
```

## Usage
```js
import { ChatGPT } from 'chatgpt-api-wrapper';

const apiKey = '<YOUR_API_KEY>';
const chatGPT = new ChatGPT(apiKey);

const response = await chatGPT.ask('Hello, how are you?');
console.log(response);
```

Also see the [example.ts](example.ts) file.

## Methods

### `ask(request: string): Promise<any>`
Sends a request to the ChatGPT API and returns the response.

### `retry(request?: string): Promise<any>`
Retries a request to the ChatGPT API and returns the response. If the request argument is not provided, it retries the previous request, otherwise it sends a new request in place of the previous one.

### `resetConversation(): Promise<void>`
Resets the chat history.