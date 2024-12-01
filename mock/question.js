const Mock = require('mockjs');
const getQuestionList = require('./data/getQuestionList');

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
                    componentList: [
                        //1.标题
                        {   //对其进行类型区分，相当于一个props
                            fe_id: Random.id(),
                            type:'questionTitle',//这里的类型是前后端统一订好的
                            title: '标题',

                            isHidden:false,
                            isLocked:false,
                            //这里的props与自己规定的type必须一致，规定了之后，那么就将其存储到store中去
                            props:{
                                text:'个人信息调研',
                                level: 1,
                                isCenter: false,
                            }
                        },
                        //2.Input
                        {
                            fe_id: Random.id(),
                            type:'questionInput',
                            title: '输入框',
                            isHidden: false,
                            isLocked: false,
                            props:{
                                placeholder:'请输入内容',
                                title:'你的姓名'
                            }
                        },
                        //Paragraph
                        {
                            fe_id: Random.id(),
                            type:'questionParagraph',
                            title: '段落',
                            isHidden: false,
                            isLocked: false,
                            props:{
                                content:'请输入内容',
                            }
                        },
                        //Info
                        {
                            fe_id: Random.id(),
                            type:'questionInfo',
                            title: '问卷信息',
                            isHidden: false,
                            isLocked: false,
                            props:{
                                title:'问卷信息',
                                desc:'问卷描述',
                            },
                        },
                        //Radio
                        {
                            fe_id: Random.id(),
                            type:'questionRadio',
                            title: '单选',
                            isHidden: false,
                            isLocked: false,
                            props:{
                                title:'你的性别',
                                isVertical:false,
                                options:[
                                    {
                                        value:'1',
                                        text:'男'
                                    },
                                    {
                                        value:'2',
                                        text:'女'
                                    },
                                ]
                            }
                        },
                    ]
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
