const Koa = require('koa');
const Router = require('koa-router');
const uuid = require('node-uuid');

const server = new Koa();
server.listen(3030);

server.context.global = { // 相当于ctx的prototype，通过 ctx.global 访问
  desc: 'koa',
}

server.use(async (ctx, next) => {
  console.log('允许跨域')
  ctx.set('Access-Control-Allow-Origin', '*');

  await next();
});

const router = new Router();

router.get('/index', async (ctx, next) => {
  console.log(ctx.url)
  // ctx.body = 'ok'
  ctx.body = { // 向浏览器发送东西
    user: 'jianfeng',
    pass: '12345'
  }
});

// server.context
router.get('/global', async (ctx, next) => {
  ctx.body = 'ok：' + ctx.global.desc
});

// http://localhost:3030/throw?user=jianfeng&pass=12345
router.get('/throw', async ctx => {
  const { user, pass } = ctx.query
  if (!pass) ctx.throw(400, 'pass 必填')
  ctx.body = ctx.query
});
router.get('/assert', async ctx => {
  ctx.assert(ctx.query.pass, 400, 'password is required'); // 抛出错误，不执行后面代码
  ctx.body = ctx.query
});

// ctx.state 状态码
router.get('/state', async ctx => {
  ctx.state = 404
});

// ctx.redirect() 重定向地址 302，临时重定向  用在登录
router.get('/redirect', async ctx => {
  ctx.redirect('/index')
  // ctx.redirect('https://www.baidu.com/')
});

// token
router.get('/token', async ctx => {
  const token = uuid.v4().replace(/\-/g, '');
  const token_expires = Math.floor((Date.now() + (3600 * 2)) / 1000);
  ctx.body = 'ok：' + token + '：' + token_expires

  // const now = Math.floor(Date.now() / 1000);
  // if (now > token_expires) { // 此处 token_expires 取 ID，token，对应
  //   ctx.body = {err: 1, msg: 'token expired'};
  // } else {
  //   ctx.body = 'ok'
  // }
});

// ctx.attachment() 下载文件

server.use(router.routes()); // server 上挂载 router
