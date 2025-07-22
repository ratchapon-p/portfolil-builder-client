import axios from "axios"

axios.defaults.withCredentials = true;

export const post = async <T = any>(url : string, data : T) => {
    console.log(url,'<<url');
    console.log(data,'<<dataa');

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + url;
    console.log(baseUrl,'<<baseUrl');
    
    const response = await axios.post(baseUrl, data);
    console.log(response,'rersrser');
    
    return response.data;
  };

export const get = async(url : string) =>{
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + url;

    const response = await axios.get(baseUrl)
    return response.data
}

export const put = async<T = any>(url : string,data : T) =>{
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + url;

    const response = await axios.put(baseUrl, data)
    return response.data
}

export const del = async(url : string) =>{
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL + url;

    const response = await axios.delete(baseUrl)
    return response.data
}