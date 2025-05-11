import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  let { title } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const postRepository = getRepository(Post);

  title = !title ? '' : title.trim();

  if (!title) {
    errorsValidation.push({ title: 'Title is required' });
  } else {
    const existingPost = await postRepository.findOne({ where: { title } });
    if (existingPost) {
      errorsValidation.push({ title: `Post with title '${title}' already exists` });
    }
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Create post validation error',
      null,
      null,
      errorsValidation
    );
    return next(customError);
  }

  return next();
};
