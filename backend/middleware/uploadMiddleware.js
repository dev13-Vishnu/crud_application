import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'uploads/');
    },
    filename: function(req,file,cb) {
        const uniqueSuffix = Date.now()+ '-' +Math.round(Math.random() *1e9);
        cb(null,uniqueSuffix + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null,true);
    } else {
        cb (new Error('Only images are allowed'));
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize:2 * 1024 * 1024},
});

export default upload;