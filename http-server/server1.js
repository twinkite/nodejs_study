const http =require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res)=>{
    try{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./server2.html');
        res.end(data);
    }catch(error){
        console.error(error);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    } 
})
    .listen(8080);
server.on('listening', ()=>{ //8080포트에서 서버가 실행되게 함
    console.log('8080번 포트에서 서버 대기 중');
});
server.on('error', (error)=>{
    console.error(error);
});

const server1 = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello 8081server</p>');
    res.end('<p>Hello twinkite</p>');
})
    .listen(8081);
server.on('listening', ()=>{ //8080포트에서 서버가 실행되게 함
    console.log('8081번 포트에서 서버 대기 중');
});
server.on('error', (error)=>{
    console.error(error);
});