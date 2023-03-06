import { useAppSelector, useAppDispatch } from "../redux/Store";
import { readAseguradora } from "../redux/Slice";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Models from '../redux/Models';
import '../assets/styles/Home.scss';
import {Link} from 'react-router-dom';
import { editAsguradora, deleteAsguradora } from "../services/Edit";
import { responseCreateInterface } from "../redux/Models";
import validator from "validator";
import { EditField } from "../redux/Models";
import { deleteAlert } from "./alerts/Alerts";

interface Aseguradoratype{
    id: number,
    nombre: string,
    comision : number,
    statdo : boolean 
}



interface Props{
    tokenURL : string
}

const Home = ()=>{

    const [state, setState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>();
    const aseguradora = useAppSelector(state=> state.aseguradora.aseguradora);
    const dispatch = useAppDispatch();
    const [token, setToken] = useState(tokenURL)
    const [actualName, setActualName] = useState<string>();
    const [actualId, setActualId] = useState<number>();
    const [actualComision, setActualComision] = useState<number>();
    const [editResponse, setEditResponse] = useState<responseCreateInterface>();
    const [deleteResponse, setDeleteResponse] = useState<responseCreateInterface>();
    const [fildName, setFildName] = useState<string>("");
    const [fildComision, setFildComision] = useState<number>(0);
    const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();
    

    useEffect(()=>{
        setLoading(!loading);
        axios("https://www.apiaseguradora.somee.com/api/Aseguradora",{
            headers:{
                Accept:'application/json',
                Authorization : `Bearer ${tokenURL}`
            }
        }).then(p=> dispatch(readAseguradora(p.data)))
        .catch(err=> console.log(err))
        setLoading(!loading);

        
    },[aseguradora])






    
    const handleEstado = ()=>{
        setState(!state);
    }

    const handleEdit = (id:number, name:string, comision:number)=>{
     
        setActualId(id);
        setActualName(name);
        setActualComision(comision);
        setState(false);
        
    }


    const handleEditFildName = (e:any):void=>{
       setFildName(e.target.value);
       setMessage("");

    }

    const handleEditFildComsion = (e:any):void=>{
        setFildComision(e.target.value);
        setMessage("");
    }

    const Edit = ()=>{


        if(validator.isEmpty(fildName)){
            setMessage("debe de ingresar un nuevo nombre");
        }else{
            setLoadingEdit(true);
            editAsguradora(setEditResponse, actualId, fildName, fildComision, state, token, setLoadingEdit);
            setFildName("");
            setFildComision(0);
            setMessage(editResponse?.messate);
            setActualName(fildName);
            setState(false);
        }
    }


    const handleClear = ()=>{
        setFildName("");
        setFildComision(0);
        setState(false);
    }




    
    const handleDelete = (id:any, name:string):void=>{
        deleteAsguradora(setDeleteResponse, id, token);
        deleteAlert(name);
    }




    const handleClearData = ()=>{
        setMessage("");
        setEditResponse({
            state : 0,
            messate : ""
        });
        setState(false);
    }
    return (
        <section className="container-fluid home">
            <article className="home_content-1">

                
                <ul>
                    <li className="home-content-1_perfil" >
                        <span><i className='bx bxs-user-circle'></i></span>
                        <span>Bradigson Nunez </span>
                    </li>
                    <li>
                        <Link to="/home"  className="Link">
                            <span className="icons"><i className='bx bxs-home-alt-2'></i></span>
                            <span> Home</span>
                       
                        </Link>
                    </li>

                    <li>
                        <Link to="/create" className="Link">
                            <span className="icons"><i className='bx bxs-user-plus'></i></span>
                            <span> Agregar Aseguradora</span>
                       
                        </Link>
                    </li>

                    <li>
                        <Link to="/home" className="Link">
                            <span className="icons"><i className='bx bxs-cog' ></i></span>
                            <span> Setting</span>
                       
                        </Link>
                    </li>

                    <li>
                        <Link to="/" className="Link">
                            <span className="icons"><i className='bx bx-log-out-circle' ></i></span>
                            <span>LogOut</span>
                       
                        </Link>
                    </li>
                </ul>
            </article>
            <article className="home_content-2">

                <div className="home-content-2_header">

                    <div className="counter">{aseguradora.length}</div>
                    

                </div>


                <div className="home-content-2_body">
                    <div className="home-content-2-body_table">
                        {
                            aseguradora?.map(ase=>{
                                return(
                                    <div className="home-content-2-body-table_tr" key={ase.id}>
                                        <div className="file-list">{ase.nombre}</div>
                                        <div className="file-list">{ase.comision}.0</div>
                                        <div className="file-list">{ase.statdo ? (<span>true</span>):(<span><i className='bx bx-check-circle text-success'></i></span>)}</div>
                                        <div className="file-list">
                                                <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" >
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">{actualName}</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handleClearData()}></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            
                                                            <input type="text" className="form-control edit-input" placeholder="Nombre" name="nombre" value={fildName} onChange={handleEditFildName} onClick={()=>handleClearData()}/>
                                                            <input type="number" className="form-control mt-4 edit-input" placeholder="Comision" name="comision" value={fildComision} onChange={handleEditFildComsion}/>
                                                            <div className="modal-body_input-check mt-4">
                                                                <div>
                                                                    <label><b>Stado</b></label>
                                                                </div>
                                                                <div>
                                                                        <input className="form-check-input" type="checkbox" id="gridCheck" 
                                                                    defaultChecked={state} onChange={handleEstado}/>
                                                                 </div>
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                        <div className="text-center">{editResponse?.messate}</div>
                                                        <div className="modal-footer footer-edit">
                                                            <button className="btn btn-primary shadow btn-edit" onClick={()=> Edit()}>
                                                                {
                                                                    loadingEdit ? (
                                                                    <div>
                                                                         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                            Loading...
                                                                    </div>):(

                                                                        <div>Edit</div>
                                                                    )
                                                                }
                                                            </button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                <button className="home-content-2-body-table-tr_edit" data-bs-target="#exampleModalToggle" 
                                                data-bs-toggle="modal" onClick={()=> handleEdit(ase.id, ase.nombre, ase.comision)}>
                                                    <i className='bx bxs-pencil'></i>
                                                </button>
                                        </div>
                                        <div className="file-list">
                                             



                                            <button className="home-content-2-body-table-tr_delete" onClick={()=> handleDelete(ase.id, ase.nombre)}>
                                                <i className='bx bxs-trash'></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>

            </article>


           
        </section>
    )
}


export default Home;
