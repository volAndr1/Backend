import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const postRepository = getRepository(Post);

  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} doesn't exist.`, ['Not Found']);
      return next(customError);
    }

    await postRepository.delete(id);
    res.customSuccess(200, 'Post successfully deleted.', { id: post.id, title: post.title });
  } catch (err) {
    return next(new CustomError(400, 'Raw', 'Error', null, err));
  }
};
