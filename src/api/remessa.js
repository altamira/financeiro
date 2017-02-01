import http from './http'

function getRemessa(id, callback) {
	http.fetch('financeiro/remessa/' + id, callback);
}

function getRemessas(callback) {
	http.fetch('financeiro/remessas/', callback);
}

function gravarTarefa(tarefa, callback) {
	http.post('financeiro/recebiveis/remessa', tarefa, callback);
}

export default {
	get: getRemessa,
	list: getRemessas,
	concluir: gravarTarefa
}