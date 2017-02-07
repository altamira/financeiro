import http from './../http'

function get(callback) {
	http.fetch('consultas/remessa/', callback);
}

export default {
	get: get
}