import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export async function  makePostRequest(
    setLoading,
    url,
    data,
    resourceName,
    reset
)
{
    try {
        setLoading(true);
        const baseUrl = "http://localhost:3000";    
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            })
        if(response.ok)
            {
               // console.log(response)
                setLoading(false);
                toast.success(`New ${resourceName} created Successfully!`);
                reset();
            }else{
                setLoading(false);
                toast.error('Something Went Wrong.');
            }

        
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
}


export async function  makePutRequest(
    setLoading,
    url,
    data,
    resourceName,
    redirect,
    reset
)
{
    try {

        setLoading(true);
        const baseUrl = "http://localhost:3000";    
        const response = await fetch(url,
            {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            })
        if(response.ok)
            {
               // console.log(response)
                setLoading(false);
                toast.success(`${resourceName} Updated Successfully!`);
                redirect();
            }else{
                setLoading(false);
                if(response.status===409){
                    
                    toast.error('Giving Warehouse Stock is not Enough.');
                }else{
                    toast.error('Something Went Wrong.');
                }
                
            }

        
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
}