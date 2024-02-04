import axios, { AxiosResponse } from "axios";
import { MovieDto } from "../models/movieDto";
import { GetMovieResponse } from "../models/getMoviesResponse";
import { API_BASE_URL } from "../../config"
import { GetMoviesByIdResponse } from "../models/getMovieByIdResponse";

const apiConnector = {

    getMovies: async (): Promise<MovieDto[]> => {

    
            const response: AxiosResponse<GetMovieResponse> =
                await axios.get(`${API_BASE_URL}/movies`)
            const movies = response.data.movieDtos.map(movie => ({
                ...movie,
                createDate: movie.createDate?.slice(0, 10) ?? ""
            }));
            return movies;

    },

    createMovie: async (movie: MovieDto): Promise<void> => {
       

            await axios.post<number>(`${API_BASE_URL}/movies`, movie);

      
    },


    editMovie: async (movie: MovieDto, movieId: number): Promise<void> => {
   

            await axios.put<number>(`${API_BASE_URL}/movies/${movieId}`, movie);

    },

    deleteMovie: async (movieId: number): Promise<void> => {
  

            await axios.delete<number>(`${API_BASE_URL}/movies/${movieId}`);

        
    },

    getMovieById: async (movieId: string): Promise<MovieDto | undefined> => {

       

            const response = await axios.get<GetMoviesByIdResponse>(`${API_BASE_URL}/movies/${movieId}`);
            const data = response.data.movieDto;
            return data;


    }

}

export default apiConnector;