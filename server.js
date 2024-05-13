const http = require('http');
const fs = require('fs')

const PORT = 8000;

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/plain'})
    res.end('this purpose server')
    

})

server.listen(PORT,'localhost', ()=>{
    console.log("Server listeniing on port 8000")
})