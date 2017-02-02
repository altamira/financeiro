import http from './../http'

function getConta(id, callback) {
	http.fetch('contacorrente/conta/' + id, callback);
}

function getContas(callback) {
	http.fetch('contacorrente/contas/', callback);
}

export default {
	get: getConta,
	list: getContas
}