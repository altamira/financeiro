import lancamentos from './lancamento'
import cobrancas from './cobranca'
import remessas from './retorno'
import retornos from './retorno'

import http from './../http'

function list(id, callback) {
	http.fetch('consultas/' + id, callback);
}

export default {
	list: list,

	lancamentos: lancamentos,
	cobrancas: cobrancas,
	remessas: remessas,
	retornos: retornos
}
