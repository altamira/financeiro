import http from './http'

function getRetorno(id, callback) {
	http.fetch('financeiro/retorno/' + id, callback);
}

function getRetornos(callback) {
	http.fetch('financeiro/retorno/', callback);
}

export default {
	get: getRetorno,
	list: getRetornos
}