import mongoose from 'mongoose';

const {Schema} = mongoose;

const StorySchema = new Schema({
    content: {},
    writer: String,
    createdAt: Date,
    ups: Number
});

StorySchema.methods.up = (ups) => {
    this.ups += ups || 1
};

mongoose.model('Story', StorySchema);
