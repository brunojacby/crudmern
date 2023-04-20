import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios";

function CreatePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        description: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    function createPost (event) {
        event.preventDefault();

        axios
            .post("/create", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

       navigate("posts");
    };


    return (
        <div style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
            <h1>Create a post</h1>
            <Form>
                <Form.Group>
                    <Form.Control 
                        name="title" 
                        value={post.title}
                        placeholder="Title" 
                        style={{marginBottom: "1rem"}}
                        onChange={handleChange}
                        required
                    /> 
                    <Form.Control 
                        name="description" 
                        value={post.description}
                        placeholder="Description" 
                        style={{marginBottom: "1rem"}}
                        onChange={handleChange}
                        required
                    /> 
                </Form.Group>
                <Button 
                    variant="success"
                    style={{width:"100%", marginBottom: "1rem"}}
                    onClick={createPost}
                >
                    CREATE POST
                </Button>
            </Form>
            <Button 
                variant="outline-dark"
                style={{width:"100%"}}
                onClick={()=> navigate(-1)}
            >
                ALL POSTS
            </Button>
        </div>
    )
}

export default CreatePost