using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movies.Contracts
{
    public record CreateMovieRequest(string Title,String Description,String Category);

}
