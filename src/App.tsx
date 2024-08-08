import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layouts/layout';
import Index from './module/index/Index';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Index />} />
          <Route path="/dashboatd" element={<Layout />}>
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
