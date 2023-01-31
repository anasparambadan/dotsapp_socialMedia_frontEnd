// import { Modal, useMantineTheme } from "@mantine/core";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { uploadImage } from "../../actions/uploadAction";
// import { updateUser } from "../../actions/userAction";


// function ProfileModal({ modalOpened, setModalOpened,data }) {
//   const theme = useMantineTheme();
//   const {password, ...other} = data;
//   const [formData, setFormData] = useState(other)
//   const [profileImage, setProfileImage] = useState(null)
//   const [coverImage, setCoverImage] = useState(null)
//   const dispatch = useDispatch()
//   const param = useParams()
//   const {user} = useSelector((state)=>state.authReducer.authData)
//   console.log(formData,'form data at profilemodallll.......')

//   const { register, handleSubmit, formState:{errors} } = useForm();
//   console.log(errors,'error')

//   const onSubmit = (data) => {
//     console.log(data);
//   }



//   const handeChange = (e)=>{
//     setFormData({...formData, [e.target.name]: e.target.value})
//   }

//   const onImageChange = (event)=>{
//     if(event.target.files && event.target.files[0]){
//       let img = event.target.files[0];
//       event.target.name === "profileImage"? setProfileImage(img):setCoverImage(img)
//     }
//   };

//   const handleSubmits = (e)=>{
//     e.preventDefault();
//     let userData = formData;
//     if(profileImage){
//       const data = new FormData();
//       const fileName = Date.now() + profileImage.name
//       data.append("name",fileName);
//       data.append("file", profileImage)
//       userData.profilePicture = fileName;
//       try {
//         dispatch(uploadImage(data));
//       } catch (error) {
//         console.log(error)
//       }

//     }
//     if(coverImage){
//       const data = new FormData()
//       const fileName = Date.now() + coverImage.name
//       data.append("name",fileName);
//       data.append("file", coverImage)
//       userData.coverPicture = fileName;
//       try {
//         dispatch(uploadImage(data));
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     dispatch(updateUser(param.id,userData))
//     setModalOpened(false);
//   }


//   return (
//     <Modal
//       overlayColor={
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[9]
//           : theme.colors.gray[2]
//       }
//       overlayOpacity={0.55}
//       overlayBlur={3}
//       size="55%"
//       opened={modalOpened}
//       onClose={() => setModalOpened(false)}
//     >
//       <form className="infoForm" onSubmit={handleSubmit((data)=>{
//         console.log(data,'data at form modal')
//       })}>
//         <h3>Your info</h3>

//         <div>
//           {/* <input
//             type="text"
//             className="infoInput"
//             name="firstName"
//             placeholder="First Name"
//             onChange={handeChange}
//             value = {formData.firstName}

//           /> */}


//           <input
//             type="text"
//             className="infoInput"
//             name="lastName"
//             placeholder="Last Name"
//             onChange={handeChange}
//             value = {formData.lastName}
//             {...register("formData.lastName",{required:"this is required"})}
//           />
//         </div>

//         {/* <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="worksAt"
//             placeholder="Works at"
//             onChange={handeChange}
//             value = {formData.worksAt}
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="livesIn"
//             placeholder="LIves in"
//             onChange={handeChange}
//             value = {formData.livesIn}
//           />

//           <input
//             type="text"
//             className="infoInput"
//             name="country"
//             placeholder="Country"
//             onChange={handeChange}
//             value = {formData.country}
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             placeholder="RelationShip Status"
//             name = "relationship"
//             onChange={handeChange}
//             value = {formData.relationship}
//           />
//         </div>


//         <div>
//             Profile Image 
//             <input type="file" name="profileImage" onChange={onImageChange}/>
//             Cover Image
//             <input type="file" name="coverImage" onChange={onImageChange}/>
//         </div> */}

//         <button className="button infoButton" type="submit" >Update</button>
//         {/* onClick={()=>handleSubmits} */}
//       </form>
//     </Modal>
//   );
// }

// export default ProfileModal;
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import { useFormik } from "formik"
import * as Yup from "yup"

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch()
  const param = useParams()
  const { user } = useSelector((state) => state.authReducer.authData)
  console.log(profileImage,'profileimg................')

  const formik = useFormik({
    initialValues: {
      firstName:formData.firstName, lastName:formData.lastName,worksAt:formData.worksAt, livesIn:formData.livesIn, relationship:formData.relationship, profileImage:profileImage, coverImage:coverImage
    },

   onSubmit:(values)=>{
    console.log(values)
    handleSubmits(values)
   },
    
    validationSchema: Yup.object({
     
      firstName: Yup.string().required("This field is required")
    })

  })


  // const handeChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img.name,'imgggg')
      event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img)
     
    }
  };

  const handleSubmits = (e) => {
    console.log(e,'eeeeat profilemodatlll')
    // e.preventDefault();
    let userData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name
      data.append("name", fileName);
      data.append("file", profileImage)
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }

    }
    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name
      data.append("name", fileName);
      data.append("file", coverImage)
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    console.log(userData, 'user data.............')
    dispatch(updateUser(param.id, userData))
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
      <form className="infoForm" onSubmit={formik.handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName?<p>{formik.errors.firstName}</p>:null}

          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            // onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={formik.handleChange}
            value={formik.values.worksAt}
            // onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={formik.handleChange}
            value={formik.values.livesIn}
            // onBlur={formik.handleBlur}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={formik.handleChange}
            value={formik.values.country}
            // onBlur={formik.handleBlur}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={formik.handleChange}
            value={formik.values.relationship}
            // onBlur={formik.handleBlur}
          />
        </div>


        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange}  value = {formik.values.profileImage}/>
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} value = {formik.values.coverImage}/>
        </div>

        <button className="button infoButton" type="submit">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;