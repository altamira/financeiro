import http from './../http'

function getLancamento(lancamento, callback) {
	http.fetch('contacorrente/lancamento/' + lancamento, callback);
}

function getLancamentos(conta, liquidado, callback) {
	http.fetch('contacorrente/lancamentos/' + conta.banco + '/' + conta.agencia + '/' + conta.conta + '?liquidado=' + (liquidado || 0), callback);
}

export default {
	get: getLancamento,
	list: getLancamentos
}