const http = require('http');

const PORT = 8000;
let db = [];

const server = http.createServer((req,res)=>{
    if(req.url === "/" && req.method === "GET"){
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(db));
    }

    if(req.url === '/' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end',()=>{
            const {title, comedian,year} = JSON.parse(body)
            const newjoke = {
                title,
                comedian,
                year
            }

            db.push(newjoke);
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(db));
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found')
    }

});

server.listen(PORT,'localhost', ()=>{
    console.log("Server listeniing on port 8000")
})