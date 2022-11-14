const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118367","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

// importanje modela
db.Student = require('./Student.js')(sequelize);
db.Grupa = require('./Grupa.js')(sequelize);
db.Zadatak = require('./Zadatak.js')(sequelize);
db.Vjezba = require('./Vjezba.js')(sequelize);

// relacije
db.Vjezba.hasMany(db.Zadatak,{as: 'zadaciVjezbe', onDelete: 'CASCADE'});
db.Grupa.hasMany(db.Student,{as: 'studentiGrupe', onDelete: 'CASCADE'});


module.exports=db;