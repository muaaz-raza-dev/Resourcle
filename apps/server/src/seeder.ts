import { ResourceLink } from "./models/link.model";
import { ResourceCollection } from "./models/resource-collection.model";
import { Resource } from "./models/resource.model";
import { SaveList } from "./models/savelist.model";
import { Tags } from "./models/tag.model";
import { Upvotes } from "./models/upvote.model";
import { User } from "./models/user.model";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

// Database connection

async function seedDatabase() {
  const uri = process.env.db as string;
  const name = process.env.APP_NAME;
  try {
    await mongoose.connect(uri, { dbName: name });
    console.log("Connected to the mongo database.");

    // Sample data
    const tags = [
      "JavaScript",
      "React",
      "Node.js",
      "Frontend",
      "Backend",
      "MongoDB",
      "Web Development",
      "Machine Learning",
      "AI",
      "Data Science",
      "Python",
      "Cloud Computing",
      "Git",
      "Docker",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Django",
      "SQL",
      "GraphQL",
      "APIs",
      "Performance Optimization",
      "Mobile Development",
      "UX/UI Design",
      "Testing",
      "Cybersecurity",
      "Blockchain",
      "React Native",
    ];
    const sampleUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      email_verified: true,
      provider: "local", // or 'local' or 'hybrid'
      password: "$2a$12$Q1tCudMupen.IF8y/NQ9ZOCLz4z1WOf3BIvPMmWujhlfzcj7yfQ9u", // encrypted password = admin
      headline: "Software Developer",
      isDeleted: false,
      links: [
        { label: "Personal Website", url: "https://johndoe.com" },
        { label: "GitHub", url: "https://github.com/johndoe" },
      ],
      about: "Passionate about technology, coding, and open-source.",
    };

    // Clear existing data (optional)
    await Resource.deleteMany({});
    await User.deleteMany({});
    await ResourceLink.deleteMany({});
    await Upvotes.deleteMany({});
    await SaveList.deleteMany({});
    await ResourceCollection.deleteMany({});
    console.log("Existing data cleared.");

    // Insert sample data
    await Tags.insertMany(tags.map((e) => ({ name: e })));
    await User.create(sampleUser);

    console.log("Database seeded successfully!");

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1); // Exit with failure
  }
}

// Run the function
seedDatabase();
