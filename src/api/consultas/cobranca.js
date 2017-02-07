import http from './../http'

function get(callback) {
	http.fetch('consultas/cobranca/', callback);
}

export default {
	get: get
}