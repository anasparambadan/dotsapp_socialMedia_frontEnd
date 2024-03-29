import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened,data }) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const dispatch = useDispatch()
  const param = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)
  
  const handeChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const onImageChange = (event)=>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profileImage"? setProfileImage(img):setCoverImage(img)
    }
  };



  const handleSubmit = (e)=>{
    e.preventDefault();
    let userData = formData;

    if(profileImage){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name
      data.append("name",fileName);
      data.append("file", profileImage)
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }

    }
    if(coverImage){
      const data = new FormData()
      const fileName = Date.now() + coverImage.name
      data.append("name",fileName);
      data.append("file", coverImage)
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id,userData))
    setModalOpened(false);
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
            onChange={handeChange}
            value = {formData.firstName}
          />

          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
            onChange={handeChange}
            value = {formData.lastName}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handeChange}
            value = {formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="LIves in"
            onChange={handeChange}
            value = {formData.livesIn}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handeChange}
            value = {formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name = "relationship"
            onChange={handeChange}
            value = {formData.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name="profileImage" onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange}/>
        </div>

        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;