import React from 'react'
import Prova from '../Prova/Prova'
import BlogPosts from '../BlogPosts/BlogPosts'
import Hero from '../Hero/Hero'
import { Container } from 'react-bootstrap'
import '../../App.css'
import { useSession } from '../../middlewares/ProtectedRoutes'


const Homepage = () => {

  const session = useSession()
  console.log(session)

  return (
    <div className='' >
      <Container className='pb-5'>
        <Hero />
        <BlogPosts />
      </Container>
      
    </div>
  )
}

export default Homepage
