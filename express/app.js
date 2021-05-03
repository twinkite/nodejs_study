const dotenv = require('dotenv');   // 키값을 가져와야 하기 때문에 미리 가져와줘야 한다.
const express = require('express');
const path = require('path');
const morgan =require('morgan');    // 요청과 응답을 기록
const session = require('express-session');
const multer = require('multer');
const cookieParser = require('cookie-parser');

dotenv.config();
const indexRouter = require('./reoutes');
const userRouter = require('./routers/user');

const app = express();

app.set('port', process.env.PORT || 3000);      // port라는 속성을 3000

app.use(morgan('dev')); // dev대신 combined를 쓰면 더 자세해짐. IP, router.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
    }
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use('/', express.static(path.join(__dirname, 'public')));   // 얘는 본인 역할하고 나면 next()가 실행 안되서 끝남. 미들웨어 순서 배치에 신경써야한다. 성능적인 문제가 있음. 
//app.use('요청 경로', express.static(path.join(실제경로)));
app.use(express.json());    // client가 json을 보냈을 때 req.body로 넣어준다.
app.use(express.urlencoded({ extended:true })); // form submit시. (이미지나 파일인 경우 얘로는 처리 못함.) true면 qs, false면 querystring
app.use(session());
app.use(multer().array());

app.use((req,res, next)=>{    // 모든 요청에 대해 다 실행됨 근데 모든 라우터에 대해 실행되고 next를 넣어줘야 다음 미들웨어로 넘어간다. 
    next();
}, (req, res, next) =>{
    next();
}, (req, res, next) =>{
    next();
})  // 이런식으로 미들웨어 여러개를 사용할 수 도 있다.

app.get('/', (req, res) => {    // 한 라우터에서 여러번 send(send, sendjson, sendFile) 할 수 없다. 
    req.body;
    req.cookies();
    req.signedCookies;  // 암호화된 쿠키.(서명)
    res.cookie('name', encodeURIComponent(name),{
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly: true,
        path: '/',
    })
    res.sendFile(path.join(__dirname, 'index.html'));
    //res.json({hello : hi});
    // res.writeHead({});
    // 응답을 보낸 후에는 write할 수 X
});

app.get('/category/js', (req, res) => {
    res.send(`hello js`);
});

app.get('/category/:name', (req, res) => {  //코드가 위에서부터 아래로 조건을 확인함. -> 와일드카드와 같이 범위가 넓은 라우터는 밑에다 넣어야함
    res.send(`hello ${req.params.name}`);
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next)=>{
    res.send('404지롱');
})

app.use((err, req, res, next)=>{    // error middleware는 파라미터 4가지를 다 기재해줘야한다.
    console.error(err);
    res.send('에러 났지만 안알랴줌');
})

app.listen(app.get('port'), () =>{
    console.log('익스프레스 서버 실행');
});