import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layouts/layout';
import Index from './module/index/Index';
import Resource from './module/doctor/resource';

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='' element={<Index />} />
          <Route path="/dashboard" element={<Layout />}>
            {/* Inner routes should be here */}
            <Route path='resource' element={<Resource />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
