import http from './http'

function getRetorno(id, callback) {
	http.fetch('financeiro/retorno/' + id, callback);
}

function getRetornos(callback) {
	http.fetch('financeiro/retornos/', callback);
}

function gravarTarefa(tarefa, callback) {
	http.post('financeiro/recebiveis/retorno', tarefa, callback);
}

export default {
	get: getRetorno,
	list: getRetornos,
	concluir: gravarTarefa
}