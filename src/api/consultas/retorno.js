import http from './../http'

function get(callback) {
	http.fetch('consultas/retorno/', callback);
}

export default {
	get: get
}