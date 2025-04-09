import upload from "../helpers/uploads.js";

export const checkFileImages = (req, res, next) => {
    upload.array("images", 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Erro no upload de imagens." })
        }
        if (!req.files || !req.files.length === 0) {
            return res.status(404).json({ message: "Nenhuma imagem encontrada." });
        }
        next();
    })
}