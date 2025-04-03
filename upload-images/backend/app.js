import express from 'express';
import cors from 'cors'
import routes from './routes/index.js'
import db from './db/conn.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//db connect
db.on("error", console.log.bind(console, "Error connection"));
db.once("open", () => {
    console.log('DB connect on')
});

const PORT = 3000;

routes(app);

app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`)
})

