import {Routes, Route} from 'react-router-dom'
import Form from '../components/Form';
import Home from '../components/Home';
import Login from '../components/Login';



const Rutas = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="create" element={<Form/>}/>
        </Routes>

    )
}


export default Rutas;