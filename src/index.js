import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';  // bootstrap css

import App from './App';
import Dashboard from './dashboard';
import Emissao from './recebiveis/emissao';

import Faturamento from './recebiveis/lancamento';

import Cobranca from './recebiveis/cobranca';
import Remessa from './recebiveis/remessa/';
import Retorno from './recebiveis/retorno';

import ContaCorrente from './contacorrente/index.js';

import UltimosPedidosLiberados from './recebiveis/lancamento/Search';
import UltimasCobrancas from './recebiveis/cobranca/Search';
import UltimasRemessas from './recebiveis/remessa/Search';
import UltimosRetornos from './recebiveis/retorno/Search';

const About = () =>
	<div>
		About
	</div>

const Users = () =>
	<div>
		Users
	</div>

const User = () =>
	<div>
		User
	</div>

const NoMatch = () =>
	<div>
		Formulário não encontrado !
	</div>

/*ReactDOM.render(
  <App />,
  document.getElementById('root')
);*/

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >

    	<Route path="recebiveis/emissao" component={Emissao}/>
      <Route path="recebiveis/lancamento/:id" component={Faturamento}/>
      <Route path="recebiveis/cobranca/:id" component={Cobranca}/>
      <Route path="recebiveis/remessa/:id" component={Remessa}/>
      <Route path="recebiveis/retorno/:id" component={Retorno}/>

      <Route path="contacorrente/" component={ContaCorrente}/>

      <Route path="consultas/dashboard" component={Dashboard}/>

      <Route path="consultas/lancamento/ultimos" component={UltimosPedidosLiberados}/>
      <Route path="consultas/cobranca/ultimos" component={UltimasCobrancas}/>
      <Route path="consultas/remessa/ultimos" component={UltimasRemessas}/>
      <Route path="consultas/retorno/ultimos" component={UltimosRetornos}/>

      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))
