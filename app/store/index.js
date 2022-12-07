import Vue from "nativescript-vue";
import Vuex from "vuex";
import Pokemon from "~/models/Pokemon";
import Area from "~/models/Area";

const Sqlite = require("nativescript-sqlite")

Vue.use(Vuex);

const store = new Vuex.Store({
  //Define what data will be handled by the store, and their default values
  state: {
    db: "pla-maps.db",
    "settings": {
      "theme": "default",
      "isLight": true,
      "defaultMap": "Jubilife Village",
    },
    areas: [],
    pokemon: [],
  },
  mutations: {
    //Use to alter the application/our store's values
    init(state, data){
      state.db = data.db;
    },
    saveSettings(state, data){
      console.log("Saving...");
      console.log("Data:", data);
      state.settings = data;
      console.log("Settings:", state.settings);
    },
    saveAreas(state, data){
      state.areas = data;
    },
    savePokemon(state, data){
      state.pokemon = data;
    },
  },
  //Helpful because they can be async, which mutations cannot be
  //This is what lets us interact with the db (since it's async)
  actions: {
    init(context){
      if(!Sqlite.exists(context.state.db)){
        //If it doesn't exist in the right place, copy it in
        Sqlite.copyDatabase(context.state.db);
      }
      //Make sure db exists / create table if needed
      new Sqlite(context.state.db, function(err, db){
        db.version(function(err, ver){
          //If it doesn't exist...
          if(ver === 0){
            //Create the tables
            db.execSQL(`CREATE TABLE
              areas(
                id integer not null primary key autoincrement,
                area_name VARCHAR(100) not null,
                area_map VARCHAR(255) NULL)`
            );
            db.execSQL(`CREATE TABLE
              pokemon_caught(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                pokemon VARCHAR(50) NOT NULL,
                area_id INTEGER NOT NULL,
                entry VARCHAR(1000) NULL,
                FOREIGN KEY (area_id) REFERENCES areas(id)
              )`
            );
            db.version(1);
          }
          context.dispatch("query");
        });
      });
    },
    insert(context, data){
      console.log("Inserting");
      new Sqlite(context.state.db, function(err, db){
        db.execSQL("INSERT INTO settings VALUES (NULL, ?, ?, ?, ?)",
          [data.theme, data["isLight"], data.defaultMap, data.favPokemon],
        function(error, id){
          console.log(error);
          if(error){
            console.log("ERROR INSERTING DATA:", error);
          } else {
            context.commit("save", data);
          }
        });
      });
      console.log("Insert complete");
    },
    insertPokemon(context, data){
      console.log("Adding pokemon");
      new Sqlite(context.state.db, function(err, db){
        //Get results back w/ native values (not just strings) & as objects, not arrays
        db.resultType(Sqlite.RESULTSASOBJECT);
        db.valueType(Sqlite.VALUESARENATIVE);
        db.execSQL("INSERT INTO pokemon_caught(pokemon, entry, area_id) VALUES (?, ?, ?)",
          [data.name, data.entry, data.areaIndex],
          function(error, id){
            console.log("New record id: " + id);
            if(error){
              console.log("ERROR ADDING POKEMON:", error);
            } else {
              let pokemonList = context.state.pokemon;
              pokemonList.push(data);
              context.commit("savePokemon", pokemonList);
              console.log(context.state.pokemon);
            }
            db.all("SELECT * FROM pokemon_caught", function(error, results){
              console.log(results);
            });
        });
      });
    },
    query(context){
      //Update data in state by getting it from the db
      new Sqlite(context.state.db, function(err, db){
        //Get results back w/ native values (not just strings) & as objects, not arrays
        db.resultType(Sqlite.RESULTSASOBJECT);
        db.valueType(Sqlite.VALUESARENATIVE);
        db.all("SELECT * FROM pokemon_caught", function(err, results){
          //Getting back an array of results - turn this into a list of pokemon & add to settings
          let pokemonList = [];
          for(let entry of results){
            pokemonList.push(new Pokemon(entry.pokemon, entry.entry, entry.area_id));
          }
          context.commit("savePokemon", pokemonList);
        });
        db.all("SELECT * FROM areas", function(err, results){
          let areaList = [];
          for(let entry of results){
            //Char is first letter of second word
            let char = entry.area_name;
            char = char.slice(char.indexOf(" " ) + 1)[0];
            areaList.push(new Area(entry.id, entry.area_name, entry.area_map, char));
          }
          //Make sure jubilife village is first
          let jubilife = areaList.pop();
          areaList.unshift(jubilife);
          context.commit("saveAreas", areaList);
        });
      });
    }
  }
});

Vue.prototype.$store = store;

//Init the database
store.dispatch("init");
export default store;
