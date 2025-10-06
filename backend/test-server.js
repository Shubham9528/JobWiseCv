// Quick test to verify server is running
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/process',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log('Response:', chunk.toString());
  });
});

req.on('error', (error) => {
  console.error('Server not reachable:', error.message);
  console.log('Make sure to run: cd backend && npm start');
});

req.write(JSON.stringify({ data: 'Test job description for software engineer position' }));
req.end();
