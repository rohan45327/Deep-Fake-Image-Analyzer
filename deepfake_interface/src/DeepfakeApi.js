import { useState } from "react";
const URL='http://127.0.0.1:8000/api/v1/analyze';
const UseApi=()=>{
    const [result,setResult]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null)
    const Analyze= async (file)=>{
        setLoading(true);
        setError(null);
        setResult(null);
        const form=new FormData();
        form.append('file',file)
        try{
            const response=await fetch(URL,{
                method:'POST',
                body:form
            });
            if(!response.ok){
                const er= await response.json()
                throw new Error(er.detail||`error occured when reciving data ${response.status}`)
            }
            const data=await response.json();
            setResult(data);
        }
        catch(err){
            console.error('Api Analysis is failed Here',err.message);
            setError(err.message||"An unexpected error occured at fetching data")
        }
        finally{
            setLoading(false)
        }
    }
    return {result,loading,error,Analyze};
}
export default UseApi;
