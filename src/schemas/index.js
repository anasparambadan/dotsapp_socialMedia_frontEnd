import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your First name"),
    lastName: Yup.string().min(1).max(25).required("Please enter your Last name"),
    userName: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
    confirmpass: Yup.string().required().oneOf([Yup.ref('password'), null], "Password Must match")
})
export const  loginSchema = Yup.object({
    userName:Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
})