# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy only the csproj and restore
COPY ["RGBGame.csproj", "./"]
RUN dotnet restore "RGBGame.csproj"

# copy everything else and build
COPY . .
RUN dotnet publish "RGBGame.csproj" -c Release -o /app/publish /p:UseAppHost=false

# final runtime image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "RGBGame.dll"]