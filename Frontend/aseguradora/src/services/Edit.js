import axios from 'axios';




const editAsguradora = async (state, id, nombre, comision, stado, token, loading)=>{

    const options = {
        method: 'PUT',
        url: 'https://www.apiaseguradora.somee.com/api/Aseguradora/update',
        headers: {
        Authorization: `Bearer ${token}`
        },
        data: {id : id, nombre: nombre, comision: comision, estado: stado}
    };
    
    axios.request(options).then(function (response) {
        state(response.data);
        loading(false);
    }).catch(function (error) {
        console.error(error);
        loading(false);
    });

}



const deleteAsguradora = async (state, id, token)=>{

    const options = {
    method: 'DELETE',
    url: 'https://www.apiaseguradora.somee.com/api/Aseguradora/id',
    params: {id: id},
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJzdHJpbmciLCJuYmYiOjE2NzgwNTIyNDYsImV4cCI6MTY4MDIxMjI0NiwiaWF0IjoxNjc4MDUyMjQ2fQ.KohUfZmW5JLpTydCEUTUN2dl9Yg6vo4LVggf7pHiKog'
    },
    data: {id: 1}
    };

    axios.request(options).then(function (response) {
        state(response.data)
    }).catch(function (error) {
    console.error(error);
    });

}




const loginCreateAseguradora = async(state, name, password)=>{

    const options = {
    method: 'POST',
    url: 'https://www.apiaseguradora.somee.com/api/Aseguradora/login',
    data: {name: name, password: password}
    };

    await axios.request(options).then(function (response) {
     state(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}


export{
    editAsguradora,
    deleteAsguradora,
    loginCreateAseguradora
}