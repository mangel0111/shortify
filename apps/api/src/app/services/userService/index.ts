import { CreateUserRequest, UrlServiceType, UserBaseResponse } from '@src/libs';
import { IUser, UserModel } from '../../models/user';

const adaptUserDBModelToUserResponse = (user: IUser): UserBaseResponse => {
  return {
    type: UrlServiceType.USER,
    id: user._id.toString(),
    attributes: {
      urlsShortened: user.urlsShortened,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};

/**
 * UserService
 *
 * This service is responsible for handling the logic for the short url service.
 */
const UserService = {
  getUsers: async (): Promise<UserBaseResponse[]> => {
    const users = await UserModel.find({});
    return users.map((user) => adaptUserDBModelToUserResponse(user));
  },
  getUserById: async (id: string): Promise<UserBaseResponse> => {
    const user = await UserModel.findById(id);
    return adaptUserDBModelToUserResponse(user);
  },
  userExists: async (id: string) => {
    const user = await UserModel.findById(id, { _id: 1 });
    return user;
  },
  addUrlToUser: async (id: string, newUrl: string): Promise<void> => {
    await UserModel.findByIdAndUpdate(id, {
      $addToSet: { urlsShortened: newUrl },
    });
  },
  createUser: async (user: CreateUserRequest): Promise<UserBaseResponse> => {
    const newUser = new UserModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    await newUser.save();
    return adaptUserDBModelToUserResponse(newUser);
  },
};

export default UserService;
