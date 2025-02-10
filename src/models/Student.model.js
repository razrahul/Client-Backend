import mongoose, {Schema} from "mongoose";
import BaseModelSchema from "./Base.model.js";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
    },
    // city: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'City',
    //     required: true
    // },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
    },
    // teacher: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Teacher',
    //     required: true
    // },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    age: {
        type: Number,
    },
    ...BaseModelSchema.obj,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;