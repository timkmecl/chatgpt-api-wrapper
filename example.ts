const ChatGPT = require('./lib/cjs/index.js').default;


// create new instance of ChatGPT
const chatGPT = new ChatGPT(process.env.API_KEY || '');

const example = async () => {
	let response = await chatGPT.ask('Who is James Bond?');
	console.log('\nWho is James Bond?\n>>>', response);
	response = await chatGPT.ask('How many movies were filmed?');
	console.log('\nHow many movies were filmed?\n>>>', response);
	response = await chatGPT.ask('Which actors played him?');
	console.log('\nWhich actors played him?\n>>>', response);
	response = await chatGPT.retry();
	console.log('\n[retry]\n>>>', response);
	
	//response = await chatGPT.retry('Reverse the list');
	//console.log('\n[retry] Reverse the list\n>>>', response);
	//chatGPT.resetConversation();
	//response = await chatGPT.ask('Who wrote the books?');
	//console.log('\nWho wrote the books?\n>>>', response);
};

example();
