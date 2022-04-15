import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
    video_id: "",
    text: "",
    likes: "",
    dislikes: "",
};

const AddMusicPage = () => {
    const [user,token] = useAuth()
    const navigate = useNavigate()
    const [formData,handleInputChange,handleSubmit] = useCustomForm(initialValues, postNewVideo)

    async function postNewVideo(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/comments/", formData, {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error.message)
            
        }
    }

    return(
        <div className="container">
            <h2>{user.username}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Video_Id:{" "}
                    <input
                    type="text"
                    name="video_id"
                    value={formData.video_id}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Text:{" "}
                    <input
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Likes:{" "}
                    <input
                    type="text"
                    name="likes"
                    value={formData.likes}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    DisLikes:{" "}
                    <input
                    type="text"
                    name="dislikes"
                    value={formData.dislikes}
                    onChange={handleInputChange}
                    />
                </label>
                <button> Add Video!</button>
            </form>
        </div>
    )
}

export default AddMusicPage