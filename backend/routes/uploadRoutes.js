import  express  from "express"
import multer from 'multer'
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, res){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
function checkfileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        returncb(null, true)
    }else{
        cb('Images Only')
    }
}

const upload = multer ({
    storage,
    fileFilter: function(req, file, cb){
        checkfileType(file, cb)
    }
})

router.post('/',upload.single('images'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router