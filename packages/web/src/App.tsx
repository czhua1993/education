import './styles/index.css'
import './styles/index.less'

import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'

import { Route } from './components-x/route'
import { ErrorBoundary } from './components/error-boundary'
import { routes } from './configs/routes'
import { navigation } from './utils/navigation'

const App = () => {
  return (
    <ErrorBoundary>
      <HistoryRouter history={navigation.history}>
        <Routes>{routes.map((item) => Route(item))}</Routes>
      </HistoryRouter>
    </ErrorBoundary>
  )
}

export default App
