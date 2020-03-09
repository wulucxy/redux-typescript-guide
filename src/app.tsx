import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './store/create'
import CoreRouter from './router'
import './index.less'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <CoreRouter />
  </Provider>,
  document.getElementById('root'),
)
