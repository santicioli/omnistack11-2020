// atribui a uma constante recursos de framework e módulos
const express = require('express') //pacote
const express = require('cors') //pacote

//importar rotas salvas no arquivo routes.j
const routes = require('./routes') //arquivo relativo (./ - mesma pasta) (../ - pasta acima)

// armazena a aplicação, instanciando a aplicação
const app = express()

// implementa seguranças do cors
app.use(cors()) // Desenvolvimento
// produção, origin - endereço de acesso
// app.use(cors({
//     origin:'http://meuap.com' 
// })) 

// informa o tipo de dados da API
app.use(express.json())

//usar as rotas
app.use(routes)

//ouvir a porta
app.listen(3333)