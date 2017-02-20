import http from './http'

function getTarefa(id, callback) {
	http.fetch('tarefa/' + id, callback);
}

function getTarefas(usuario, callback) {
	http.fetch('tarefas/' + usuario, callback);
}

function postTarefa(tarefa, callback) {
	http.post('tarefa', tarefa, callback)
}

export default {
	get: getTarefa,
	save: postTarefa,
	list: getTarefas
}