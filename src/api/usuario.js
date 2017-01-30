import http from './http'

function getLogin(usuario, senha, callback) {
	http.post('usuario/login', {usuario: usuario, senha: senha}, callback);
}

export default {
	login: getLogin
}