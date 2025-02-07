import React from 'react'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'
import Companies from '../../components/student/Companies'
import CourseSection from '../../components/student/CourseSection'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <SearchBar />
      <Companies />
      <CourseSection />
    </div>
  )
}

export default Home
