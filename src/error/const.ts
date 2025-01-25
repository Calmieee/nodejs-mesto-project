const DATA_ERROR_CODE = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const NOT_FOUND_CODE = 404;
const STATUS_USER_EXISTS = 409;
const DEFAULT_ERROR_CODE = 500;
const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;

const ID_ERROR_MESSAGE = 'передан некорректный _id';
const DATA_ERROR_MESSAGE = 'переданы некорректные данные';
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
const ABOUT_DEFAULT_VALUE = 'Исследователь';
const AVATAR_DEFAULT_LINK = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';
const USER_NAME_DEFAULT = 'Жак-Ив Кусто';
const EMAIL_PASSWORD_WRONG_MESSAGE = 'Вы ввели неправильные почту или пароль';
const AUTHORIZATION_NEEDED_MESSAGE = 'Необходима авторизация';
const VALIDATION_ERROR_MESSAGE = 'Ошибка валидации полей';
const CARD_NOT_FOUND_MESSAGE = 'Карточка не найдена';
const STATUS_FORBIDDEN_MESSAGE = 'У вас нет прав на эту операцию';
const CARD_DELITION_SUCCESS_MESSAGE = 'Карточка успешно удалена';
const USER_EXISTS_MESSAGE = 'Пользователь с такими данными уже существует';
const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';
const INVALID_DATA_MESSAGE = 'Данные недействительны';

export {
  DATA_ERROR_CODE,
  NOT_FOUND_CODE,
  DEFAULT_ERROR_CODE,
  ID_ERROR_MESSAGE,
  DATA_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  STATUS_SUCCESS,
  STATUS_CREATED,
  ABOUT_DEFAULT_VALUE,
  AVATAR_DEFAULT_LINK,
  USER_NAME_DEFAULT,
  EMAIL_PASSWORD_WRONG_MESSAGE,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_USER_EXISTS,
  AUTHORIZATION_NEEDED_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  STATUS_FORBIDDEN_MESSAGE,
  CARD_DELITION_SUCCESS_MESSAGE,
  USER_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_DATA_MESSAGE,
};
