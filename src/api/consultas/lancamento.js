import http from './../http'

function get(callback) {
	http.fetch('consulta/lancamento', callback);
}

export default {
	get: get
}