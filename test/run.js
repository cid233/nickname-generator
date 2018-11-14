'use strict';

const generator = require('../lib/index');

const formatReg = /^[ABCDEFGHJKLMNPQRSTUVWXYZ]{2}[0-9]{4}$/;

//检测生成的nickname的格式
let nickname = generator.generateNickname();
if (!formatReg.test(nickname))
  console.error('format error!');

// 测试多次生成nickname会不会重复，以及测试执行效率
const nicknameSet = new Set();
const startTime = process.hrtime();

for (var i = 0; i < 1000000; i++) {
  nickname = generator.generateNickname();
  if (nicknameSet.has(nickname)) { // 重复了就退出循环并输出错误log
    console.error('nickname is duplicate!');
    break;
  }
  
  nicknameSet.add(nickname);
}

const diff = process.hrtime(startTime);
console.log(`cost time: ${diff[0] * 1000 + diff[1] / 1e6} ms`);
