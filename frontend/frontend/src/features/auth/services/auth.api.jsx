import axios from "axios";

export async function register({username ,email , password}){
    try{
        const response =await axios.post('http://localhost3000/api/auth/login',{
        username, email ,password },{
            withCredentials:true 
        }
       
    )

    return response.data 
}
    catch(error){
        console.log(err)
    };
}
export async function login({email ,password }){
    try{
        const response =await axios.post("http://localhost3000/api/auth/register",{
            email ,password 
        },{withCredentials:true })
        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function logout (){
    try{
        const response=await axios.get('http://localhost3000/api/auth/logout',{
            withCredentials:true

        })
        return response.data

    }catch(err){
        console.log(err)
    }
}
export async function  getMe(){
       try{
        const response=await axios.get('http://localhost3000/api/auth/get-me',{
            withCredentials:true

        })
        return response.data

    }catch(err){
        console.log(err)
    }
}