const http = require('http');
const url = require('url');

let db = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toUpperCase();



  if (trimmedPath === '' && method === 'GET') {
    res.writeHead(200,{'Content-Type': 'application/json'});
    res.end(JSON.stringify(db));
  } else if (trimmedPath === '' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { title, comedian, year } = JSON.parse(body);
      const newJoke = {
        id: db.length + 1,
        title,
        comedian,
        year
      };
      db.push(newJoke);
      res.writeHead(201,{'Content-Type': 'application/json'});
      res.end(JSON.stringify(db));
    });
  } else if (trimmedPath.match(/joke\/\d+/) && method === 'PATCH') {
    const id = parseInt(trimmedPath.split('/')[1]);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { title, comedian, year } = JSON.parse(body);
      const jokeIndex = db.findIndex(joke => joke.id === id);
      if (jokeIndex !== -1) {
        db[jokeIndex] = { ...db[jokeIndex], title, comedian, year };
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(db[jokeIndex]));
      } else {
        res.writeHead(404,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Joke not found.' }));
      }
    });
  } else if (trimmedPath.match(/joke\/\d+/) && method === 'DELETE') {
    const id = parseInt(trimmedPath.split('/')[1]);
    const jokeIndex = db.findIndex(joke => joke.id === id);
    if (jokeIndex !== -1) {
      const [deletedJoke] = db.splice(jokeIndex, 1);
      res.writeHead(200,{'Content-Type': 'application/json'});
      res.end(JSON.stringify(deletedJoke));
    } else {
      res.writeHead((404,{'Content-Type': 'application/json'}));
      res.end(JSON.stringify({ error: 'Joke not found.' }));
    }
  } else {
    res.writeHead(404,{'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Route not found.' }));
  }
});

const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
