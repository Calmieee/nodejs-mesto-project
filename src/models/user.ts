import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  ABOUT_DEFAULT_VALUE,
  AVATAR_DEFAULT_LINK,
  USER_NAME_DEFAULT,
  EMAIL_PASSWORD_WRONG_MESSAGE,
} from '../error/const';
import { emailValidationOptions, urlValidationOptions } from '../utils/validator';
import UnauthorizedError from '../error/unAuthorizedError';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const UserSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: USER_NAME_DEFAULT,
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: ABOUT_DEFAULT_VALUE,
    },
    avatar: {
      type: String,
      validate: urlValidationOptions,
      default: AVATAR_DEFAULT_LINK,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidationOptions,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

UserSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(EMAIL_PASSWORD_WRONG_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(EMAIL_PASSWORD_WRONG_MESSAGE));
          }
          return user;
        });
    });
});

export default mongoose.model<IUser, IUserModel>('user', UserSchema);
