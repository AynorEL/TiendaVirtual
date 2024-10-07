const http = require('https');

const options = {
	method: 'POST',
	hostname: 'chatgpt-42.p.rapidapi.com',
	port: null,
	path: '/conversationgpt4-2',
	headers: {
		'x-rapidapi-key': '275bb0ab11mshb5eaccd8a9a3c55p1be77cjsn08ffbd2af299',
		'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(JSON.stringify({
  messages: [
    {
      role: 'user',
      content: 'hello'
    }
  ],
  system_prompt: '',
  temperature: 0.9,
  top_k: 5,
  top_p: 0.9,
  max_tokens: 256,
  web_access: false
}));
req.end(); 