module.exports = function (req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const mainDomain = 'www.example.com'
  const forceDomain = 'https://'+mainDomain

  if (env === 'production' && host !== mainDomain) {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}