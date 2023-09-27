// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:4000',
  'https://vereskun.nomoredomainsicu.ru',
  'https://api.vereskun.nomoredomainsicu.ru',
  'https://api.nomoreparties.co/beatfilm-movies'];

const corsHeadler = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
module.exports = corsHeadler;
