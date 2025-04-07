import express from 'express';
import db from './db/conn.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());

db.on("erro", console.log.bind(console, "Erro ao conectar com banco"));
db.once("open", () => {
    console.log(`DB connect ON`)
})

routes(app);

const port = 3000;

app.listen(port, () => {
    console.log(`Server on at ${port} port`);
})