# Overview

This section provides details on the reasoning behind certain implementations, libraries, and architectural decisions.

## WHat this app is intending to do

1. Generate a unique short URL for a given valid long URL.
2. Redirect users to the original URL when they access the short URL.
3. Allow users to retrieve and update their short URLs.
4. Provide analytics on link usage.
5. Handle traffic efficiently, with rate limit.

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

### Architecture design

This is a high level design

![Alt text](diagram.png?raw=true "")

- The **UI** will be hosted as a Single Page Application (SPA) and distributed via a Content Delivery Network (CDN).
- The **API** should be designed to scale horizontally to support traffic spikes as needed.
- A **Load Balancer** can be implemented to distribute requests and enforce rate limits. Additionally, a Web Application Firewall **(WAF)** could enhance security.
- All data will be stored in a database, that needs to ensure high availability and performance.
- A **Redis** cache will be used to reduce the read load on the primary database.

### Caching

- The cache retention time is set to 24 hours.
- The cache will store all short URLs created within the last 24 hours.
- If a short URL is accessed for redirection, it will be stored in the cache to ensure frequently accessed URLs remain available with minimal database queries.

### Database

We need to store **billions of records**, and most operations will involve searching by an ID.

- Read operations require significantly higher throughput than writes.
- No complex **joins** are needed.
- The data model is simple, so strict **schema validation is unnecessary**.
- The DB should support performance searches by **ID**

#### Search Requirements

The system needs to support two types of searches:

1. **Search by URL unique ID** (used for redirection).
2. Search for URLs created by a specific **User ID**.

Since all searches are simple key-value lookups, and no join are needed a **NoSQL** database is a better fit than a relational database.

##### Database Choice: MongoDB vs. DynamoDB

Scalability	Horizontal scaling via sharding	Fully managed, scales automatically

Feature | MongoDB | DynamoDB
--- | --- | --- |
Scalability	| Horizontal scaling via sharding | Fully managed, scales automatically
Performance	|  Fast reads/writes with indexes	| Low-latency reads/writes, designed for high throughput
Schema Flexibility | Schema-less, supports dynamic documents | Schema-less, optimized for key-value lookups
Cost| 	Open-source, self-hosted or managed (MongoDB Atlas)	| Pay-per-use pricing, fully managed
Availability| Requires replication setup for high availability| Built-in high availability and fault tolerance
Lock-in Risk| Open-source, no vendor lock-in | AWS-specific, vendor lock-in risk

##### Final Decision: MongoDB

MongoDB was choose over DynamoDB for the following reasons:
✅ Open-source: No vendor lock-in, allowing flexibility in hosting options.
✅ Proven scalability: Supports high read/write loads through sharding and replication.
✅ Self-hosted or managed: Can be deployed on-premises or through MongoDB Atlas.
✅ Developer-friendly: Rich querying capabilities with native JSON support.

While DynamoDB offers seamless scaling and management, its AWS dependency and pricing model make it less flexible for an open-source, cost-effective solution.

## Unique ID

The short URLs need to be as compact as possible while still guaranteeing uniqueness for over 60 billion URLs.

- For **n = 6**, the possible combinations are 62⁶ ≈ **56.8 billion**.
- For **n = 7**, the possible combinations are 62⁷ ≈ **3.5 trillion**.

To meet our requirements, the **maximum length should be 7** characters, as 3.5 trillion unique IDs provide ample room for growth.

To ensure uniqueness:

We hash the original url and encode it in Base62, generating a short, user-friendly, and unique identifier.

To further eliminate collision risks, we can consider implementing a dedicated microservice for ID generation if scalability becomes a concern.
