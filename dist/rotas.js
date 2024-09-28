"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carros_1 = require("./controladores/carros");
const rotas = express_1.default.Router();
rotas.get('/carros', carros_1.listarCarros);
rotas.get('/carros/:id', carros_1.detalharCarros);
rotas.post('/carros', carros_1.cadastrarCarros);
rotas.put('/carros/:id', carros_1.atualizarCarros);
rotas.delete('/carros/:id', carros_1.excluirCarros);
exports.default = rotas;
