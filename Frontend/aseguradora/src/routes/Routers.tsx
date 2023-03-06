import {Routes, Route} from 'react-router-dom'
import Form from '../components/Form';
import Home from '../components/Home';
import Login from '../components/Login';
import { useState, useEffect } from 'react';


const Rutas = ()=>{
     const [takeToken, setTakeToken] = useState<string>("");
    console.log(`${"Rutas component"} ${takeToken}`);
    return(
        <Routes>
            <Route path="/" element={<Login token={setTakeToken}  onClick={(message : string)=>{console.log(message); setTakeToken(message);}}/>}/>
            <Route path="home" element={<Home tokenURL={takeToken}/>}/>
            <Route path="create" element={<Form tokenURL={takeToken}/>}/>
        </Routes>

    )
}


export default Rutas;
