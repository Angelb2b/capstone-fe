import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { blogPostById } from '../../Store/blogPostsSlice';
import Container from 'react-bootstrap/esm/Container';
import '../../App.css';
import { getCommentsByPostId } from '../../Store/commentsSlice';
import SingleComment from '../SingleComment/SingleComment';
import { Row, Col, Button } from 'react-bootstrap';
import NewCommentModal from './NewCommentModal';
import '../MyNav/MyNav.css';
import { saveAs } from "file-saver";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogPostById(id));
    dispatch(getCommentsByPostId(id));
  }, []);

  const [show, setShow] = useState(false);

  const singlePost = useSelector(state => state.blogPosts.singlePost.blogPostsById);
  const actualTheme = useSelector(state => state.theme.theme);
  const allComments = useSelector(state => state.comment.comments.blogComments);

  if (!singlePost || !singlePost.author || !singlePost.author.avatar) {
    return null;
  }

  const handleDownload = () => {
    saveAs(singlePost.cover, "image.jpg");
  };

  return (
    <>
      {singlePost && (
        <div className={actualTheme ? '' : 'dark-theme text-light'}>
          <Container>
            <div className='py-3 d-flex flex-column align-items-center'>
              <span className='my-2 Rowdies' style={{ fontSize: '2rem', textAlign: 'center' }}>
                {singlePost.title}
              </span>
              <img style={{ width: '70%', borderRadius: '50px' }} src={singlePost.cover} alt="" />
              <div className='d-flex justify-content-around align-center m-2' style={{ width: '70%' }}>
                <em>Di: {singlePost.author.name} {singlePost.author.surname}</em>
                <Button variant="outline-info btn-sm" onClick={handleDownload}>Download Image</Button>
              </div>
              <div className='my-4 Rowdies' style={{ width: '70%' }}>
                <h4 className='d-flex justify-content-center'>DESCRIZIONE</h4>
                {singlePost.content}
              </div>
            </div>
            <div className='text-center'>
              <NewCommentModal id={id} />
            </div>
            <div>
              <Row className='d-flex justify-content-center py-5 g-2'>
                {allComments &&
                  allComments.map(comment => (
                    <Col className='col-lg-6 col-sm-12' key={comment._id}>
                      <SingleComment comment={comment} postId={id} />
                    </Col>
                  ))}
              </Row>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default PostDetail;
