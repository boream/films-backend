const Koa = require('koa');
const logger = require('koa-logger')

const app = new Koa();


app.listen(3001, function(err) {
  if (err) {
    console.error('Error listening in port 3000', err);
    process.exit(1);
  };

  console.log('Koa server listening in port 3000');
});

if (process.env.NODE_ENV === 'dev') {
  console.log('Enviorement as Dev in Node Server');
  app.use(logger());
}

//MW OPTENCION IP
app.use(async (ctx, next) => {
  const clientIP = ctx.request.ip;
  console.log(clientIP);
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
    console.log('esta token incorrecto');
    ctx.body = 'a la puta calle';
  }
});

app.use(async (ctx, next) => {
  console.log('esta logeado');
  ctx.body = 'puedes entrar';
});
