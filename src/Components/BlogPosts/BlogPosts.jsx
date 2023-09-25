import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import '../BlogPosts/SinglePost.css'
import { useDispatch, useSelector } from 'react-redux';
import { postBlogPosts, getBlogPosts } from '../../Store/blogPostsSlice';
import SinglePost from './SinglePost';
import { Container, Row, Col, Button, Modal, Alert } from 'react-bootstrap';
import AddPostModal from '../AddPostModal/AddPostModal';
import { useSession } from '../../middlewares/ProtectedRoutes';

const BlogPosts = () => {
    const session = useSession();
    const isModerator = session && session.role === 'moderator';
    const isBelardoAng = session && session.email === 'belardo.ang@gmail.com';

    const [modalOpen, setModalOpen] = useState(false);
    function toggleModalOpen() {
        setModalOpen(!modalOpen);
    }

    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.blogPosts);

    useEffect(() => {
        dispatch(getBlogPosts());
    }, []);

    const handleCreatePost = (newPost) => {
        dispatch(postBlogPosts(newPost))
            .then((response) => {
                if (response.payload) {
                    toggleModalOpen();
                }
            })
            .catch((error) => {
                console.error('Errore durante la creazione del post:', error);
            });
    };

    return (
        <>  
            {isModerator || isBelardoAng ? (
                <Container className='d-flex justify-content-center mb-5 mt-3' style={{ width: '100%' }}>
                    <Button
                        className='text-center'
                        variant="outline-info"
                        onClick={() => toggleModalOpen()}>
                        New Post
                    </Button>
                </Container>
            ) : (
                <div className='mx-5'>
                    <br />
                    <br />
                </div>
            )}

            {allPosts.status === 'pending' && (<div>Loading...</div>)}
            {allPosts.status === 'error' && (<div>Something went wrong...</div>)}
            {allPosts.searchStatus === '404' && (
                <Alert key='danger' variant='danger'>
                    No results found!
                </Alert>)}
            {allPosts.searchStatus === 'loading' && (<div>Loading...</div>)}
            {allPosts.searchStatus === 'error' && (<div>Something went wrong...</div>)}

            {allPosts.posts && (
                <Container fluid className='d-flex justify-content-center'>
                    <Row className='g-4 mx-auto' key={nanoid()}>
                        {allPosts.posts && allPosts.posts.map((post) => {
                            return (
                                <Col className='d-flex justify-content-center' key={post._id}>
                                    <SinglePost post={post} />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            )}

            {modalOpen && (<AddPostModal close={toggleModalOpen} createPost={handleCreatePost} />)}
        </>
    );
}

export default BlogPosts;
