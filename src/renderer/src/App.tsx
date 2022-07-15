import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Header from './components/Header'
import Player from './components/Player'
import Search from './pages/search'

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className='h-screen overflow-hidden flex flex-col'>
          <Header />
          <main className='flex-grow overflow-hidden'>
            <Routes>
              <Route path="/" element={<Search />} />
            </Routes>
          </main>
          <footer className='flex-shrink h-10' >
            <Player />
          </footer>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
