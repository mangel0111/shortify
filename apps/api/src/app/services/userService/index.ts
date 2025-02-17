import {
  CreateUserRequest,
  GetUsersRequest,
  UrlServiceType,
  UserBaseResponse,
} from '@src/libs';
import { IUser, UserModel } from '../../models/user';

const adaptUserDBModelToUserResponse = (user: IUser): UserBaseResponse => {
  return {
    type: UrlServiceType.USER,
    id: user._id.toString(),
    attributes: {
      urlsShortened: user.urlsShortened,
      name: user.name,
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
  getUsers: async (
    params: GetUsersRequest
  ): Promise<{
    users: UserBaseResponse[];
    total: number;
  }> => {
    const limit = Math.max(params.size, 1); // Ensure size is at least 1
    const skip = (params.page - 1) * limit;
    const total = await UserModel.countDocuments({});
    const users = await UserModel.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first
    return {
      users: users.map((user) => adaptUserDBModelToUserResponse(user)),
      total,
    };
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
      name: user.name,
    });

    await newUser.save();
    return adaptUserDBModelToUserResponse(newUser);
  },
};

export default UserService;
