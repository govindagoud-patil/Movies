import apiConnector from "../../api/apiConnector";
import { MovieDto } from "../../models/movieDto"
import { useEffect, useState } from "react"
import { Button, Container } from "semantic-ui-react";
import MovieTableItems from "./MovieTableItem";
import { NavLink } from "react-router-dom";

export default function MovieTable() {

    const [movies, setMovies] = useState<MovieDto[]>([]);

    useEffect(() => {
        const fetchDate = async () => {

            const fetchedMovies = await apiConnector.getMovies();
            setMovies(fetchedMovies);
        }
        fetchDate();
    }, []);

    return (
        <>
            <Container className="container-style">
                <table className="ui inverted table">
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>CreateDate</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.length !== 0 && (
                            movies.map((movie, index) => (
                                <MovieTableItems key={index} movie={movie}/>
                            ))
                        )}
                    </tbody>

                </table>
                <Button as={NavLink} to="createMovie" floated="right" type="button" content="Create Movie" positive />

            </Container>
        </>
    )
}