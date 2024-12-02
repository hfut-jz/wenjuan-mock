const Mock = require('mockjs');
const getQuestionList = require('./data/getQuestionList');
const getComponentList=require('./data/getComponentList')

const Random = Mock.Random;
module.exports = [
    {
        url: '/api/question/:id',
        method: 'get',
        response() {
            //由于此时的信息还没有得到完全定义，想要进行编辑就必须传递正确信息。
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                    desc:'问卷描述',
                    js:'',
                    css:'',
                    isPublish:true,
                    //需要：组件列表
                    componentList: getComponentList()

                },
            };
        },
    },
    {
        url: '/api/question',
        method: 'patch',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                },
            };
        },
    },
    {
        // 获取
        url: '/api/question',
        method: 'get',
        response(ctx = {}) { // 为 ctx 设置默认值 {}
            const { url = '' } = ctx;
            const isDeleted = url.indexOf('isDeleted=true') > -1;
            const isStar = url.indexOf('isStar=true') > -1;
            return {
                errno: 0,
                data: {
                    list: getQuestionList({ isDeleted, isStar }),
                    total: 100,
                },
            };
        },
    },
        // 更新
        {
            url: '/api/question/:id',
            method: 'patch',
            response(ctx) {
                console.log(ctx)
                if (!ctx || !ctx.params || !ctx.params.id) {
                    return {
                        errno: 1,
                        data: { message: '路径参数错误或未提供' },
                    };
                }
                return {
                    errno: 0,
                    data: { message: '更新成功', id: ctx.params.id },
                };
            },
        },
        //复制问卷
    {
        url:'/api/question/duplicate/:id',
        method: 'post',
        response() {
            return{
                errno:0,
                data:{
                    id:Random.id()
                }
            }
        }
    },
    {
        //彻底删除
        url:'/api/question',
        method:'delete' ,
        response() {
            return{
                errno:0,

            }
        }

    }


    ];
