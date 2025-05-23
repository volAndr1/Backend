import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  // Проверяем, является ли id числом
  if (isNaN(Number(id))) {
    return next(new CustomError(400, 'General', `Invalid ID format: ${id}`));
  }

  const postRepository = getRepository(Post);

  try {
    const post = await postRepository.findOne({ where: { id: Number(id) } });

    if (!post) {
      return next(new CustomError(404, 'General', `Post with id: ${id} not found.`, ['Not Found']));
    }

    res.customSuccess(200, 'Post found', post);
  } catch (err) {
    return next(new CustomError(400, 'Raw', 'Error', null, err));
  }
};