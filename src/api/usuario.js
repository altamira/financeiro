import http from './http'

function getLogin(usuario, senha, callback) {
	http.post('usuario/login', {usuario: usuario, senha: senha}, callback);
}

function changePassword(usuario, senha, nova, callback) {
	http.post('usuario/password', {usuario: usuario, senha: senha, nova: nova}, callback);
}

export default {
	login: getLogin,
	troca_senha: changePassword
}