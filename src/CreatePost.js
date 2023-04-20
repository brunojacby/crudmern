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

    const createPost = (e) => {
        e.preventDefault();

        axios
            .post("/create", post)
            .then((res) => console.log(res))
            .catch();

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
                    /> 
                    <Form.Control 
                        name="description" 
                        value={post.description}
                        placeholder="Description" 
                        style={{marginBottom: "1rem"}}
                        onChange={handleChange}                        
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
                onClick={()=> navigate("posts")}
            >
                ALL POSTS
            </Button>
        </div>
    )
}

export default CreatePost