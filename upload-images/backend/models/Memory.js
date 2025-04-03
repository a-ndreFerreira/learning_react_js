import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
});

const MemorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        favorite: {
            type: Boolean,
            default: false
        },
        comments: [CommentSchema]
    },
    {
        timestamps: true
    }
);

const Memory = mongoose.model("Memory", MemorySchema);

export default Memory;