const path = require('path');

console.log(path.join(__dirname,'..', '/var.js'));   // 절대경로 무시. 절대경로가 있어도 없다고 침
console.log(path.resolve(__dirname, '..', '/var.js'));  // 절대경로가 있으면 진짜 절대경로로 가버림df