import api from "../api"


export const request = async (value: number) => {
    return api.post('/pix/request', {value});
}

export const pay = async (key: string) =>{
    return api.post(`/pix/pay/${key}`);
}

export const transactions = async () =>{
    return api.get('/pix/transactions');
}
