type asegurate = {
    id: number,
    nombre: string,
    comision : number,
    statdo : boolean
}

export default asegurate;




export interface AseguradoratypeInterface{
    id: number,
    nombre: string,
    comision : number,
    stado : boolean
}


export interface responseCreateInterface{
    state : number,
    messate : string
}


export interface EditField{
    nombre : string,
    comision : number
}



export interface logininterfaceResponse{
    msg: string,
    token: string
}
export interface logininterfaceCreate{
    name: string,
    password: string
}