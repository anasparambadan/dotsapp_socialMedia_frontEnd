import * as AuthApi from '../api/authRequest.js'


export const logIn = (formData) => async (dispatch) => {

    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.logIn(formData)
        console.log(data,'data............................')
        
    if(!data.success){
    
        dispatch({ type: "LOADING_FALSE" })
    }
    else{

       await dispatch({ type: "AUTH_SUCCESS", data: data })
    }
        return {message:data.message,success:data.success}
        
       

    } catch (error) {
        console.log(error)
        dispatch({ type: "AUTH_FAIL" })

    }
}
export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.signUp(formData)
 
        dispatch({ type: "AUTH_SUCCESS", data: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: "AUTH_FAIL" })

    }
}

export const otpVerification = (userId,otp) => async (dispatch)=>{


    dispatch({type:"OTP_START"})

    try {
        const { data } = await AuthApi.otpVerify(userId, otp)
    
        dispatch({ type: "OTP_SUCCESS", data: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: "OTP_FAIL" })

    }
}

export const AdminLogIn = (formData) => async (dispatch) => {

    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.adminLogIn(formData)
    
        dispatch({ type: "AUTH_SUCCESS", data: data })

    } catch (error) {
        console.log(error)  
        dispatch({ type: "AUTH_FAIL" })

    }
}
export const logOut = ()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
} 