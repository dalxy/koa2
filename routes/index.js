const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/slider/list', async (ctx, next) => {
  ctx.body = {
    'err': 0,
    'data': [
      {'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/reactnative.png'},
      {'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png'},
      {'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/vue.png'},
      {'url': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/wechat.png'}    ]
  }
})

router.get('/lesson/list', async (ctx, next) => {
  ctx.body = {
    'err': 0,
    'data': {
      'list': [{
        'title': '1.React全栈架构',
        'video': 'http://img.zhufengpeixun.cn/gee2.mp4',
        'poster': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        'price': 100,
        'category': '1'
      },{
        'title': '2.React全栈架构',
        'video': 'http://img.zhufengpeixun.cn/gee2.mp4',
        'poster': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        'price': 200,
        'category': '1'
      },{
        'title': '3.React全栈架构',
        'video': 'http://img.zhufengpeixun.cn/gee2.mp4',
        'poster': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        'price': 100,
        'category': '1'
      },{
        'title': '4.React全栈架构',
        'video': 'http://img.zhufengpeixun.cn/gee2.mp4',
        'poster': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        'price': 200,
        'category': '1'
      },{
        'title': '5.React全栈架构',
        'video': 'http://img.zhufengpeixun.cn/gee2.mp4',
        'poster': 'http://www.zhufengpeixun.cn/themes/jianmo2/images/react.png',
        'price': 100,
        'category': '1'
      }],
      'hasMore': false
    } 
  }
})

router.post('/api/login', async (ctx, next) => {
  let postParam = ctx.request.body
  console.log(postParam)
  ctx.body = {
    code: 0,
    data: `${postParam.username}-jwt-token`
  }
})
router.get('/api/currentUser', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: token.split("-")[0]
  }
})

module.exports = router
