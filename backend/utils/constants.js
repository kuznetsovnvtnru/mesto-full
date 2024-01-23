const IS_URL = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#'()*+,:;<>@[\\\]`{|}~]*$/;

const corsOptions = {
  origin: [
    'https://cerea62.nomoredomainsmonster.ru',
    'http://cerea62.nomoredomainsmonster.ru',
    'http://localhost:3000',
  ],
  credentials: true,
};

module.exports = { IS_URL, corsOptions };
