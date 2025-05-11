import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const postRepository = getRepository(Post);

  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      return next(new CustomError(404, 'General', `Post with id:${id} not found.`, ['Not Found']));
    }

    res.customSuccess(200, 'Post found', post);
  } catch (err) {
    return next(new CustomError(400, 'Raw', 'Error', null, err));
  }
};
