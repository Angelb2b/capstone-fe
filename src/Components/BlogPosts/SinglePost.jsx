import '../BlogPosts/SinglePost.css'; 
import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from '../../Store/blogPostsSlice';
import { useSession } from '../../middlewares/ProtectedRoutes';

const SinglePost = ({ post }) => {
  const actualTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deletePost(post._id))
      .then(() => {
        navigate(window.location.pathname);
      })
      .catch((error) => {
        console.error('Errore durante la cancellazione del post:', error);
      });
  };

  const isBelardoAng = session && session.email === 'belardo.ang@gmail.com';
  const isModeratorOrAuthor = isBelardoAng;

  return (
    <div className="text-center">
      <Card
        style={{ width: '20rem', textDecoration: 'none' }}
        className={`single-post ${actualTheme ? 'light-theme' : 'dark-theme'}`}
      >
        <Card.Img
          style={{ height: '10rem', objectFit: 'cover' }}
          variant="top"
          src={post.cover}
        />
        <Card.Body style={{ maxHeight: '200px' }}>
          <Card.Title className="post-title">{post.title}</Card.Title>
          <Card.Text
            className="post-content"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.content}
          </Card.Text>
        </Card.Body>
        <Card.Body className="d-flex gap-3">
          <Card.Text>
            In: <em style={{ fontSize: '.8rem' }}>{post.category}</em>
          </Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between align-items-center">
          <Card.Title style={{ fontSize: '.8rem', margin: '0' }}>
            <Link>
              <img
                className="mx-1"
                src={post.author.avatar}
                style={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                }}
                alt="Author Avatar"
              />
              {post.author.name}
            </Link>
          </Card.Title>
          <div>
            <Link to={`/postDetails/${post._id}`}>
              <Button size="sm" variant="outline-info mx-2">
                See work!
              </Button>
            </Link>
            {isModeratorOrAuthor && (
              <Button
                size="sm"
                variant="outline-danger"
                onClick={handleDelete}
              >
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
