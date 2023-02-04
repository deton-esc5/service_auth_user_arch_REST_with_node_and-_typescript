import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import errorHandler from './middlewares/error.handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Configurações da Aplicação

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuração das Rotas

app.use(authorizationRoute);
app.use(statusRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

// Configuração dos Handlers de Erro

app.use(errorHandler);

//inicialização do Servidor

app.listen(3001, () => console.log("Aplicação executando na porta 3001!"))