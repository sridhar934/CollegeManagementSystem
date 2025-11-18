# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["CollegeAPI/CollegeAPI.csproj", "CollegeAPI/"]
RUN dotnet restore "CollegeAPI/CollegeAPI.csproj"

COPY . .
WORKDIR "/src/CollegeAPI"
RUN dotnet publish "CollegeAPI.csproj" -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "CollegeAPI.dll"]
