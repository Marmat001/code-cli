import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux'
import { store } from './redux'
import UnitList from './components/unit-list'

import 'bulmaswatch/superhero/bulmaswatch.min.css'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <UnitList />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
