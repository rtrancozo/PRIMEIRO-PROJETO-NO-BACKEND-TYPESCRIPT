"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCarros = exports.atualizarCarros = exports.cadastrarCarros = exports.listarCarros = void 0;
exports.detalharCarros = detalharCarros;
const conexao_1 = require("../bancoDeDados/conexao");
const listarCarros = async (req, res) => {
    try {
        const carros = await (0, conexao_1.knex)('carros');
        return res.json(carros);
    }
    catch (error) {
        const erro = error;
        return res.status(500).json({ mensagem: erro.message });
    }
};
exports.listarCarros = listarCarros;
async function detalharCarros(req, res) {
    const id = req.params.id;
    try {
        const carro = await (0, conexao_1.knex)('carros').where({ id: Number(id) }).first();
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' });
        }
        return res.status(200).json(carro);
    }
    catch (error) {
        const erro = error;
        return res.status(500).json({ mensagem: erro.message });
    }
}
const cadastrarCarros = async (req, res) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    try {
        const carro = await (0, conexao_1.knex)('carros').insert({
            marca, modelo, ano, cor, valor
        }).returning('*');
        return res.status(201).json(carro[0]);
    }
    catch (error) {
        const erro = error;
        return res.status(500).json({ mensagem: erro.message });
    }
};
exports.cadastrarCarros = cadastrarCarros;
const atualizarCarros = async (req, res) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    const id = req.params.id;
    try {
        const atualizacao = await (0, conexao_1.knex)('carros').update({ marca, modelo, ano, cor, valor }).where('id', id).returning('*');
        if (atualizacao.length < 1) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' });
        }
        return res.json(atualizacao[0]);
    }
    catch (error) {
        const erro = error;
        return res.status(500).json({ mensagem: erro.message });
    }
};
exports.atualizarCarros = atualizarCarros;
const excluirCarros = async (req, res) => {
    const id = req.params.id;
    try {
        const excluir = await (0, conexao_1.knex)('carros').del().where('id', id).returning('*');
        if (excluir.length < 1) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' });
        }
        return res.json(excluir);
    }
    catch (error) {
        const erro = error;
        return res.status(500).json({ mensagem: erro.message });
    }
};
exports.excluirCarros = excluirCarros;
