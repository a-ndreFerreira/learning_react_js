import fs from 'fs';

export const removeOldHeroImage = (category) => {
    fs.unlink(`.${category.imageHeroSrc}`, (error) => {
        if (error) {
            return console.log(error)
        } else {
            return console.log('Imagem excluida do servidor')
        }
    })
}

// export const removeOldImagesArray = (images) => {
//     images.forEach(item => {
//         fs.unlink(`.${item}`, (error) => {
//             if (error) {
//                 return console.log(error)
//             } else {
//                 return console.log('Imagens excluidas do servidor')
//             }
//         })
//     })
// }
