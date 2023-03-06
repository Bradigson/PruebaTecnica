import { login } from "./alerts/Alerts";
import '../assets/styles/Login.scss';
import { logininterfaceCreate, logininterfaceResponse} from "../redux/Models";
import {useState} from 'react';
import validator from "validator";
import { loginCreateAseguradora } from "../services/Edit";
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
    const [loginCreate, setLoginCreate] = useState<logininterfaceCreate>({
        name: "",
        password:""
    });
    const [loginResponse, setLoginResponse] = useState<logininterfaceResponse>({
        msg:"",
        token:""
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    const handleName = (e:any)=>{
        setLoginCreate({
            ...loginCreate,
            [e.target.name]:e.target.value
        })
    }

    const handlePassword = (e:any)=>{
        setLoginCreate({
            ...loginCreate,
            [e.target.name]:e.target.value
        })
    }
    

    const handleLogin = async(e:any)=>{
        e.preventDefault();
        if(validator.isEmpty(loginCreate.name)){
            setErrorMessage("Debe de ingresar su usuario");
        }else if(validator.isEmpty(loginCreate.password)){
            setErrorMessage("Debe de ingresar su contraseñas");
        }else{
            await loginCreateAseguradora(setLoginResponse, loginCreate.name, loginCreate.password);
            login(loginCreate.name);
            setLoginCreate({
                name: "",
                password:""
            });
            localStorage.setItem("token", loginResponse.token);
            navigate("/home");
        }
    }



    const handleClear = ()=>{
        setErrorMessage("");
    }
    console.log(loginResponse.token);
    return(
        <div className="login">
            <form className="login_form">
                <div className="login-form_title">
                    LOG IN
                </div>
                <div>
                    <input type="text" className="form-control" placeholder="Username" name="name" value={loginCreate.name} onChange={handleName} onClick={()=> handleClear()}/>
                </div>
                <div>
                    <input type="text" className="form-control" placeholder="password" name="password" value={loginCreate.password} onChange={handlePassword} onClick={()=> handleClear()}/>
                </div>
                <div className="login-form_button">
                    <button onClick={(e)=> handleLogin(e)}>LOGGIN</button>
                </div>
                <div className="text-center text-danger">
                    {errorMessage}
                </div>
            </form>
        </div>
    )
}


export default Login;