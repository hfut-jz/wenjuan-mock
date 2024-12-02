const test = require('./test');
const question = require('./question'); // 如果 question 不需要 Random，可以忽略这行
const user= require('./user');
const stat= require('./stat');
const mockList = [
    ...test,
    ...question,
    ...user,
    ...stat,
];

module.exports = mockList;
