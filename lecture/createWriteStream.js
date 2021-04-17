const fs = require('fs');

//const writeStream = fs.createWriteStream('./writeme2.text');
writeStream.on('finish', () =>{
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한번 더 씀');
writeStream.end();