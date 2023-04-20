import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function Posts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const[updatedPost, setUpdatedPost] = useState({
        id: "",
        title: "",
        description: "",
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios
        .get("/posts")
        .then((res) => {
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const deletePost = (id) => {
        axios.delete(`/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

        window.location.reload();
    };

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUpdatedPost(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    const saveUpdatedPost = () => {
        axios.put(`/update/${updatedPost._id}`, updatedPost)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        handleClose();
        window.location.reload();
    };

  return (
    <div style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
        <h1>Posts page</h1>  
        <Button
                    variant="outline-dark" 
                    style={{width:"100%", marginTop:"1rem", marginBottom: "1rem"}}
                    onClick={() => navigate(-1)}
                >
                    BACK
        </Button>   
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update a post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control 
                        style={{marginBottom: "1rem"}}
                        placeholder="Write a title..."
                        name="title"
                        value={updatedPost.title}
                        onChange={handleChange}
                        />
                        <Form.Control placeholder="Write a description..."
                        name="description"
                        value={updatedPost.description}
                        onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedPost}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>   
        {posts.length > 0 ? (
            <div>
                {posts.map((post, index) => {
                    return (
                        <div
                            key={post._id}
                            style={{
                                border: "solid lightgray 1px",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                                padding: "15px 10px"
                            }}  
                        >
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button 
                                    variant="outline-warning" 
                                    style={{width:"100%", marginRight: "1rem"}}
                                    onClick={() => updatePost(post)}
                                >
                                    UPDATE
                                </Button>
                                <Button 
                                    variant="outline-danger" 
                                    style={{width:"100%"}}
                                    onClick={() => deletePost(post._id)}
                                >
                                    DELETE
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
            ) : (
               ""
            )
        }
    </div>
  )
}

export default Posts;