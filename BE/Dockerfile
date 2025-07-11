# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy only the csproj and restore
COPY ["BE.csproj", "./"]
RUN dotnet restore "BE.csproj"

# copy everything else and build
COPY . .
RUN dotnet publish "BE.csproj" -c Release -o /app/publish /p:UseAppHost=false

# final runtime image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BE.dll"]