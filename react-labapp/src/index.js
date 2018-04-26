import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 *  The app has a single route, but we use the route to define the
 *  course/semester pair (optional), the login screen can redirect back
 *  to this route.
 * https://stackoverflow.com/questions/35604617/react-router-with-optional-path-parameter
 */
ReactDOM.render((
            <Router>
              <Route
                path="/:course?/:semester?"
                component={App}/>
            </Router>
          ), document.getElementById('root'));



registerServiceWorker();
