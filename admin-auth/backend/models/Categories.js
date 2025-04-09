import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    }
})

const ContentSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    images: [ImageSchema]
})

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageHeroSrc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: [ContentSchema]
}, { timestamps: true })

const Category = mongoose.model("Category", CategoriesSchema);

export default Category;