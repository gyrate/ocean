const isJSON = require('koa-is-json')

module.exports = options => {
  return async function pack(ctx, next) {
    await next()

    // 只包装格式为json的响应体
    let body = ctx.body
    if (!body) return

    if (isJSON(body)) {
      ctx.body = {
        code: 1,
        message: 'success',
        data: body
      }
    } else {
      ctx.body = body
    }

  }
}
