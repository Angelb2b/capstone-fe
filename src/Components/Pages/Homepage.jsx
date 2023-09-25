import React from 'react'
import BlogPosts from '../BlogPosts/BlogPosts'
import Hero from '../Hero/Hero'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '../../App.css'

const Homepage = () => {
  const actualTheme = useSelector(state => state.theme.theme)

  return (
    <div className={actualTheme ? 'light' : 'dark-theme'} >
      <Container className='pb-5'>
        <Hero />
        <BlogPosts />
      </Container>
    </div>
  )
}

export default Homepage
