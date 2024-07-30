# Attraction Service

## Overview

The Attraction Service is responsible for managing attrations and attraction types for the TourHub application. This service provides RESTful API endpoints to create, read, update, and delete data related to attrations.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Attractions](#attrations)
  - [Attraction Types](#attraction-types)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone git@github.com:hasithar/tourhub-attraction-service.git`
2. Change directory: `cd tourhub-attraction-service`
3. Install dependencies: `npm install`

## Configuration

Use environment variables to configure the service.

1. Copy the env.example file to .env `cp env.example .env`
2. Update the .env file with your specific configuration settings.

## Usage

1. Start the service: `npm start`
2. The service will be running at `http://localhost:3000`.

## API Endpoints

### Attractions

- `GET /api/attrations`

  - Fetch all attrations.

- `GET /api/attrations/:id`

  - Fetch a single attraction by ID.

- `POST /api/attrations`

  - Create a new attraction.

- `PATCH /api/attrations/:id`

  - Update an existing attraction by ID.

- `DELETE /api/attrations/:id`
  - Delete an attraction by ID.

### Attraction Types

- `GET /api/attraction-types`

  - Fetch all attraction types.

- `GET /api/attraction-types/:id`

  - Fetch a single attraction type by ID.

- `POST /api/attraction-types`

  - Create a new attraction type.

- `PATCH /api/attraction-types/:id`

  - Update an existing attraction type by ID.

- `DELETE /api/attraction-types/:id`
  - Delete an attraction type by ID.

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
