import Swal from "sweetalert2";

export function convertBolean (input:string):| boolean 
{
    try
    {
        return JSON.parse(input.toLowerCase())
    }
    catch (e)
    {
        return false;
    }
}
export function alert_sucess(title: string,timer?:number,text?:string)
{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        text:text,
        showConfirmButton: false,
        timer:timer==null||timer==undefined ? 1500 : timer,
      });
}
export function alert_warning(title: string,timer?:number,text?:string)
{
      Swal.fire({
        /* position: "top-end", */
        icon: "warning",
        title: title,
        text:text,
        showConfirmButton: false,
        timer:timer==null||timer==undefined ? 1500 : timer,
      });
}
export function alert_error(title: string,text?:string)
{
      Swal.fire({
       
        icon: "error",
        text: "Something went wrong!",
        title: title,
        
        showConfirmButton: false,
        
      });
}