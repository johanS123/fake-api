const fs = require("fs");

class Busquedas {
  database = [];
  dbPath = "./db/database.json";

  constructor() {
    // TODO: leer DB si existe
    this.leerDB();
  }

  agregarDatabase(data = {}, context = "tasks") {
    return new Promise((resolve, reject) => {
      let currentId = 0;

      // TODO: prevenir duplicados
      let isDuplicated = this.database[context].find((el) => {
        return (
          el.title == data.title ||
          el.persons.find((e) =>
            data.persons.some((obj) => obj["name"] === e.name)
          )
        );
      });

      if (isDuplicated) {
        reject({ message: "ya existe esa tarea", valid: false });
      } else {
        if (this.database[context].length) {
          currentId =
            this.database[context][this.database[context].length - 1].id;
        }

        let { title, persons, deadline } = data;

        let body = {
          id: currentId + 1,
          title,
          persons,
          deadline,
          isCompleted: false,
        };

        this.database[context] = [...this.database[context], body];
        // Grabar en DB
        this.guardarDB();
        resolve({ message: "tarea creada", valid: true });
      }
    });
  }

  modificarDatabase(id = 0, data = {}, context = "tasks") {
    return new Promise((resolve, reject) => {
      // TODO: validar que existe
      let index = this.database[context].findIndex((el) => el.id == id);

      if (index < 0) {
        reject({ message: "la tarea no existe", valid: false });
      } else {
        // agrega el id
        data.id = Number(id);

        this.database[context].splice(index, 1, data);

        // Grabar en DB
        this.guardarDB();
        resolve({ message: "tarea creada", valid: true });
      }
    });
  }

  eliminarDatabase(id = 0, context = "tasks") {
    // TODO: validar que existe
    let index = this.database[context].findIndex((el) => el.id == id);

    if (index < 0) {
      return;
    }

    this.database[context].splice(index, 1);

    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      database: this.database,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    // Debe de existir
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.database = data.database;
  }
}

module.exports = Busquedas;
