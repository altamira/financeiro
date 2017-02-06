import http from './../http'

function getLancamento(lancamento, callback) {
	http.fetch('contacorrente/lancamento/' + lancamento, callback);
}

function getLancamentosList(banco, agencia, conta, liquidado, callback) {
	if (banco && agencia && conta) {
		http.fetch('contacorrente/lancamentos/listar/' + banco + '/' + agencia + '/' + conta + '?liquidado=' + (!!liquidado ? 1 : 0), callback);	
	}
}

function getLancamentosSearch(banco, agencia, conta, liquidado, callback) {
	if (banco && agencia && conta) {
		http.fetch('contacorrente/lancamentos/buscar/' + banco + '/' + agencia + '/' + conta + '?liquidado=' + (!!liquidado ? 1 : 0), callback);	
	}
}

function postLancamento(lancamento, callback) {
	http.post('contacorrente/lancamento', lancamento, callback);	
}

function liquidarLancamento(lancamento, callback) {
	http.put('contacorrente/lancamento', lancamento, callback);	
}

export default {
	get: getLancamento,
	list: getLancamentosList,
	search: getLancamentosSearch,
	save: postLancamento,
	liquidar: liquidarLancamento
}