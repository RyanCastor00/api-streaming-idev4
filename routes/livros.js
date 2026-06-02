const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const livrosSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    genero: String,
    ano: Number,
    paginas: Number,
    disponivel: Boolean,
    detalhes: Object,
});

const Livro = mongoose.model('livros', livrosSchema);

router.get('/', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        if (!livro) {
            return res.status(404).json({
                message: 'Livro não encontrado',
            });
        }
        res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const novoLivro = new Livro(req.body);
        await novoLivro.save();
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const livroAtualizado = await Livro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!livroAtualizado) {
            return res.status(404).json({
                message: 'Livro não encontrado'
            });
        }
        res.status(200).json(livroAtualizado);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const livroDeletado = await Livro.findByIdAndDelete(req.params.id);
        if (!livroDeletado) {
            return res.status(404).json({
                message: 'Livro não encontrado'
            });
        }
        res.status(200).json({
            message: 'Livro deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;