import http from './../http'

function getLancamento(lancamento, callback) {
	http.fetch('contacorrente/lancamento/' + lancamento, callback);
}

function getLancamentosList(banco, agencia, conta, liquidado, callback) {
	if (banco && agencia && conta) {
		http.fetch('contacorrente/lancamentos/conferir/' + banco + '/' + agencia + '/' + conta + '?liquidado=' + (!!liquidado ? 1 : 0), callback);	
	}
}

function getLancamentosSearch(banco, agencia, conta, liquidado, callback) {
	if (banco && agencia && conta) {
		http.fetch('contacorrente/lancamentos/liquidados/' + banco + '/' + agencia + '/' + conta + '?liquidado=' + (!!liquidado ? 1 : 0), callback);	
	}
}

function deleteLancamento(id, callback) {
	http.delete('contacorrente/lancamento/excluir/' + id, callback);	
}

function postLancamento(lancamento, callback) {
	http.post('contacorrente/lancamento/add', lancamento, callback);	
}

function putLancamento(lancamento, callback) {
	http.put('contacorrente/lancamento/edit', lancamento, callback);	
}

function liquidarLancamento(lancamento, callback) {
	http.put('contacorrente/lancamento/liquidar', lancamento, callback);	
}

export default {
	get: getLancamento,
	list: getLancamentosList,
	search: getLancamentosSearch,
	add: postLancamento,
	edit: putLancamento,
	delete: deleteLancamento,
	liquidar: liquidarLancamento
}