import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Posts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
        .get("/posts")
        .then((res) => {
            console.log(res);
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

  return (
    <div style={{width:"90%", margin:"auto auto", textAlign:"center"}}>
        <h1>Posts page</h1>        
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
                <Button
                    variant="outline-dark" 
                    style={{width:"100%"}}
                    onClick={() => navigate(-1)}
                >
                    BACK
                </Button>
            )
        }
    </div>
  )
}

export default Posts;