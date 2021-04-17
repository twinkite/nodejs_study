const buffer = Buffer.from('버퍼로 바꿔보세요');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어썼다')];
console.log(Buffer.concat(array).toString());

console.log(Buffer.alloc(5));