import http from './http'

function getCobranca(id, callback) {
	http.fetch('financeiro/cobrancas/' + id, callback);
}

function gravarTarefa(tarefa, callback) {
	http.post('financeiro/recebiveis/cobranca', tarefa, callback);
}

export default {
	get: getCobranca,
	concluir: gravarTarefa
}