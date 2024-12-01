import { Dispatch, SetStateAction, startTransition } from "react";

interface HandleFormSubmitProps <T>{
    action: (values: T)=> Promise<{error?:string, success?: string}>;
    setError: Dispatch<SetStateAction<string | undefined>>;
    setSuccess: Dispatch<SetStateAction<string | undefined>>
};

export const HandleFormSubmit = async <T>(values: T, {
    action,
    setError,
    setSuccess
}:HandleFormSubmitProps<T>)=>{
    setError("");
    setSuccess("");

    startTransition(()=>{
        action(values).then((data)=>{
            setError(data.error);
            setSuccess(data.success)
        })
    })
}