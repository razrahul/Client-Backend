import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const FeedbackSchema = new Schema({
    user: {
        type: _Schema.Types.ObjectId,
        refPath: 'userType',  // Dynamically reference Teacher or Student
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['Teacher', 'Student']
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true });

const Feedback = model('Feedback', FeedbackSchema);

export default Feedback;
