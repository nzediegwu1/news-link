# News-Link

A GraphQL API for managing popular news links. Users can vote their favourite news links and let the world know what's trending

## Table of Contents

    1. Features
    2. Technologies
    3. Installation and Setup
    4. Running the application
    5. How To Contribute

## Features

    A user can perform the following actions with the application
      - Create a news link
      - Update a news link
      - Retrieve paginated news feed
      - Sort and filter news feed
      - Retrieve a single news link
      - Delete a news link
      - Signup to the application
      - Signin to the application
      - Fetch list of users in the application
      - Subscribe to real time event for news link creation
      - Vote a news link
      - Delete a vote on a news link
      - Subscribe to real time event when user votes a news link

## Technologies

### Server

    1. Nodejs
    2. GraphQL
    3. GraphQL yoga
    4. Prisma
    5. Postgres Database
    6. Docker Compose

## Installation and Setup

1. Install and start docker on local machine
2. Clone this repo `git clone https://github.com/nzediegwu1/news-link.git`
3. Run "yarn install" to install dependencies
4. Create and start server for prisma API: `docker-compose up -d`
5. Deploy/Migrate prisma data mnodel to database: `npx prisma deploy`
6. Start application: `yarn start`

### Finally

1. Goto http://localhost:4000 on your browser to test the endpoints on GraphQL playground or
2. Goto: https://graphqlbin.com/v2/k2WNh6 to use sample requests

## How to Contribute

To contribute to the project, follow the instructions below

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your own machine
3.  **Commit** changes to your own branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that I can review your changes

**NOTE**: Be sure to rebase from from "upstream" before making a pull request!

## Licence

- This project is licensed under the [MIT License](https://github.com/nzediegwu1/news-link/blob/develop/LICENSE)
- Copyright © 2018 Anaeze Nsoffor
