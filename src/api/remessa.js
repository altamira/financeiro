import http from './http'

function getRemessa(id, callback) {
	http.fetch('financeiro/remessa/' + id, callback);
}

function getRemessas(callback) {
	http.fetch('financeiro/remessa/', callback);
}

export default {
	get: getRemessa,
	list: getRemessas
}