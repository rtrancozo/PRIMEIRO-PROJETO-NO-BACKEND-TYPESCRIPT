import express from 'express';
import {knex} from '../bancoDeDados/conexao';
import {Carro} from '../tipos'

type Erro = {
    message:string
}


export const listarCarros = async (req: express.Request, res: express.Response)=>{
    try {
        const carros = await knex<Carro>('carros')
         return res.json(carros)
    } catch (error) {
        const erro = error as Erro
        
        return res.status(500).json({mensagem: erro.message})
    }
}
export async function detalharCarros (req: express.Request, res: express.Response){
        const id = req.params.id
    try {
        const carro = await knex<Carro>('carros').where({id: Number(id)}).first();

        if (!carro) {
            return  res.status(404).json({mensagem: 'Carro não encontrado'})
        }

        return res.status(200).json(carro)

        
    } catch (error) {
        const erro = error as Erro
        
       return res.status(500).json({mensagem: erro.message})
    }
    
}
export const cadastrarCarros = async (req: express.Request, res: express.Response)=>{
        const {marca, modelo, ano, cor, valor} = req.body;

        try {
            const carro = await knex<Omit<Carro, 'id'>>('carros').insert({
                marca, modelo, ano, cor, valor
            }).returning('*')

            return res.status(201).json(carro[0])
            
        } catch (error) {
            const erro = error as Erro
        
            return res.status(500).json({mensagem: erro.message})
        }





}
export const atualizarCarros = async (req: express.Request, res: express.Response)=>{
    const {marca, modelo, ano, cor, valor} = req.body;
    const id = req.params.id
    try {
        const atualizacao = await knex('carros').update({marca, modelo, ano, cor, valor}).where('id', id).returning('*');


        
        
        if (atualizacao.length<1) {
            return  res.status(404).json({mensagem: 'Carro não encontrado'})
        }

        return res.json(atualizacao[0])




    } catch (error) {
        const erro = error as Erro
        
        return res.status(500).json({mensagem: erro.message})
    }

    
}
export const excluirCarros = async (req: express.Request, res: express.Response)=>{

    const id = req.params.id;
    try {
        const excluir = await knex('carros').del().where('id',id).returning('*')

        if (excluir.length<1) {
            return  res.status(404).json({mensagem: 'Carro não encontrado'})
        }
        return res.json(excluir)
        
    } catch (error) {
        const erro = error as Erro
        
        return res.status(500).json({mensagem: erro.message})
    }

    
}





