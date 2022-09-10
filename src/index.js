// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import App from './App'

// const container = document.getElementById('root')!
// const root = createRoot(container)
const root = ReactDOM.createRoot(document.getElementById('root'));

// let persistor = persistStore(store)

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
}

root.render(
  <Provider store={store}>
      <App />
  </Provider>
)