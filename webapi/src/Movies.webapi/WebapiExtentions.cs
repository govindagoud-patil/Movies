using MediatR;
using Movies.Application.Commands;
using Movies.Application.Queries;
using Movies.Contracts;
using Movies.Infrastructure;

namespace Movies.Presentation
{
    public static class PresentationExtensions
    {
        public static void AddMovieEndpoints(this IEndpointRouteBuilder route)
        {
            route.MapGet("/api/movies",async (IMediator mediator,CancellationToken ct) =>
            {
                var movies = await mediator.Send(new GetMoviesQuery());
                return Results.Ok(movies);
            }).WithTags("Movies").RequireAuthorization();

            route.MapGet("/api/movies/{id}", async (IMediator mediator,int id, CancellationToken ct) =>
            {
                var movie = await mediator.Send(new GetMovieByIdQuery(id),ct);
                return Results.Ok(movie);
            }).WithTags("Movies").RequireAuthorization();

            route.MapPost("/api/movies", async (IMediator mediator, CreateMovieRequest createMovieRequest, CancellationToken ct) =>
            {
                var createMovieCommand = new CreateMovieCommand(createMovieRequest.Title, createMovieRequest.Description, createMovieRequest.Category);
                var movie = await mediator.Send(createMovieCommand, ct);
                return Results.Ok(movie);
            }).WithTags("Movies").RequireAuthorization();

            route.MapPut("/api/movies/{id}", async (IMediator mediator,int id, UpdateMovieRequest createMovieRequest, CancellationToken ct) =>
            {

                var updateMovieCommand = new UpdateMovieCommand(id,createMovieRequest.Title, createMovieRequest.Description, createMovieRequest.Category);
                var movie = await mediator.Send(updateMovieCommand, ct);
                return Results.Ok(movie);
            }).WithTags("Movies").RequireAuthorization();

            route.MapDelete("/api/movies/{id}", async (IMediator mediator,int id,CancellationToken ct) =>
            {
                var deleteMovieCommand = new DeleteMovieCommand(id);
                var movie = await mediator.Send(deleteMovieCommand, ct);
                return Results.Ok(movie);
            }).WithTags("Movies").RequireAuthorization();

        }
      
    }
}
