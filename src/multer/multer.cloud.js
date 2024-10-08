import multer from "multer"

export const uploadValidation = {
    image: ["image/jpeg", "image/png"],
    pdf: ["applicatioon/pdf"],
}


export const uploadImage = (customValidation) => {
    if (!customValidation) {
        customValidation = uploadValidation.image
    }

    const storage = multer.diskStorage({})

    const fileFilter = (req, file, cb) => {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new AppError("invalid file", 400), false)
        }
    }

    const upload = multer({ fileFilter, storage })

    return upload
}