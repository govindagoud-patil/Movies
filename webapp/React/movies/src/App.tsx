import { useEffect } from "react";
import { setupErrorHandlingInterceptor } from "./Interceptors/axiosinterceptor";
import Register from "./Componets/user/Register";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";

function App() {

    useEffect(() => {
        setupErrorHandlingInterceptor();
    },[]);
    
    const loc = useLocation();
    
    return (
        <>
 
            {
              loc.pathname === '/' ? <Register /> : (
                <Container className="container-style">
                    <Outlet />
                </Container>
                )
                }
    
        </>    
    )

}

export default App