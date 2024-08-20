#!/bin/bash

# Define the Docker Compose file path
COMPOSE_FILE="compose.yaml"

# Pull the latest image
echo "Pulling the latest image..."
docker-compose -f $COMPOSE_FILE pull ar-finance

# Stop the existing container
echo "Stopping the existing container..."
docker-compose -f $COMPOSE_FILE down

# Start the container with the new image
echo "Starting the container with the new image..."
docker-compose -f $COMPOSE_FILE up -d ar-finance

# Print the status of the container
docker-compose -f $COMPOSE_FILE ps
