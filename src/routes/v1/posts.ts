import { Router } from 'express';

import { list, show, edit, destroy, create } from 'controllers/posts';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
import { validatorCreate, validatorEdit } from 'middleware/validation/posts';

const router = Router();

router.get('/', [checkJwt], list);

router.get('/:id', [checkJwt], show);

router.post('/', [checkJwt, validatorCreate], create);

router.patch('/:id', [checkJwt, validatorEdit], edit);

router.delete('/:id', [checkJwt], destroy);

export default router;
