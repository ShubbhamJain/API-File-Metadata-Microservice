let express = require('express');
let multer = require('multer');
let upload = multer({ dest: 'uploads/' });

let port = process.env.PORT || 5000;

let app = express();

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/fileanalyse", upload.single('upFile'), (req, res) => {
    try {
        res.json({
            "File Name": req.file.originalname,
            "File Type": req.file.mimetype,
            "Size": req.file.size,
            "Destination Folder": req.file.destination,
            "File Name in Destination": req.file.filename
        });
    } catch (err) {
        console.error(err);
        res.status(404).json();
    }
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});