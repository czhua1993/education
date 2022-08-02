import './styles/index.css'
import './styles/index.less'

import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'

import { Route } from './components-x/route'
import { ErrorBoundary } from './components/error-boundary'
import { routes } from './configs/routes'
import { client } from './graphql/client'
import { Layout } from './layout'
import { navigation } from './utils/navigation'

const App = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <HistoryRouter history={navigation.history}>
          <Layout />
        </HistoryRouter>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
