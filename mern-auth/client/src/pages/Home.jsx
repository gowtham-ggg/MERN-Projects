import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div
  style={{
    backgroundImage: `url('/bg_img.png')`,
  }}
  className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
>
  <NavBar />
  <Header />
</div>

  )
}

export default Home
