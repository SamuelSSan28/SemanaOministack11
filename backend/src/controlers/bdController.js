const conexao = require('../database/conection');
const crypto = require("crypto");
const {celebrate,Segments,Joi} = require('celebrate')

module.exports = {
    async getOngs(request,response){
        const ongs = await conexao('ongs').select('*');
        return response.json({ongs});
    
    },
    async createOng(request,response){
        const {nome,email,telefone,cidade,uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await conexao('ongs').insert({
            id,
            nome,
            email,
            telefone,
            cidade,
            uf,
        });
        return response.json({id});
    },

    async getIncidents(request,response){
        const incidents = await conexao('incidents').join('ongs','ongs.id','=','incidents.ong_id').select('incidents.*','ongs.nome','ongs.email','ongs.telefone','ongs.cidade','ongs.uf');
		const [count] = await conexao('incidents').count();
        response.header("Total_count",count["count(*)"])
        return response.json({incidents});
    
    },

    async getEspecificIncidents(request,response){
        const {page = 1} = request.query;
        const ong_id = request.headers.authorization;
        const [count] = await conexao('incidents').count();
        response.header("Total_count",count["count(*)"])
        const incidents = await conexao('incidents').join('ongs','ongs.id','=','incidents.ong_id').select(
            'incidents.*','ongs.nome','ongs.email','ongs.telefone','ongs.cidade','ongs.uf').where('ong_id',ong_id).limit(5).offset((page - 1)*5);
        return response.json({incidents});
    
    },
    async createIncident(request,response){
        const {titulo,descricao,valor} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conexao('incidents').insert({
            titulo,
            descricao,
            valor,
            ong_id,
            
        });
        return response.json({id});
    },
    async deleteIncident(request,response){
        console.log("deleteee")
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        const incident = await conexao('incidents').where('id',id).select('ong_id').first();

        if(ong_id != incident.ong_id){
            return response.status(401).json({error : "Operação não permitida !"});
        }

        await conexao('incidents').where('id',id).delete();

        return response.status(204).send();
    },
    async createSession(request,response){
        const {id} = request.body;
        
        const ong = await conexao('ongs').where("id",id).select("nome").first();

        if(! ong){
            return response.status(400).json({eror:"Nehuma ONG encontrada com esse ID!!"});
        }
        
        return response.json(ong);


    }

    

}