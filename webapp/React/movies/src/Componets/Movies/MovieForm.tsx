import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { MovieDto } from "../../models/movieDto";
import apiConnector from "../../api/apiConnector";
import { Button, Form, Segment } from "semantic-ui-react";
import axios from "axios";
import { token } from "../../models/token";

export default function MovieForm() {

    const {id} = useParams();
    const  navigate  = useNavigate();

    const [movie, setMovie] = useState<MovieDto>({

        id: undefined,
        title: '',
        description: '',
        createDate: undefined,
        category: ''
    });
        
    function setAccesstokenheader()
    {
            const storedToken: token = JSON.parse(localStorage.getItem("token") as string);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
         
    useEffect(() => {
        setAccesstokenheader();
        if (id) {
            apiConnector.getMovieById(id).then(movie => setMovie(movie!));
        }
    }, [id]);

    function handleSubmit() {
        setAccesstokenheader();
        if (!movie.id) {
            apiConnector.createMovie(movie).then(() => navigate('/movielist'));
        } else {
            apiConnector.editMovie(movie, movie.id).then(() => navigate('/movielist'));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
    }

    return (
        <>
            <Segment clearing inverted>
                <Form onSubmit={handleSubmit} autoComplete='off' className="ui inverted form" >
                    <Form.Input placeholder="Title" name="title" value={movie.title} onChange={handleInputChange} />
                    <Form.TextArea placeholder="Description" name="description" value={movie.description} onChange={handleInputChange} />
                    <Form.Input placeholder="Category" name="category" value={movie.category} onChange={handleInputChange} />
                    <Button floated='right' positive type="submit" content="Submit" ></Button>
                    <Button as={NavLink} to='/movielist' floated='right' type='button' content='Cancel'></Button>
                </Form>                
            </Segment>
        </>
    )
}