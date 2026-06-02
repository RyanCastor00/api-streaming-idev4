const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const filmesSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    atores: String,
    detalhes: Object,
});

const Filme = mongoose.model('filmes', filmesSchema);

router.get('/', async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).json({
                message: 'Filme não encontrado',
            });
        }
        res.status(200).json(filme);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const novoFilme = new Filme(req.body);
        await novoFilme.save();
        res.status(201).json(novoFilme);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const filmeAtualizado = await Filme.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!filmeAtualizado) {
            return res.status(404).json({
                message: 'Filme não encontrado'
            });
        }
        res.status(200).json(filmeAtualizado);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filmeDeletado = await Filme.findByIdAndDelete(req.params.id);
        if (!filmeDeletado) {
            return res.status(404).json({
                message: 'Filme não encontrado'
            });
        }
        res.status(200).json({
            message: 'Filme deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;    