import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { UserService } from "../services/user.service";
import { useDispatch } from "react-redux";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../redux/authSlice";
import { WalletService } from "../services/wallet.service";
import LoginWithGoogle from "./LoginWithGg";


const validateInput = Yup.object({
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email address invalid'),
    password: Yup.string()
        .min(6, 'Password is too short! Please use at least 6 characters.')
        .max(8, 'Password is too long! Please use at most 8 characters.')
})

export default function LoginOrRegister({ props }) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(props);
    const [checkValidUser, setCheckValidUser] = useState(true);
    const [checkValidRegister, setCheckValidRegister] = useState(true);
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validateInput,
        onSubmit: values => {
            if (isLogin) {
                //Login
                dispatch(loginStart())
                UserService.checkUserLogin(values).then(res => {
                    let userLogin = res.data.user;
                    if (userLogin) {
                        dispatch(loginSuccess(userLogin));
                        WalletService.getAllWallet(userLogin.id).then(res => {
                            let walletList = res.data.walletList;
                            walletList.length > 0 ? navigate('/') : navigate('/my-wallets');
                        })
                    } else {
                        setCheckValidUser(false);
                    }
                }).catch(err => {
                    dispatch(loginFailed());
                    console.log(err.message);
                })

            } else {
                //Register
                dispatch(registerStart());
                UserService.createUser(values).then((res) => {
                    let newUser = res.data.newUser;
                    if (newUser) {
                        dispatch(registerSuccess())
                        setIsLogin(true);
                        navigate("/login");
                    } else {
                        setCheckValidRegister(false);
                    }
                }).catch(err => {
                    dispatch(registerFailed());
                    console.log(err.message)
                })
            }
            formik.resetForm()
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

    useEffect(() => {
        // Xử lý sự kiện click bất kỳ đâu ở background
        const handleClickOutside = (event) => {
            const errorMessageLogin = document.getElementById("errorMessageLogin");
            const errorMessageRegister = document.getElementById("errorMessageRegister");
            if (errorMessageLogin && !errorMessageLogin.contains(event.target)) {
                setCheckValidUser(true);
            }
            if (errorMessageRegister && !errorMessageRegister.contains(event.target)) {
                setCheckValidRegister(true);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="relative">
                <div className="bg-darkgreen h-[312px]">
                    <img src="../logo.png" className=" object-cover w-[230px] h-[230px] mx-auto" alt="logo" />
                </div>
                <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2">
                    <div id="wrapper" className="shadow-md bg-white rounded-[20px] px-10 pt-[34px] pb-10">
                        <div className="form-title-text">
                            <span>{isLogin ? 'Log In' : 'Register'}</span>
                        </div>
                        <div className="flex item-start">
                            <div className="social">
                                <div className="mb-[18px]">
                                    <span className="text-slate-500">Using social networking accounts</span>
                                </div>
                                <div className="flex flex-col gap-[18px] min-w-[275px]">
                                            <LoginWithGoogle/>
                                    <button type="button" className=" pl-4 border-2 group border-blue-500 rounded-lg py-2 text-blue-500 font-bold hover:bg-blue-500 hover:text-white text-left">
                                        <div className=" flex items-center">
                                            <svg className="mr-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                                <path fill="#3F51B5" className="group-hover:fill-white" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
                                                <path fill="#ffffff" className="group-hover:fill-lightblue" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                                            </svg>
                                            Login with Facebook
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="mb-[18px]">
                                    <span className="pl-[14px] text-slate-500">Using Money Lover accounts</span>
                                </div>
                                <form method="post" className="border-l-2 border-slate-500 mb-4 pl-[14px]" onSubmit={formik.handleSubmit}>
                                    <div className="mb-[18px]">
                                        <input onChange={handleChange} type="email" name="email" value={formik.values.email} placeholder="Email" className="min-w-[275px] p-4 w-full py-[10px] bg-neutral-100 rounded-lg focus:outline-green-400" required />
                                        {formik.touched.email && formik.errors.email ? (<p className="text-red-500 text-xs mt-3">{formik.errors.email}</p>) : null}
                                    </div>
                                    <div className="mb-[18px]">
                                        <input onChange={handleChange} type="password" placeholder="Password" name="password" value={formik.values.password} className="p-4 w-full py-[10px] bg-neutral-100 rounded-lg focus:outline-green-400" required />
                                        {formik.touched.password && formik.errors.password ? (<p className="text-red-500 text-xs mt-3">{formik.errors.password}</p>) : null}
                                    </div>
                                    <div className="text-right mb-4 mt-2 h-4">
                                        {isLogin ? <span className="text-lightgreen font-semibold">Forgot Password?</span> : <span></span>}
                                    </div>
                                    <button type="submit" className="bg-normalgreen uppercase w-full font-semibold text-white rounded-lg py-[6px]">{isLogin ? "Log In" : "Register"}</button>
                                </form>
                                <div className="text-center">
                                    <span className="mr-2">{isLogin ? "Don't have" : "Have "} an account?</span>
                                    <span className="underline text-lightgreen hover:text-green-600"><Link to={isLogin ? '/register' : '/login'} className="underline" onClick={handleChangeStatus}>{isLogin ? "Register" : "Sign In"}</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(!checkValidUser && isLogin) ? <div id="errorMessageLogin" className="mx-auto text-center bg-black text-amber-50 mt-12 rounded shadow-md px-8 py-3 w-max">Invalid email/password combination. Please try again.</div> : null}
                    {(!checkValidRegister && !isLogin) ? <div id="errorMessageRegister" className="mx-auto text-center bg-black text-amber-50 mt-12 rounded shadow-md px-8 py-3 w-max">Email already exist. Please try again.</div> : null}
                </div>
            </div>
        </>
    )
}