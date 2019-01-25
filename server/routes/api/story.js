import mongoose from 'mongoose';
import express from 'express';
import { isAuthenticated } from '../../auth';

const router = express.Router();
const Story = mongoose.model('Story');

router.post('/', isAuthenticated, async (req, res, next) => {
    const { body, user} = req;

    if (!body) {
        return res.status(422).json({ errors: { story: 'is required' } });
    }

    if (!body.title) {
        return res.status(422).json({ errors: { title: 'is required' } });
    }
    try {
        const createdAt = new Date();
        const story = new Story({ createdAt, content: body, ups: 0, writer: req.user._id });
        const savedStory = await story.save();
        // await user.addStory(savedStory._id);
        res.status(200).json({ story });
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

router.delete('/:storyId', isAuthenticated, async (req, res, next) => {
    const { user, params: { storyId } } = req;

    if (!storyId) {
        return res.status(422).json({ errors: { storyId: 'is required' } });
    }

    try {
        const story = await Story.findOne({ _id: storyId });
        if (story.writer !== user._id) {
            return res.status(403).json({ errors: { user: 'not allowed to do this process' } });            
        }
        await Storage.remove({_id: storyId}, {justOne: true})
        res.status(200).json({ story });
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

router.get('/byStoryId/:id', isAuthenticated, async (req, res, next) => {
    const { params: { id } } = req;

    if (!id) {
        return res.status(422).json({ errors: { storyId: 'is required' } });
    }
    try {
        const story = await Story.findOne({_id: id});
        if (!story) {
            return res.status(404).json({ errors: { story: 'was not found' } });
        }
        res.status(200).json({ story });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/byUserId', isAuthenticated, async (req, res, next) => {
    const { user } = req;

    try {
        const stories = await Story.find({writer: user._id});
        if (!stories) {
            return res.status(404).json({ errors: { stories: 'were not found' } });
        }
        res.status(200).json({ stories });
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;
