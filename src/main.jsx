import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import loader from '../src/Components/Loader/Loader.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
            <PersistGate loading={loader} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
  </StrictMode>,
)
