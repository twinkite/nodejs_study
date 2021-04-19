const fs = require('fs').promises;
const constants = require('fs').constants;

//F_OK 파일 존재 여부 , R_OK 읽기 권한 여부, W_OK 쓰기 권한 여부
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK) //폴더가 있는지 없는지 판단
.then(()=> {
    return Promise.reject('이미 폴더 있음');
})
.catch((err)=>{
    if(err.code = 'ENOENT'){
        console.log('폴더 없음');
        return fs.mkdir('./folder');    // 폴더를 만드는 메서드. 이미 폴더가 있다면 에러가 발생하므로 access메서드를 호출해서 확인해야 함 
    }
    return Promise.reject(err);
})
.then(()=>{
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js','w'); // 파일의 아이디 (fd변수)를 가져오는 메서드. 파일이 없다면 생성한 뒤 아이디를 가져옴.
})
.then((fd)=>{
    console.log('빈 파일 만들기 성공', fd);
    fs.rename('./folder/file.js', './folder/newfile.js');   // fs.rename(기존경로, 새 경로, 콜백) 파일의 이름을 바꾸는 메서드
})
.then(()=>{
    console.log('이름 바꾸기 성공');
})
.catch((err)=>{
    console.log(err);
})