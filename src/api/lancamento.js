import http from './http'

function getNossoNumero(callback) {
	http.fetch('financeiro/recebiveis/lancamento/nosso_numero1/', handleNossoNumero.bind(null, callback));
}

function handleNossoNumero(callback, result) {
	callback(result.nosso_numero);
}

function gravarTarefa(tarefa, callback) {
	http.post('financeiro/recebiveis/lancamento', tarefa, callback);
}

export default {
	nosso_numero: getNossoNumero,
	concluir: gravarTarefa
}