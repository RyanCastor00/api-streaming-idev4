const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected', () => {
  console.log('Conectado com MongoDB');
});

const musicasRouter = require ('./routes/musicas');
const filmesRouter = require ('./routes/filmes');
const seriesRouter = require ('./routes/series');
const livrosRouter = require ('./routes/livros');
const jogosRouter = require ('./routes/jogos');

app.use('/musicas', musicasRouter);
app.use('/filmes', filmesRouter);
app.use('/series', seriesRouter);
app.use('/livros', livrosRouter);
app.use('/jogos', jogosRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
