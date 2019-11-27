const Koa = require('koa');
const body = require('koa-body');
const app = new Koa();
const filmRouter = require('routes/film.router');
const logger = require('logger');
app.listen(3001, function(err) {
  if (err) {
    console.error('Error listening in port 3000', err);
    process.exit(1);
  };

  logger.info('Koa server listening in port 3000');
});

if (process.env.NODE_ENV === 'dev') {
  logger.info('Enviorement as Dev in Node Server');
  app.use(logger());
}
app.use(body());

app.use(filmRouter.routes());
//MW OPTENCION IP
app.use(async (ctx, next) => {
  const clientIP = ctx.request.ip;
  logger.info(clientIP);
  next();
});

//MW DE AUTENTICACION
app.use(async (ctx, next) => {

  if(ctx.headers['authorization'] == 'Bearer token')
  {
    next();
  }
  else 
  {
    logger.debug('esta token incorrecto');
    ctx.body = 'a la puta calle';
  }
});

app.use(async (ctx, next) => {
  logger.debug('esta token incorrecto');
  ctx.body = 'puedes entrar';
});
