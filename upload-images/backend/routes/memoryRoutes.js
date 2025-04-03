import express from "express";
import { postMemory, getMemories, getMemory, deleteMemory, updateMemory, toggleFavorite, addComment } from "../controllers/MemoryController.js";
import upload from "../helpers/uploads.js";

const router = express.Router()

router.post(
    '/api/memories',
    upload.single("image"),
    (req, res, next) => {
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: "Arquivo não encontrado" }, image)
        };
        next();
    },
    (req, res) => postMemory(req, res)
);

router.get(
    '/api/memories',
    (req, res) => getMemories(req, res)
)

router.get(
    '/api/memories/:id',
    (req, res) => getMemory(req, res)
)

router.delete(
    '/api/memories/:id',
    (req, res) => deleteMemory(req, res)
)

router.patch(
    '/api/memories/:id',
    (req, res) => updateMemory(req, res)
)

router.patch(
    '/api/memories/favorite/:id',
    (req, res) => toggleFavorite(req, res)
)

router.patch(
    '/api/memories/:id/comment',
    (req, res) => addComment(req, res)
)

export default router;