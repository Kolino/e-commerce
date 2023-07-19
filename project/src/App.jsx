import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
