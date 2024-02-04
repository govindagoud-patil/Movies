# Back-End tech stack
1. .Net 8 C#
2. Entity framework
3. SQLight
4. fluint validation
5. Mediator

# Front-End tech Stack
1. Vite + React
2. Axios
3. semantic UI

# Installation of Dotnet ef tool
 dotnet tool install --global dotnet-ef

 dotnet tool update --global dotnet-ef

# Entity migration commands
1. Initialize ef Migration
Dotnet ef migrations add Init -s .\src\Movies.Presentation\ -p .\src\Movies.Infrastructure\ 
2. apply or update the migration
Dotnet ef database update -s .\src\Movies.Presentation\ -p .\src\Movies.Infrastructure\


# To Run ->  Navigate to React movie folder run below commands

npm install
npm run dev



# install axios
npm install axios
# install sematic ui css
npm install semantic-ui-react@3.0.0-beta.0 semantic-ui-css
# install react router
npm install react-router-dom


