# Overview

This section provides details on the reasoning behind certain implementations, libraries, and architectural decisions.

## WHat this app is intending to do

1. Generate a unique short URL for a given valid long URL.
2. Redirect users to the original URL when they access the short URL.
3. Allow users to retrieve and update their short URLs.
4. Provide analytics on link usage.

## Initial decision on technologies

To organize and synchronize the different aspects of this app, it is divided into two sections:

- **apps**: Contains the UI (a React application) and the API service responsible for handling the creation, retrieval, updates, and redirection of URLs. If a new app needs to be added in the future, it can be included here.
- **libs**: Stores shared core interfaces and utilities. This separation prevents duplication and conflicts between the UI and API.

To simplify the organization, this app uses [NX](https://nx.dev/).

The **UI** is built with [React](https://react.dev/) and uses:

- [Vite](https://vite.dev/) to build and serve.
- [Tanstak](https://tanstack.com) to handle the state and cache of external services.

The **API** built is using [Fastify](https://fastify.dev/).

### Data model

This service stores the following information:

- Unique ID: Used to identify the long URL.
- Creation Date: The date when the URL was created.
- Clicks: The number of times the short URL was accessed.
- User ID: The user who created the URL.
- Original Long URL: The original long URL that the short URL redirects to.

### Traffic

Based on similar systems with comparable functionality, the expected read/write ratio is 100:1, and the number of unique shortened links generated per month is estimated to be 100 million URLs.

This means that the number of unique shortened links generated per second will be:

<p align="center" style="text-align:center;font-style:italic;">100 million÷(30 days×24 hours×3600 seconds)≈40 URLs/second</p>

With a **100:1 read/write** ratio, the number of redirections will be:

<p align="center" style="text-align:center;font-style:italic;">40 URLs/s×100≈4000 URLs/s</p>

### Storage

With the previous estimation of traffic, assuming a life service of 50 years, we will need to store: 100 million urls/month * 50 (years) * 12 (months) = 60 billion urls. The data model we are storing contains a short amount of data, we can estimate an average size of 500 bytes per record, this means our system will need to store: 60 billion * 500 bytes = 30TB.

Based on the estimated traffic, assuming a service lifespan of 50 years, the total storage required will be:

<p align="center" style="text-align:center;font-style:italic;">100 million URLs/month * 50 (years) * 12 (months) = 60 billion URLs</p>

Given the data model's small size, we estimate an average record size of 500 bytes, leading to a total storage requirement of:

<p align="center" style="text-align:center;font-style:italic;">60 billion * 500 bytes = 30TB</p>

### General stats

- Shortened URL generation rate: 40 URLs/s
- Shortened URL read rate: 4,000 URLs/s
- Total shortened URLs generated in 50 years: 60 billion
