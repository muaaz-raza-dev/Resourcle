#**Resourcle**
Resourle is the community driven resource link sharing platform for everyone

# Introduction
This project is a web application that enables users to share, organize, and access resource links through an upvote-based ranking system. Users can save, manage, and share their favorite resources with ease.

Want to ease your users into it with some fancy marketing pages? You can enable a **[Landing Page](https://docs.readme.com/main/docs/landing-page)**, and write as much HTML as you want to make it look like your brand.

***

# Main Features

* User Authentication
* Search resource
* Create resource
* Public / Private resources
* Resource collection
* bookmark resource
* upvote based ranking

***

# 📑 Demo

Upcoming ...

***

# Installation

Follow these steps to set up the project on your local machine:

## Prerequisites

you have the following tools installed:

1. Node js (version 16.x or above) [Download here](https://nodejs.org/en)
2. npm (Node Package Manager) – Comes with Node.js installation.\
   Confirm installation by running:
   ```typescript bash
   node -v
   npm -v
   ```
3. Git – [Download Here](https://git-scm.com/) .\
   Verify by running:
   ```Text bash
   git --version
   ```
4. MongoDB – A local or cloud database instance for data storage. [Set up MongoDB](https://www.mongodb.com/docs/manual/installation/) .

## Step 1: Clone the Repository

Clone the project repository from GitHub to your local machine:

```Text bash
git clone https://github.com/username/repository-name.git
```

Navigate to the project directory:

```
cd repository-name
```

## Step 2: Install Dependencies

This project uses Turborepo to manage multiple apps within a monorepo. Install all dependencies from the root directory:

```Text bash
npm install
```

This command will install all the packages listed in the package.json file, including backend and frontend dependencies.

## Step 3: Configure Environment Variables

1. Create a .env file in the root directory
2. Add the required environment variables as shown in the .env.example file. For example:

```Text bash
cp apps/frontend/.env.example apps/frontend/.env 
cp apps/server/.env.sample ./apps/server/.env
```

Replace placeholders like where API keys needed replace with your actual configuration values.

## Step 4: Start the Development Server

Run both server and frontend simultaneously . Move to root folder

```Text bash
npm run dev
```

Alternatively, you can start apps individually:

* Backend (API):

```Text bash
cd apps/server
npm run dev
```

* Frontend (Web):

```Text bash
cd apps/frontend
npm run dev
```

* Utility Server (util-server):

```Text bash
cd apps/util-server
npm run dev

```

## Step 5: Access the Application

Once the servers are running:

1. Backend: Open [http://localhost:5000](http://localhost:5000) in your browser or use Postman to test API endpoints.
2. Frontend: Access the application at [http://localhost:3000](http://localhost:3000) in your browser.

<br />

## Troubleshooting

* Port Conflicts: Ensure the ports /3000 (web) , /5000 (API) and /4000 (UTIL-SERVER)  are available.
* Database Issues: Verify that MongoDB is running locally or check your cloud database connection string.

***

# Contributing

Contributers are welcome! Please follow the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

# License

This project is licensed under the Apache-2.0 license License. See the [LICENSE](LICENSE) file for details.

# Acknowledgments

* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [MongoDB](https://www.mongodb.com/)