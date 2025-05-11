import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  try {
    const posts = await postRepository.find();
    res.customSuccess(200, 'List of posts.', posts);
  } catch (err) {
    return next(new CustomError(400, 'Raw', `Can't retrieve list of posts.`, null, err));
  }
};
