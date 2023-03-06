
import alertst from 'sweetalert2';

const deleteAlert = (name:string)=>{

    alertst.fire({
        icon: 'success',
        text: `Has eliminado la aseguradora ${name}`,
        showConfirmButton: false,
        timer: 1500
      })
}


const createdAseguradora = (name:string)=>{

    alertst.fire({
        icon: 'success',
        text: `Has agregado la aseguradora ${name}`,
        showConfirmButton: false,
        timer: 1500
      })
}


const login = (name:string)=>{

    alertst.fire({
        icon: 'success',
        text: `Bienvenido ${name}`,
        showConfirmButton: false,
        timer: 1500
      })
}




export{
    deleteAlert,
    createdAseguradora,
    login
}