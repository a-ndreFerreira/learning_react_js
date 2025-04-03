import Memory from "../models/Memory.js";
import fs from 'fs';

const removeOldImage = (memory) => {
    fs.unlink(`public/${memory.src}`, (error) => {
        if (error) {
            return console.log(error)
        } else {
            return console.log('Imagem excluida do servidor')
        }
    })
}

export const postMemory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const src = `images/${req.file.filename}`;
        if (!title || !description) {
            return res.status(400).json({ message: "Preencha corretamente." })
        }
        const newMemory = new Memory({
            title, description, src
        });
        await newMemory.save();
        res.status(201).json({ message: "Memória criada com sucesso.", newMemory })

    } catch (error) {
        res.status(500).json({ message: `Erro ao postar., ${error.message}.` })
    }
}

export const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find();
        res.json(memories);

    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar dados, ${error.message}.` })
    }
}

export const getMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Item não foi encontrado.' })
        }
        res.json(memory);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar item, ${error.message}.` })
    }
}

export const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findByIdAndDelete(req.params.id)
        if (!memory) {
            return res.status(404).json({ message: 'Erro ao deletar, item não encontrado.' })
        }
        removeOldImage(memory);
        res.json({ message: 'Memoria deletada com sucesso.' });

    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar item, ${error.message}.` })
    }
}

export const updateMemory = async (req, res) => {
    try {
        const { title, description } = req.body;
        let src = null;
        if (req.file) {
            src = `images/${req.file.filename}`;
        }
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Item não foi encontrado.' })
        }
        if (src) {
            removeOldImage(memory);
        }
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (src) updateData.src = src;
        const upadateMemory = await Memory.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true },
        );
        res.status(200).json({ message: 'Atualização feita com sucesso.', upadateMemory });

    } catch (error) {
        res.status(500).json({ message: `Erro ao atualizar item, ${error.message}.` })
    }
}

export const toggleFavorite = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Item não foi encontrado.' })
        }
        memory.favorite = !memory.favorite;
        await memory.save();
        res.status(200).json({ message: 'Favoritado com sucesso.', memory });

    } catch (error) {
        res.status(500).json({ message: `Erro ao favoritar item, ${error.message}.` })
    }
}

export const addComment = async (req, res) => {
    try {
        const { name, text } = req.body;
        if (!name || !text) {
            return res.status(400), json({ message: 'Preencha corretamente os dados.' })
        }
        const comment = { name, text };
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Item não encontrado.' })
        }
        memory.comments.push(comment);
        res.status(201).json({ message: 'Comentário adicionado com sucesso.', memory });

    } catch (error) {
        res.status(500).json({ message: `Erro ao adicionar comentário, ${error.message}.` })
    }
}