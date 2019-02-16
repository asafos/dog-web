import mongoose from 'mongoose';
import express from 'express';
import { isAuthenticated } from '../../auth';
import { uploadImage } from '../../services/aws';
import multiparty from 'multiparty';

const router = express.Router();
const Story = mongoose.model('Story');

router.post('/', isAuthenticated, async (req, res, next) => {
    const { body } = req;
    if (!body) {
        return res.status(422).json({ errors: { story: 'is required' } });
    }
    if (!body.title) {
        return res.status(422).json({ errors: { title: 'is required' } });
    }
    
    try {
        const createdAt = new Date();
    
        for (let i = 0; i < body.sections.length; i++) {
            if (body.sections[i].image) {
                body.sections[i].image.url = await uploadImage(body.sections[i].image);
                delete body.sections[i].image.base64;
            }
        }
        const story = new Story({ createdAt, content: body, ups: 0, writer: req.user._id, public: body.public });
        await story.save();
        res.status(200).json({ story });
    } catch (e) {
        res.status(500).json(e);
        console.error(e);
    }
});

router.put('/', isAuthenticated, async (req, res, next) => {
    const { body, user } = req;

    if (body.writer != user._id) {
        return res.status(403).json({ errors: { user: 'not authorized' } });
    }
    if (!body) {
        return res.status(422).json({ errors: { story: 'is required' } });
    }
    if (!body.content) {
        return res.status(422).json({ errors: { content: 'is required' } });
    }
    if (!body._id) {
        return res.status(422).json({ errors: { _id: 'is required' } });
    }

    try {
        const updatedAt = new Date();
        const {sections} = body.content;
        for (let i = 0; i < sections.length; i++) {
            const {image} = sections[i];
            if (image && image.base64) {
                image.url = await uploadImage(image);
                delete image.base64;
            }
        }
        const story = await Story.update({ _id: body._id }, { $set: { content: body.content, updatedAt, public: body.public } });
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
        if (story.writer != user._id) {
            return res.status(403).json({ errors: { user: 'not allowed to do this process' } });
        }
        await Story.remove({ _id: storyId });
        const stories = await Story.find({ writer: user._id });
        res.status(200).json({ stories });
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
        const story = await Story.findOne({ _id: id });
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
        const stories = await Story.find({ writer: user._id });
        if (!stories) {
            return res.status(404).json({ errors: { stories: 'were not found' } });
        }
        res.status(200).json({ stories });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/allPublic', isAuthenticated, async (req, res, next) => {
    try {
        const stories = await Story.find({ public: true });
        if (!stories) {
            return res.status(404).json({ errors: { stories: 'were not found' } });
        }
        res.status(200).json({ stories });
    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;
