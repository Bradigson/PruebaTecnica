import { useAppDispatch } from "../redux/Store"
import axios from 'axios';
import {useState} from 'react';
import { AseguradoratypeInterface } from "../redux/Models";
import { responseCreateInterface } from "../redux/Models";
import validator from 'validator';
import '../assets/styles/Form.scss';
import { createdAseguradora } from "./alerts/Alerts";
import {useNavigate} from 'react-router-dom'



const Form = ()=>{
    
    const [stado, setStado] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [create, setCreate] = useState<AseguradoratypeInterface>({
        id : 1,
        nombre : "",
        comision : 0,
        stado: stado
    });
    const [loading, setLoadin] = useState<boolean>(false);
    const [response, setResponse] = useState<responseCreateInterface>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();


    const handleNombre = (e:any)=>{
        setCreate({
            ...create,
            [e.target.name]:e.target.value
        })
    }   

    const handleComision = (e:any)=>{

        setCreate({
            ...create,
            [e.target.name]:e.target.value
        })
    }   

    const handleEstado = ()=>{
        setStado(!stado);
    }
    const handleSubmit = (e:any)=>{
        e.preventDefault();
        
        if(validator.isEmpty(create.nombre)){
            setErrorMessage("debe de ingresar un nombre");
        }else{
            setLoadin(true);
            const options = {
                method: 'POST',
                url: 'https://www.apiaseguradora.somee.com/api/Aseguradora/create',
                headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJCcmFkaWdzb24iLCJuYmYiOjE2NzgwMjM4MzgsImV4cCI6MTY3ODExMDIzOCwiaWF0IjoxNjc4MDIzODM4fQ.cYBBh7to9yI4qTRoHX_VvHdSxN3Dghd_M0oFVsickQY'
                },
                data: {nombre: create.nombre, comision: create.comision, estado: stado}
            };
            
            axios.request(options).then(function (response) {
                setResponse(response.data);
                setLoadin(false);
                createdAseguradora(create.nombre);
                setCreate({
                    id:0,
                    nombre : "",
                    comision : 0,
                    stado:false
                });
                setStado(!false);
            }).catch(function (error) {
                console.error(error);
                setLoadin(false);
                setErrorMessage(error);
            });
                
            }
            


    }

    //console.log(response?.messate);


    const handleClear = ()=>{
        setErrorMessage("");
    }


    const handleGoBack = ()=>{
        navigate("/home");
    }
    return(
        <div className="form-create">
                <form>
                    <div className="">
                        <label htmlFor="inputEmail4" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="inputEmail4" name="nombre" value={create.nombre} onChange={handleNombre} onClick={()=> handleClear()}/>
                    </div>
                    <div className="">
                        <label htmlFor="inputPassword4" className="form-label">Comision</label>
                        <input type="number" className="form-control" id="inputPassword4" name="comision" value={create.comision} onChange={handleComision}/>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" defaultChecked={stado} onChange={handleEstado}/>
                        <label className="form-check-label" htmlFor="gridCheck">
                            Estado
                        </label>
                    </div>
                    <div className="form-create_button">
                        {
                            loading == true? (
                                <button onClick={handleSubmit} className="button-loading">
                                    <div> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></div>
                                    <div className="loading-name">Loaing...</div>
                                </button>
                                
                            ):(<button onClick={handleSubmit}>CREAR</button>)
                        }
                    </div>
                    <div className="text-center text-danger">
                            {errorMessage}
                    </div>
                </form>


                <button onClick={()=> handleGoBack()} className="button-go-back"><i className='bx bx-arrow-back'></i></button>
        </div>
    )
}


export default Form