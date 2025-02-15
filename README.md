# Shortify

App to create short URLs. 

## Setup

This project requires **Node.js version 22**. To run the infra locally you will need docker.

Install dependencies:

```bash
npm install
```

Star up the infra

```bash
npm run start:infra
```

Access MongoDB:

- From Docker services: mongodb:27017
- From host machine: localhost:27017

Access Redis:

- From Docker services: redis:6379
- From host machine: localhost:6379

## Running the UI

To start the UI application, run:

```bash
npm run dev:ui
```
This will start the UI server, in the [http://localhost:4200](http://localhost:4200).

## Running the API

To start the UI application, run:

```bash
npm run dev:api
```

This will start the API development server, in the [http://localhost:3000](http://localhost:3000).

## Overview

To found a detailed description of the decisions, and reasoning behind this app, check the [overview section here](docs/overview.md).

## Additional Information

This project is built using [Nx](https://nx.dev/), a powerful monorepo tool for managing multiple projects efficiently.
On the UI, the app is build using React and Vite. To ensure performance it's using Tankstank.
