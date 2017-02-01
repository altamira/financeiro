import http from './../http'

function getPedido(id, callback) {
	http.fetch('gpimac/pedido/' + id, callback);
}

export default {
	get: getPedido
}