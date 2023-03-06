const router = require('koa-router')()
const mysql = require('mysql')
const svgCaptcha = require('svg-captcha')
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const databases = require('../databases')
// import { dyPool, vuePool, reactPool } from '../mySqlConfig'


router.get('/public/getSlider', async (ctx, next) => {
  ctx.body = {
    'code': 0,
    'data': [
      {'_id': 0, 'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/reactnative.png'},
      {'_id': 1,'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png'},
      {'_id': 2,'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/wechat.png'}    ]
  }
})

router.post('/vue/admin/user/register', async (ctx, next) => {
    let params = ctx.request.body
    let secret = 'dy'
    let token = jwt.sign(params, secret)
    if(params.username === '123'){
        ctx.body = {
            'code': 1,
            'data': '用户已存在'
        }
    }else{
        ctx.body = {
            status: 200,
            data: {
                code: 0,
                message: 'success!',
                token: token
            }
        }
    }
    
})

router.post('/vue/admin/user/login', async (ctx, next) => {
    let params = ctx.request.body
    let secret = 'dy'
    let token = jwt.sign(params, secret)
    if(params.username === '123'){
        ctx.body = {
            'code': 1,
            'data': '用户已存在'
        }
    }else{
        ctx.body = {
            status: 200,
            data: {
                code: 0,
                message: 'success!',
                token: token
            }
        }
    }
    
})

router.get('/public/getCaptcha', async (ctx, next) => {
    const cap = svgCaptcha.create({
      size: 4, // 验证码长度
      width:160,
      height:60,
      fontSize: 50,
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#eee' // 验证码图片背景颜色
    })
    
    let img = cap.data // 验证码
    let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
    ctx.type = 'html'
    // ctx.body = `${img}<br><a href="javascript: window.location.reload();">${text}</a>`
    ctx.body = {
        'code': 0,
        'data': img
    }
});

router.post('vue/admin/user/login', async (ctx, next) => {
    let params = ctx.request.body
    let secret = 'dy'
    let token = jwt.sign(params, secret)
    let createTime = new Date();
    if(params.username === '123'){
        ctx.body = {
            'code': 1,
            'data': '用户已存在'
        }
    }else{
        ctx.body = {
            'code': 0,
            'data': {
                authList: [
                    {
                        id: 1,
                        name: '用户管理',
                        pid: -1,
                        role:'123',
                        _v: 0,
                        _id: 456
                    },
                    {
                        id: 2,
                        auth: 'userAuth',
                        name: '用户管理1',
                        path: '/manager/userAuth',
                        pid: -1,
                        role:'123',
                        _v: 0,
                        _id: 456
                    },
                    {
                        id: 3,
                        auth: 'privateMessage',
                        path: '/manager/userStatistics',
                        name: '用户管理3',
                        pid: 1,
                        role:'123',
                        _v: 0,
                        _id: 456
                    },
                    {
                        id: 1,
                        auth: 'myCollection',
                        name: '用户管理4',
                        pid: 21,
                        role:'123',
                        _v: 0,
                        _id: 456
                    }
                ],
                avatar: '',
                created: createTime,
                gender: -1,
                username: '林锋',
                role: '12345678',
                status: 0,
                token: token,
                updated: createTime
            }
        }
    }
    
})

router.get('vue/admin/user/validate', async (ctx, next) => {
    let params = ctx.request.body
    let secret = 'dy'

    let token = jwt.sign(params, secret)
    let createTime = new Date();
    ctx.body = {
        'code': 0,
        'data': {
            authList: [
                {
                    id: 1,
                    name: '用户管理',
                    pid: -1,
                    role:'123',
                    _v: 0,
                    _id: '4561'
                },
                {
                    id: 2,
                    auth: 'userAuth',
                    name: '用户管理1',
                    path: '/manager/userAuth',
                    pid: -1,
                    role:'123',
                    _v: 0,
                    _id: '4562'
                },
                {
                    id: 3,
                    auth: 'privateMessage',
                    path: '/manager/userStatistics',
                    name: '用户管理3',
                    pid: 1,
                    role:'123',
                    _v: 0,
                    _id: '4563'
                },
                {
                    id: 4,
                    auth: 'myCollection',
                    name: '用户管理4',
                    pid: 1,
                    role:'123',
                    _v: 0,
                    _id: '4564'
                }
            ],
            avatar: '',
            created: createTime,
            gender: -1,
            username: '林锋',
            role: '12345678',
            status: 0,
            token: token,
            updated: createTime
        }
    }
});

// react后台管理系统
router.post('/react/admin/user/register', (ctx, next) => {
    let params = ctx.request.body
    let userId = params.userId
    let userName = params.userName
    let password = params.password

    let token = jwt.sign(
        //携带信息
        {userName,password},
        '666666',//秘钥
        {//有效期
            expiresIn:'24h'//1h一小时
        }
    )

    let sql = `insert into usertable (userId, userName, password) values ("${userId}", "${userName}", "${password}")`
    utils.query(mysql.createPool(databases.reactPool), sql)
    ctx.body = {
        code: 0,
        'data': {
            avatar: '',
            gender: -1,
            username: '林锋',
            role: '12345678',
            status: 0,
            token: token,
        }
    }
})
router.post('/react/admin/user/login', async(ctx, next) => {
    let params = ctx.request.body
    // let userId = params.userId
    let userName = params.userName
    let password = params.password

    const token = ctx.request.header.token;
    try {
        jwt.verify(token, '666666');
        await next();
      } catch (error) {
        console.log(error);
      }
    // let token=jwt.sign(
    //     //携带信息
    //     {userName,password},
    //     'blood259147',//秘钥
    //     {//有效期
    //         expiresIn:'24h'//1h一小时
    //     }
    // )
    let sql = `SELECT * from usertable WHERE userName = "${userName}" and password = "${password}"`
    let res = await utils.query(mysql.createPool(databases.reactPool), sql)
    ctx.body = {
        code: 0,
        'data': {
            authList: [
                {
                    id: 1,
                    name: '用户管理',
                    pid: -1,
                    role:'123',
                    _v: 0,
                    _id: 456
                },
                {
                    id: 2,
                    auth: 'userAuth',
                    name: '用户管理1',
                    path: '/manager/userAuth',
                    pid: -1,
                    role:'123',
                    _v: 0,
                    _id: 456
                },
                {
                    id: 3,
                    auth: 'privateMessage',
                    path: '/manager/userStatistics',
                    name: '用户管理3',
                    pid: 1,
                    role:'123',
                    _v: 0,
                    _id: 456
                },
                {
                    id: 1,
                    auth: 'myCollection',
                    name: '用户管理4',
                    pid: 21,
                    role:'123',
                    _v: 0,
                    _id: 456
                }
            ],
            avatar: '',
            created: res.addtime,
            gender: -1,
            username: '林锋',
            role: '12345678',
            status: 0,
            // token: token,
            updated: res.addtime,
        }
    }
})

module.exports = router
