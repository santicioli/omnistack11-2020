// atribui a uma constante recursos do framework express
const express = require('express')
// importa os Controllers
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
// importa a conecção com o banco
const routes = express.Router()

//configurando rota ou recursos
routes.post('/sessions', SessionController.create) 

routes.get('/ongs', OngController.index) 
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;