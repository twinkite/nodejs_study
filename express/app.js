const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);      // port라는 속성을 3000

app.use((req,res, next)=>{    // 모든 요청에 대해 다 실행됨 근데 모든 라우터에 대해 실행되고 next를 넣어줘야 다음 미들웨어로 넘어간다. 
    next();
}, (req, res, next) =>{
    next();
}, (req, res, next) =>{
    next();
})  // 이런식으로 미들웨어 여러개를 사용할 수 도 있다.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/category/js', (req, res) => {
    console.log(`hello js`);
});

app.get('/category/:name', (req, res) => {  //코드가 위에서부터 아래로 조건을 확인함. -> 와일드카드와 같이 범위가 넓은 라우터는 밑에다 넣어야함
    console.log(`hello ${req.params.name}`);
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () =>{
    console.log('익스프레스 서버 실행');
});