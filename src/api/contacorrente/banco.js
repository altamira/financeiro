import http from './../http'

function getBanco(id, callback) {
	http.fetch('contacorrente/banco/' + id, callback);
}

function getBancos(id, callback) {
	http.fetch('contacorrente/bancos/', callback);
}

export default {
	get: getBanco,
	list: getBancos
}