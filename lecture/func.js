const {odd, even} = require('./var')

function checkOddOrEven(number){
    if(number % 2){
        return odd;
    } else {
        return even;
    }
}
module.exports = checkOddOrEven  // 파일에서 단 한번만 써야함

