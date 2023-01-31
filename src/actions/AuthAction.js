import * as AuthApi from '../api/AuthRequest.js'


export const logIn = (formData) => async (dispatch) => {
    console.log(formData,'formData at login auth actin..........')
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.logIn(formData)
        console.log(data,'dataat at authactin lgoin..................')
        dispatch({ type: "AUTH_SUCCESS", data: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: "AUTH_FAIL" })

    }
}
export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.signUp(formData)
        console.log(data,'data at auth action................')
        dispatch({ type: "AUTH_SUCCESS", data: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: "AUTH_FAIL" })

    }
}

export const otpVerification = (userId,otp) => async (dispatch)=>{
    console.log('jkjkjkjkkkkkkkkkkkkkkkk')

    dispatch({type:"OTP_START"})

    try {
        const { data } = await AuthApi.otpVerify(userId, otp)
        console.log(data, "data at authaction otp verification")
        dispatch({ type: "OTP_SUCCESS", data: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: "OTP_FAIL" })

    }
}

export const AdminLogIn = (formData) => async (dispatch) => {
    console.log(formData,'formD ata..........at adminlogin at auth action')
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.adminLogIn(formData)
        // console.log(data,'data at adminlgin authaction....................')
        dispatch({ type: "AUTH_SUCCESS", data: data })

    } catch (error) {
        console.log(error)  
        dispatch({ type: "AUTH_FAIL" })

    }
}
export const logOut = ()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
} 