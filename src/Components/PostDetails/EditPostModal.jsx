import React, { useState } from 'react'; 
import { Button, Modal, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux'; 
import { updateBlogPost } from '../../Store/blogPostsSlice';
import { useSession } from '../../middlewares/ProtectedRoutes';

const EditPostModal = ({ close, post }) => {
  const dispatch = useDispatch();
  const session = useSession();

  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [empty, setEmpty] = useState(false);

  const updatePost = async (e) => {
    e.preventDefault();

    if (category && title && content) {
      const updatedPost = {
        ...post,
        category,
        title,
        content,
      };

      dispatch(updateBlogPost(updatedPost))
        .then(() => close())
        .catch((error) => {
          console.error('Error updating post:', error);
        });
    } else {
      setEmpty(true);
    }
  };

  return (
    <>
      {session && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <Modal.Dialog centered size="lg" backdrop="static">
            <Modal.Header>
              <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={updatePost}>
                <div className="my-2">
                  <input
                    style={{ borderRadius: '5px' }}
                    placeholder="Category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <input
                    style={{ borderRadius: '5px' }}
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <FloatingLabel controlId="floatingTextarea2" label="Post">
                  <Form.Control
                    as="textarea"
                    placeholder="Post content"
                    style={{ height: '100px' }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </FloatingLabel>

                <Modal.Footer>
                  <Button variant="outline-dark" onClick={close}>
                    Close
                  </Button>
                  <Button variant="outline-info" type="submit">
                    Update
                  </Button>
                </Modal.Footer>
              </form>
              {empty && (
                <Alert key="danger" variant="danger">
                  All fields must be filled out!
                </Alert>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
};

export default EditPostModal;
