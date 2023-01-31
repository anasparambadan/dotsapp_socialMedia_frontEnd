import React from 'react'
import './postShare.css'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';



function PostShare() {
    const loading = useSelector((state)=>state.postReducer.uploading)
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const desc = useRef()
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    

    

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img)
            // console.log(image,'inamge set image')
        }

    }

    const reset = ()=>{
        setImage(null);
        desc.current.value=""
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
           
            // console.log(Date.now(),'datae now')
            // console.log(image.name,'image now')
            // console.log(filename,'fileName at postshare')
            // console.log(image,"image a t post model")
            // console.log(newPost,'new post at postshare')
            // console.log(data,'data at post share...')
            try {
                
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }

        dispatch(uploadPost(newPost))
        reset()

    }

    return (
        <div className='postShare'>
            <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
            <div>
                <input
                    ref={desc}
                    required
                    type="text" placeholder='new post here' />
                <div className="postOptions">
                    <div className="optons" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="optons" style={{ color: "var(--video)" }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="optons" style={{ color: "var(--location)" }}>
                        <UilLocationPoint />
                        Location
                    </div>
                   
                    <button className='button ps-button' onClick={handleSubmit} disabled={loading}>{loading?"Uploading":"Share"}</button>
                    <div style={{ display: "none" }}>
                        <input type="file" className='myImage' ref={imageRef} onChange={onImageChange} accept="image/x-png,image/gif,image/jpeg"/>
                    </div>

                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="post" />

                    </div>
                )}
            </div>
        </div>

    )
}

export default PostShare