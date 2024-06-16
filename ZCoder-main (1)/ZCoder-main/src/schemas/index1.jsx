import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    age: Yup.number().min(0).max(100).required("Please enter your age"),
    score: Yup.number().min(0).max(5000).required("Please enter your CP Score"),
    github: Yup.string().url().required("Please enter your Github Link")
})