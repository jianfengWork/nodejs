const crypto = require('crypto');

const obj = crypto.createHash('md5'); // 散列，不可逆
obj.update('123456_?:L$"OPUIOSIFJ(*UPT:LKRFG');

console.log(obj.digest('hex')); // hex = 16进制
