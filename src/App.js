import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import UserScreen from './Screens/UserScreen'
import Header from './Components/Header'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' exact component={UserScreen} />
          <Route path='/page/:pageNumber' component={UserScreen} exact />
          <Route path='/search/:keyword' component={UserScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={UserScreen}
            exact
          />
        </Container>
      </main>
    </Router>
  )
}

export default App
