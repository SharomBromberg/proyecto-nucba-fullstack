import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { GlobalStyles } from './styles/GlobalStyles'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<GlobalStyles />
			<HashRouter>
				<App />
			</HashRouter>
		</PersistGate>
	</Provider>
)
