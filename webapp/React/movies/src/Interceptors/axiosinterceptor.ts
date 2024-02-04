import axios, { AxiosResponse } from "axios";

let isInterceptorSetup = false;

export const setupErrorHandlingInterceptor =  () => {

    if (!isInterceptorSetup)
    {
        axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                 
                if (error.response)
                {
                    const statusCode = error.response.status;
                    const data = error.response.data;
                    switch (statusCode)
                    {
                        case 400:
                            if (data.errors) {
                                const modalStateError = [];
                                for (const item of data.errors) {
                                    const property = item.property;
                                    const errorMessage = item.errorMessage;

                                    if (property && errorMessage) {
                                        modalStateError.push({ property, errorMessage })
                                    }
                                  
                                }
                                console.log(modalStateError);
                            }
                            break;
                        case 401:
                            console.log("unauthorized");
                            break;
                        case 403:
                            console.log("forbiden");
                            break
                        case 404:
                            console.log("not found");
                            break;
                        default:
                            console.log("general error");
                    }
                }
                return Promise.reject(error);
             }
            )
        isInterceptorSetup = true;               
    }
}