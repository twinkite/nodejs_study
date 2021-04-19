const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for(let i = 0; i <= 10_000_000; i++){
    file.write('안녕하세요, 엄청나게 큰 파일을 만들어 볼겁니다. 무서웡!\n');
}
file.end();