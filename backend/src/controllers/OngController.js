// atribui a uma constante recursos da biblioteca de criptografia
const crypto = require('crypto')
// importa a conecção com o banco
const connection = require('../database/connection')

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    }, 

    async create(request, response) {
        //atribuiu os dados da requisição a constantes 
        const {name, email, whatsapp, city, uf} = request.body;
        //4 caracteres convertidos em Hexadecimal
        const id = crypto.randomBytes(4).toString('HEX')
        //await - com o async, espera inserir para seguir o código
        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf
        })
        
        // retorno em json
        return response.json({ id })
    }
}