const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        // paginação, default 1
        const { page = 1 } = request.query

        // atribui a count o valor da primeira posição
        const [count] = await connection('incidents').count()
        // cabeçalho da resposta, count(*) - campo de retorno
        response.header('X-Total-Count', count['count(*)'])

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1)*5) // pular múltiplos de 5
        .select(['incidents.*', 
            'ongs.name', 
            'ongs.email',
            'ongs.whatsapp', 
            'ongs.city',
            'ongs.uf',
        ])

        return response.json(incidents)   
    },
    async create(request, response){
        const {title, description, value} = request.body
        request.headers
        const ong_id = request.headers.authorization

        // atribui a const id o valor do id do incidents
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },
    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted'})
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
}