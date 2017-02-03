import http from './../http'

function getLancamento(lancamento, callback) {
	http.fetch('contacorrente/lancamento/' + lancamento, callback);
}

function getLancamentos(banco, agencia, conta, liquidado, callback) {
	if (banco && agencia && conta) {
		http.fetch('contacorrente/lancamentos/' + banco + '/' + agencia + '/' + conta + '?liquidado=' + (!!liquidado ? 1 : 0), callback);	
	}
}

function postLancamento(lancamento, callback) {
	http.post('contacorrente/lancamento/', lancamento, callback);	
}

export default {
	get: getLancamento,
	list: getLancamentos,
	save: postLancamento
}