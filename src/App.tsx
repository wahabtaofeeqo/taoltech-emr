import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './LandingPage/Layout';
import Home from './LandingPage/component/Home';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
