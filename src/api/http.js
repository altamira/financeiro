import axios from 'axios';

let host = 'http://' + window.location.hostname + ':1880/api/'

function fetch(url, callback, error) {
	if (!callback) {
		window.errHandler && window.errHandler({mensagem: 'API: função de callback não foi definida !'})
		return;	
	} 

	axios
	.get(host + url)
	.then( response => {
		callback ? callback(response.data) : window.errHandler && window.errHandler({mensagem: 'API: função de callback não foi definida !'})
	})
	.catch( err => {
		console.log('Error: ' + JSON.stringify(err, null, 2))
		error ? error(err) : window.errHandler && window.errHandler(err)
	})
}

function post(url, data, callback, error) {
	axios
	.post(host + url, data)
	.then( response => {
		callback ? callback(response.data) : window.errHandler && window.errHandler({mensagem: 'API: função de callback não foi definida !'})
	})
	.catch( err => {
		console.log('Error: ' + JSON.stringify(err, null, 2))
		error ? error(err) : window.errHandler && window.errHandler(err)
	})
}

function put(url, data, callback, error) {
	axios
	.put(host + url, data)
	.then( response => {
		callback ? callback(response.data) : window.errHandler && window.errHandler({mensagem: 'API: função de callback não foi definida !'})
	})
	.catch( err => {
		console.log('Error: ' + JSON.stringify(err, null, 2))
		error ? error(err) : window.errHandler && window.errHandler(err)
	})
}

function patch(url, data, callback, error) {
	axios
	.patch(host + url, data)
	.then( response => {
		callback ? callback(response.data) : window.errHandler && window.errHandler({mensagem: 'API: função de callback não foi definida !'})
	})
	.catch( err => {
		console.log('Error: ' + JSON.stringify(err, null, 2))
		error ? error(err) : window.errHandler && window.errHandler(err)
	})
}

function del(url, callback, error) {
	axios
	.delete(host + url)
	.then( response => {
		callback ? callback(response.data) : window.errHandler && window.errHandler({mensagem: 'API: função de callback não foi definida !'})
	})
	.catch( err => {
		console.log('Error: ' + JSON.stringify(err, null, 2))
		error ? error(err) : window.errHandler && window.errHandler(err)
	})
}

export default {
	fetch: fetch,
	post: post,
	put: put,
	patch: patch,
	delete: del
};
