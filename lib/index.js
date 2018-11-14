/**
 * 请注意，这里实现的做法不能用在实际项目中，因为题目本身是有漏洞的，照着题目的需求实现，跑不了多久就会出问题。
 * 而且实际上对于玩家昵称这个需求，一般的游戏基本上不会使用题目中的机制，这个机制复杂，开销大，而且没多大必要。
 * 
 */


'use strict';

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // 为了避免玩家和客服敲错字母的问题，这里回避掉和1相似的I以及和0相似的O
const randomRange = alphabet.length * alphabet.length * 10000; // 两位英文字母和4位数字的范围
const usedSet = new Set(); // 保存已经分配出去的玩家昵称对应的随机数，并用来检测重复。注意，这只是针对这个题目的一个事例而已，在实际项目中这么写内存很容易爆掉。这也是这个题目扯淡的地方之一，如果按照实际项目的做法，这个题目的设计本身就是不合格的。

/**
 * 生成一个随机且不重复的玩家昵称
 * 
 * @return 返回玩家昵称，如果返回null，则代表昵称已经用光了
 */
function generateNickname() {
  if (usedSet.size >= randomRange)
    return null;

  let randomValue = Math.floor(Math.random() * randomRange);
  const originalRandomValue = randomValue;
  
  // 检测重复，如果有重复就向后偏移，直到找到一个没分配过的为止
  while (usedSet.has(randomValue)) {
    randomValue = ++randomValue % randomRange;
    if (randomValue === originalRandomValue) // 找了一圈了也没找到
      return null;
  }
  
  usedSet.add(randomValue);
  
  const prefix = Math.floor(randomValue / 10000);
  const suffix = Math.floor(randomValue % 10000);
  
  return alphabet[Math.floor(prefix / alphabet.length)]
    + alphabet[Math.floor(prefix % alphabet.length)]
    + (suffix < 10 ? '000' : suffix < 100 ? '00' : suffix < 1000 ? '0' : '') + suffix;
}

exports.randomRange = randomRange;
exports.generateNickname = generateNickname;

//for (let i = 0; i < 1000; i++)
//  console.log(generateNickName());