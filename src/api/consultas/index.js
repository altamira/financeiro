import lancamentos from './lancamento'
import cobrancas from './cobranca'
import remessas from './retorno'
import retornos from './retorno'

import http from './../http'

function list(perfil, callback) {
	http.fetch('consultas/?perfil=' + perfil, callback);
}

export default {
	list: list,

	lancamentos: lancamentos,
	cobrancas: cobrancas,
	remessas: remessas,
	retornos: retornos
}
