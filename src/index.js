import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';  // bootstrap css

import App from './App';
import Dashboard from './dashboard';
import Emissao from './duplicata/emissao';
import Faturamento from './duplicata/faturamento';
import Cobranca from './duplicata/cobranca';
import Remessa from './duplicata/remessa';
import Retorno from './duplicata/retorno';

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
		NoMatch
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
    <Route path="/" component={App}>
      
    	<Route path="duplicata/emissao/avulsa" component={Emissao}/>
      <Route path="duplicata/faturamento/:id" component={Faturamento}/>
      <Route path="duplicata/cobranca/:id" component={Cobranca}/>
      <Route path="duplicata/remessa/:id" component={Remessa}/>
      <Route path="duplicata/retorno/:id" component={Retorno}/>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))
