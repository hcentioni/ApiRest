import multer from 'multer';
import sharp from 'sharp';
import Router from  'express';
import fs from 'fs';

const router = Router()

const helperImg =(filePath,fileName, size = 300) => {
    return sharp(filePath)
    .withMetadata()
    .rotate()
    .resize(size)
    .toFile(`src/optimize/${fileName}`)
}

const helperImgAvatar =(filePath,fileName, size = 300) => {
    return sharp(filePath)
    .withMetadata()
    .rotate()
    .resize(size,size)
    .toFile(`src/optimize/${fileName}`)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb)=>{
            const ext = file.originalname.split('.').pop()
            cb(null,`${Date.now()}.${ext}`)
    }

})


  
const upload = multer({storage})

router.post('/upload/:Principal', upload.single('file'), (req,res)=>{
    helperImg(req.file.path, `micro-resize-${req.file.filename}`, 32)
    helperImg(req.file.path, `small-resize-${req.file.filename}`, 100)
    helperImg(req.file.path, `medium-resize-${req.file.filename}`, 500)
    helperImg(req.file.path, `large-resize-${req.file.filename}`, 1000)
    helperImgAvatar(req.file.path, `avatar-resize-${req.file.filename}`, 32)
    console.log(req.params.Principal);
    res.send({data:'Imagen Cargada'})
} )

function eliminarArchivo(ruta){
    try {
        var regex = /\\/g;
        ruta=ruta.replace(regex, '/');
        console.log(ruta);
         fs.unlinkSync(ruta);
         console.log("Archivo Eliminado");
    } catch (error) {
        console.log("Error:", error);
    }

}
export default router