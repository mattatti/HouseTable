import {Sequelize, DataTypes} from "sequelize";
import {config} from "../config";

export const sequelize = new Sequelize(config.POSTGRES_URI);

const House = sequelize.define('House', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currentValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    loanAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    risk: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = House;