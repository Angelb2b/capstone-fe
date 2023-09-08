import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../Store/postsSlice';

const SinglePost = ({ post }) => {
  const actualTheme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };


  if (!post || !post.author || !post.author.avatar) {
    return null;
  }

  return (
    <div className="text-center">
      <Card
        style={{ width: '20rem', textDecoration: 'none' }}
        className={actualTheme ? 'single-post' : 'single-post dark-theme text-light'}
      >
        <Card.Img style={{ height: '10rem', objectFit: 'cover' }} variant="top" src={post.cover} />
        <Card.Body style={{ height: '115px' }}>
          <Card.Title className='post-title'>{post.title}</Card.Title>
          <Card.Text className='post-content'>{post.content}</Card.Text>
        </Card.Body>
        <Card.Body className='d-flex gap-3'>
          <Card.Text>In: &nbsp;<em style={{ fontSize: '.8rem' }}>{post.category}</em></Card.Text>
        </Card.Body>

        <Card.Footer className='d-flex justify-content-between align-items-center'>
          <Card.Title style={{ fontSize: '.8rem', margin: '0' }}>
            <Link> {/* to={`/author/${post.author.id}`} */}
              <img className='mx-1' src={post.author.avatar} style={{ width: '25px', height: '25px', borderRadius: '50%' }} alt="Author Avatar" />
              {post.author.name}
            </Link>
          </Card.Title>
          <div>
            <Link to={`/postDetails/${post._id}`}>
              <Button size='sm' variant="outline-info mx-2">See work!</Button>
            </Link>
            
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SinglePost;


/* import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../Store/postsSlice';

const SinglePost = ({ post }) => {
  const actualTheme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  // Check if the user is registered with the specific email
  const userEmail = 'belardo.ang@gmail.com';
  const currentUserEmail = useSelector(state => state.user.email);

  if (!post || !post.author || !post.author.avatar) {
    return null;
  }

  return (
    <div className="text-center">
      <Card
        style={{ width: '20rem', textDecoration: 'none' }}
        className={actualTheme ? 'single-post' : 'single-post dark-theme text-light'}
      >
        <Card.Img style={{ height: '10rem', objectFit: 'cover' }} variant="top" src={post.cover} />
        <Card.Body style={{ height: '115px' }}>
          <Card.Title className='post-title'>{post.title}</Card.Title>
          <Card.Text className='post-content'>{post.content}</Card.Text>
        </Card.Body>
        <Card.Body className='d-flex gap-3'>
          <Card.Text>In: &nbsp;<em style={{ fontSize: '.8rem' }}>{post.category}</em></Card.Text>
        </Card.Body>

        <Card.Footer className='d-flex justify-content-between align-items-center'>
          <Card.Title style={{ fontSize: '.8rem', margin: '0' }}>
            <Link> 
              <img className='mx-1' src={post.author.avatar} style={{ width: '25px', height: '25px', borderRadius: '50%' }} alt="Author Avatar" />
              {post.author.name}
            </Link>
          </Card.Title>
          <div>
            <Link to={`/postDetails/${post._id}`}>
              <Button size='sm' variant="outline-info mx-2">See work!</Button>
            </Link>
            {currentUserEmail === userEmail && (
              <Button size='sm' variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SinglePost;
 */
