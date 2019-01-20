import mongoose from 'mongoose';
import express from 'express';
import {isAuthenticated} from '../../auth';

const router = express.Router();
const Story = mongoose.model('Story');

router.post('/', isAuthenticated, async (req, res, next) => {
    const {body} = req;
    console.log('req.user', req.user);

    if (!body) {
        return res.status(422).json({errors: {story: 'is required'}});
    }

    if (!body.title) {
        return res.status(422).json({errors: {title: 'is required'}});
    }

    const createdAt = new Date();
    const story = new Story({createdAt, content: body, ups: 0, writer: req.user.email});
    await story.save();
    res.status(200).json({story});
});

router.get('/:id', isAuthenticated, async (req, res, next) => {
    const {params: {id}} = req;
    console.log('req.param', req);

    if (!id) {
        return res.status(422).json({errors: {storyId: 'is required'}});
    }
    try {
        const story = await Story.findOne({_id: id});
        if (!story) {
            return res.status(400).json({errors: {story: 'was not found'}});
        }
        res.status(200).json({story});
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;
