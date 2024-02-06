import { ChangeEvent,useEffect,useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { UserDto } from "../../models/userDto"
import apiConnector from "../../api/apiConnector";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token } from "../../models/token";

export default function Register()
{

    const navigate = useNavigate();
    const [userDto, setUserDto] = useState<UserDto>({
        email: '',
        password:''
    });

       useEffect(() => {
        const storedToken: token = JSON.parse(localStorage.getItem("token") as string);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

            }, []);
    
    function handleRegister() {
        
        apiConnector.registerUser(userDto);
       
    }

    async function handleLogin() {
     
         apiConnector.loginUser(userDto).then( token => {
            localStorage.setItem("token", JSON.stringify(token));
             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;             
         }); 
        await timeout(100);
        navigate("listMovie");
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
        }   

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setUserDto({ ...userDto, [name]: value })
    }

    return (
        <>
            <Segment clearing inverted>
                <Form autoComplete='off' className="ui inverted form" >
                    <Form.Input placeholder="Email" name="email" value={userDto.email} onChange={handleInputChange} />
                    <Form.Input placeholder="Password" name="password" value={userDto.password} onChange={handleInputChange} />
                    <Button floated='right' positive type="button" content="Register" onClick={ handleRegister} ></Button>
                    <Button floated='right' positive type="button" content="Login" onClick={handleLogin} ></Button>
                </Form>               
            </Segment>
    
    </>)
}

