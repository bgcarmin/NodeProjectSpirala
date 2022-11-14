const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("Student",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ime:Sequelize.STRING,
        prezime:Sequelize.STRING,
        index:Sequelize.STRING
    })
    return Student;
};