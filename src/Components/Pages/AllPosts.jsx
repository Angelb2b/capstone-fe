import React from 'react'
import BlogPosts from '../BlogPosts/BlogPosts'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '../../App.css'

const AllPosts = () => {
  const actualTheme = useSelector(state => state.theme.theme)

  return (
    <div className={actualTheme ? 'light' : 'dark-theme'} >
      <Container className='pb-5'>
        <BlogPosts />
      </Container>
    </div>
  )
}

export default AllPosts
