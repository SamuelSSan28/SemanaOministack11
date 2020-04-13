const express = require("express");
const routes = express.Router();
const {celebrate,Segments,Joi} = require('celebrate')
const bdController = require('./controlers/bdController')

routes.get("/ongs",bdController.getOngs);

routes.get("/profile",celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),bdController.getEspecificIncidents)

routes.get("/incidents",bdController.getIncidents);

routes.post("/sessions",bdController.createSession)

routes.post("/ongs",celebrate({
    
    [Segments.BODY] : Joi.object().keys({
        nome:Joi.string().required(),
        email:Joi.string().required().email(),
        telefone:Joi.string().required().min(11).max(13),
        cidade:Joi.string().required(),
        uf:Joi.string().required().length(2)
    })}  
    ),bdController.createOng);

routes.post("/incidents",celebrate({

    [Segments.HEADERS] : Joi.object({authorization: Joi.string().required(),}).unknown(),

    [Segments.BODY] : Joi.object().keys({
        titulo:Joi.string().required(),
        descricao:Joi.string().required(),
        valor:Joi.number().required()
    })}  
    ),bdController.createIncident);

routes.delete("/incidents/:id",celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id:Joi.number().required(),
    })}),bdController.deleteIncident);

module.exports = routes;
