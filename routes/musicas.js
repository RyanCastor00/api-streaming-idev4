const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const musicasSchema = new mongoose.Schema({
    titulo: String,
    artista: String,
    genero: String,
    ano: Number,
    duracao: Number,
    disponivel: Boolean,
    detalhes: Object,
});

const Musica = mongoose.model('musicas', musicasSchema);

router.get('/', async (req, res) => {
    try {
        const musicas = await Musica.find();
        res.json(musicas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const musica = await Musica.findById(req.params.id);
        if (!musica) {
            return res.status(404).json({ 
                message: 'Música não encontrada',
            });
        }
        res.status(200).json(musica);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const novaMusica = new Musica(req.body);
        await novaMusica.save();
        res.status(201).json(novaMusica);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const musicaAtualizada = await Musica.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!musicaAtualizada) {
            return res.status(404).json({
                message: 'Música não encontrada'
            });
        }
        res.status(200).json(musicaAtualizada);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const musicaDeletada = await
        Musica.findByIdAndDelete(req.params.id);
        if (!musicaDeletada) {
            return res.status(404).json({
              message: 'Música não encontrada'
            });
        }
        res.status(200).json({
          message: 'Música deletada com sucesso'
        });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        });
    }
});

module.exports = router;