const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>   //문자열로 오는 응답을 객체 형식으로 바꿔줌
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k,v]) =>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res) =>{
    const cookies = parseCookies(req.headers.cookie);   // {mycookie: 'test}
    // 주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);   //쿼리스트링에서
        const { name } = qs.parse(query);       //name을 추출
        const expires = new Date();
        // 쿠키 유효시간을 현재시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes()+5);
        res.writeHead(302,{ //redirect
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,    //encodeURIComponent 이용해서 한글은 바꿔줘야함, 
        });  //Expires : 쿠키 만료시간. 안넣으면 session 쿠키 됨(브라우저 닫으면 사라짐), HttpOnly : 쿠키에 JS로 접근하지 못하도록. 로그인 관련 쿠키에는 필수 옵션!, Path=/ : /아래 주소에서는 쿠키가 다 유효하다!
        res.end();
        //name이라는 쿠키가 있는 경우
    } else if(cookies.name){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else{
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        } catch(err){
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
.listen(8084, () =>{
    console.log('8084번 포트에서 서버 대기 중입니다.');
});