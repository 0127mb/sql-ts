import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, callback,) => {
        callback(null, "/uploads");
    },
    filename: (req, file, callback) => {
        const [originName, extension] = file.originalname.split(".")
        const filename = `${originName}_${Date.now()}-${extension}`

        callback(null, filename);

    }


})

const filter: multer.Options['fileFilter'] = (req, file, callback) => {
    const Allowedtypess = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!Allowedtypess.includes((file.minetype))) {
        callback(new Error("Invalid file type"));
    } else {
        callback(null, true);
    }


}
export const upload = multer({
    storage,
    filter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})
