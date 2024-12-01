const Mock=require('mockjs')
const {time} = require("mockjs/src/mock/random/date");
const {title} = require("mockjs/src/mock/random/text");
const Random=Mock.Random
function getQuestionList(opt={}){
    const {len=10,isDeleted=false}=opt
    const list=[]
    for(let i=0;i<len;i++){
        list.push({
            _id:Random.id(),
            title:Random.cparagraph(3),
            isPublished:Random.boolean(),
            isStar:Random.boolean(),
            answerCount:Random.integer(0,100),
            createAt:Random.time('yyyy-MM-dd'),
            isDeleted,
        })
    }
    return list
}
module.exports=getQuestionList