# ChatGPT API Conversation Wrapper

[![NPM](https://img.shields.io/npm/v/chatgpt-api-wrapper.svg)](https://www.npmjs.com/package/chatgpt-api-wrapper)
[![Downloads](https://img.shields.io/npm/dt/chatgpt-api-wrapper.svg)](https://www.npmjs.com/package/chatgpt-api-wrapper)


A simple Node.js wrapper for connecting to ChatGPT using official OpenAI API, which allows you to easily send requests and get responses from the API in a conversational manner.

You only need to provide your OpenAI API key (no session tokens or using pupeteer for browser automation) - get it [here](https://platform.openai.com/account/api-keys).

#### 💥 **Deprecated.** *Does not work anymore.* 💥

Based on [this method](https://twitter.com/GodlyIgnorance/status/1620270384150093825) and [this Python API](https://github.com/acheong08/ChatGPT) by [acheong08](https://github.com/acheong08). Also check out [this project](https://github.com/transitive-bullshit/chatgpt-api) for a more advanced API.

## Installation

You can install the package using npm:

```bash
npm install chatgpt-api-wrapper
```

Alternatively, you can use the [`src/index.ts`](src/index.ts) file from this repository directly.

## Usage
```js
import ChatGPT from 'chatgpt-api-wrapper';

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