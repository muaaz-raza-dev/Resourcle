# Resourcle
A platform for discovering, sharing, and organizing helpful resources with others


***

# Main Features
- 🔐 User Authentication (Sign In / Sign Up)
- 🔍 Search and Filter Resources
- ✍️ Create Public or Private Resources
- 📚 Organize Links into Collections
- 📌 Bookmark Favorite Resources
- 👍 Upvote-Based Ranking System
- 🔄 Import Browser Bookmarks (Coming Soon)


## 🖥️ Tech Stack

- **Frontend:** Next.js 13+ (App Router), Tailwind CSS, TypeScript
- **Backend:** Express.js, Node.js
- **Database:** MongoDB (via Mongoose)
- **Monorepo Tooling:** Turborepo
- **Others:** Vercel (Frontend), Vercel (Backend)

## 💼 Use Cases

1. **Community Resource Hub**  
   A platform for users to share and discover resources in a collaborative space.

2. **Personalized Learning Platform**  
   Curate and organize learning materials for users to bookmark and access.

3. **Content Curation Directory**  
   Share and organize industry resources, articles, or product recommendations.

4. **Research & Resource Archive**  
   A centralized place for professionals to store and share research and articles.

5. **Resource Discovery Platform**  
   Let users explore and upvote valuable resources across any topic.

---


## 🧱 Project Structure (Monorepo)

```bash
resourcle/ 
├── apps/
│   ├── frontend       # Next.js application 
│   ├── server         # Express.js backend API 
│   └── util-server    # Utility server (e.g., for secondary tasks like URL verification)
├── packages/          # Shared code and types 
└── turbo.json         # Turborepo configuration  
```
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
git clone https://github.com/muaaz-raza-dev/Resourcle.git
```

Navigate to the project directory:

```
cd resourcle
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

## Step 5: Seed database 

The project includes a database seeder script for fresh start, run it after starting the backend:

```Text bash
cd apps/server
npm run seed
```

<br />

## Step 6: Access the Application

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

## Acknowledgements

Resourcle is built with the power of the modern web stack and amazing open-source tools:

- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) for media storage
- [Turborepo](https://turbo.build/repo) for monorepo management

## 💬 Support & Feedback

Found a bug, have a feature request, or just want to say hi?  
Feel free to [open an issue](https://github.com/muaaz-raza-dev/resourcle/issues) or reach out via [email](mailto:support@resourcle.com).

---