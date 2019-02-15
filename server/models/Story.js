import mongoose from 'mongoose';

const { Schema } = mongoose;

const StorySchema = new Schema({
    content: {},
    writer: String,
    createdAt: Date,
    updatedAt: Date,
    ups: Number,
    public: Boolean,
    tags: []
});

StorySchema.methods.up = function(ups) {
    this.ups += ups || 1
};

mongoose.model('Story', StorySchema);
