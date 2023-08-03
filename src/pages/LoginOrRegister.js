import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

const validateInput = Yup.object({
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email address invalid'),
    password: Yup.string()
        .min(6, 'Password is too short! Please use at least 6 characters.')
        .max(8, 'Password is too long! Please use at most 8 characters.')
})

export default function LoginOrRegister({props}) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(props);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validateInput,
        onSubmit: values => {
            console(values)
        },
    });

    const handleChange = (e) => {
        const { name } = e.target;
        formik.setFieldTouched(name, true, false);
        formik.handleChange(e);
    }

    const handleChangeStatus = () => {
        setIsLogin(!isLogin)
    }
    const handeSubmit = () => {
        if (isLogin) {
            //call API login
        } else {
            // call API register
        }
    }
    return (
        <>
            <div className="relative">
                <div className="bg-darkgreen h-[312px]">
                    <img src="../logo.png" className=" object-cover w-[230px] h-[230px] mx-auto" alt="logo" />
                </div>
                <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 max-w-[670px]">
                    <div className="shadow-md bg-white rounded-[20px] px-10 pt-[34px] pb-10">
                        <div className="form-title-text">
                            <span>{isLogin ? 'Log In' : 'Register'}</span>
                        </div>
                        <div className="flex item-start">
                            <div className="social">
                                <div className="mb-[18px]">
                                    <span className="text-slate-500">Using social networking accounts</span>
                                </div>
                                <div className="flex flex-col gap-[18px] w-[275px]">
                                    <button type="button" className="pl-4 border-2 group border-rose-400 rounded-lg py-2 text-rose-400 font-bold hover:bg-rose-400 hover:text-white text-left">
                                        <div className="flex items-center">
                                            <svg className="mr-4 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                                <path fill="#fbc02d" className="group-hover:fill-white" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                <path fill="#e53935" className="group-hover:fill-white" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                                <path fill="#4caf50" className="group-hover:fill-white" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                                <path fill="#1565c0" className="group-hover:fill-white" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                            </svg>
                                            Connect with google
                                        </div>
                                    </button>
                                    <button type="button" className=" pl-4 border-2 group border-blue-500 rounded-lg py-2 text-blue-500 font-bold hover:bg-blue-500 hover:text-white text-left">
                                        <div className=" flex items-center">
                                            <svg className="mr-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                                <path fill="#3F51B5" className="group-hover:fill-white" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
                                                <path fill="#ffffff" className="group-hover:fill-lightblue" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                                            </svg>
                                            Connect with facebook
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="mb-[18px]">
                                    <span className="pl-[14px] text-slate-500">Using Money Lover accounts</span>
                                </div>
                                <form className="border-l-2 border-slate-500 mb-4 pl-[14px]" onSubmit={formik.handeSubmit}>
                                    <div className="mb-[18px]">
                                        <input onChange={handleChange} type="email" name="email" value={formik.values.email} placeholder="Email" className="p-4 w-[275px] py-[10px] bg-neutral-100 rounded-lg focus:outline-green-400" required />
                                        {formik.touched.email && formik.errors.email ? (<p className="text-red-500 text-xs mt-3">{formik.errors.email}</p>) : null}
                                    </div>
                                    <div className="mb-[18px]">
                                        <input onChange={handleChange} type="password" placeholder="Password" name="password" value={formik.values.password} className="p-4 w-[275px] py-[10px] bg-neutral-100 rounded-lg focus:outline-green-400" required />
                                        {formik.touched.password && formik.errors.password ? (<p className="text-red-500 text-xs mt-3">{formik.errors.password}</p>) : null}
                                    </div>
                                    <div className="text-right mb-4 mt-2 h-4">
                                        {isLogin ? <span className="text-lightgreen font-semibold">Forgot Password?</span> : <span></span>}
                                    </div>
                                    <button type="submit" className="bg-normalgreen uppercase w-full font-semibold text-white rounded-lg py-[6px]">Login</button>
                                </form>
                                <div className="text-center">
                                    <span className="mr-2">{isLogin ? "Don't have" : "Have "} an account?</span>
                                    <span className="underline text-lightgreen hover:text-green-600"><Link to={isLogin ? '/register' : '/login'} className="underline" onClick={handleChangeStatus}>{isLogin ? "Register" : "Sign In"}</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}