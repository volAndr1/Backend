import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/users/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const postRepository = getRepository(Post);

  const post = new Post();
  post.title = title;
  post.content = content;

  try {
    const newPost = await postRepository.save(post);
    res.customSuccess(201, 'Post successfully created.', newPost);
  } catch (err) {
    return next(new CustomError(400, 'Raw', 'Error creating post.', null, err));
  }
};
