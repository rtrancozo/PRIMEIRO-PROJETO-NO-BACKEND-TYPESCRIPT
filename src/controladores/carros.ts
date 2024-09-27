import {Request, Response} from 'express';
import {knex} from '../bancoDeDados/conexao';
import {Carro} from '../tipos'

type Erro = {
    message:string
}


export const listarCarros = async (req: Request, res: Response)=>{
    try {
        const carros = await knex<Carro>('carros')
         res.json(carros)
    } catch (error) {
        const erro = error as Erro
        
         res.status(500).json({mensagem: erro.message})
    }
}
export async function detalharCarros (req: Request, res: Response){
        const id = req.params.id
    try {
        const carro = await knex('carros').where({id: Number(id)}).first();

        if (!carro) {
             res.status(404).json({mensagem: 'Carro não encontrado'})
        }

         res.status(200).json(carro)

        
    } catch (error) {
        const erro = error as Erro
        
       return res.status(500).json({mensagem: erro.message})
    }
    
}
export const cadastrarCarros = async (req: Request, res: Response):Promise<Response>=>{
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
export const atualizarCarros = async (req: Request, res: Response)=>{
    
}
export const excluirCarros = async (req: Request, res: Response)=>{
    
}





