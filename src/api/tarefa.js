import http from './http'

function getTarefa(id, callback) {
	http.fetch('tarefa/' + id, callback);
}

function getTarefas(perfil, callback) {
	http.fetch('tarefas?perfil=' + perfil, callback);
}

export default {
	get: getTarefa,
	list: getTarefas
}