const sequelize = require("../config/connection");
const { Blog } = require("../models");
const blogData = require("../seeds/blogData.json");

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        const blog = await Blog.bulkCreate(blogData, {
            individualHooks: true,
            returning: true,
        });
        console.log("Database seeded!");
    } catch (error) {
        console.error("Error seeding database", error);
    } finally {
        process.exit(0);
    }
};

seedDatabase();