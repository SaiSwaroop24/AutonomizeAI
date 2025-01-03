const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    blog: DataTypes.STRING,
    bio: DataTypes.STRING,
    public_repos: DataTypes.INTEGER,
    public_gists: DataTypes.INTEGER,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
}, { timestamps: true, paranoid: true });

module.exports = { sequelize, User };
