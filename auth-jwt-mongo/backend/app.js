import express from 'express'
import db from './db/conn.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());

db.on("error", console.log.bind(console, "DB error connection"));
db.once("open", () => {
    console.log('DB connect ON')
})

const PORT = 3000;

routes(app);

app.listen(PORT, () => {
    console.log(`Server run at ${PORT} port.`);
})