const sequelize = require("../config/connection");
const { User, Blog } = require("../models");
const blogData = require("../seeds/blogData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        const blogs = await Blog.bulkCreate(blogData, {
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