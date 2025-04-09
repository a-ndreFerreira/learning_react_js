import upload from "../helpers/uploads.js";

export const checkFileImage = upload.single("imageHeroSrc", (req, res, next) => {
    const image = req.file;
    if (!image) {
        return res.status(404).json({ message: "Imagem não encontrada" })
    };
    next();
})