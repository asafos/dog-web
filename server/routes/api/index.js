import express from 'express';
import usersRoutes from './users';
import storyRoutes from './story';
const router = express.Router();

router.use('/users', usersRoutes);
router.use('/story', storyRoutes);

export default router;
