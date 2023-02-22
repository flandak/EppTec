// Importovat funkci createPool z knihovny mysql
const { createPool } = require("mysql");

// Vytvořit spojení s databází s danými informacemi
const pool = createPool({
  host: "localhost",
  user: "root",
  database: "epptec",
  password: "epptec91",
  connectionLimit: 10,
});

// Inicializovat dvě prázdná pole pro uložení filtrovaných a odmítnutých hodnot
const filterValue = [];
const filteredValues = [];

// Získat název dotazu, název sloupce, hodnotu filtru a operátor srovnání z argumentů příkazové řádky
const queryName = process.argv[2];
const columnName = process.argv[3];
const filterArg = process.argv[4];
const comparisonOperator = process.argv[5] || ">"; // výchozí hodnota ">" pokud není zadán žádný operátor

// Sestavit SQL dotaz na základě názvu dotazu, názvu sloupce, hodnoty filtru a operátoru srovnání
const sqlQuery = `SELECT * FROM ${queryName} WHERE ${columnName} ${comparisonOperator} ${filterArg}`;

// Odeslat dotaz do databáze a zpracovat odpověď
pool.query(sqlQuery, (error, response) => {
  if (error) {
    console.log("CHYBA"); // vypsat chybovou zprávu do konzole, pokud selže dotaz
  } else {
    // Iterovat přes každý řádek v odpovědi a zkontrolovat, zda hodnota v daném sloupci splňuje kritéria filtru
    response.forEach((row) => {
      const value = row[columnName];
      let isValueValid = false;

      if (comparisonOperator === "<") {
        if (Number(value) < filterArg) {
          isValueValid = true;
        }
      } else {
        if (Number(value) > filterArg) {
          isValueValid = true;
        }
      }

      // Pokud hodnota splňuje kritéria filtru, přidejte ji do pole filtrovaných hodnot; jinak přidejte do pole odmítnutých hodnot
      if (isValueValid) {
        filteredValues.push(value);
      } else {
        filterValue.push(value);
      }
    });

    // Pokud byly odmítnuty nějaké hodnoty, vypište je do konzole
    if (filterValue.length > 0) {
      console.log(filterValue);
    }

    // Vypište filtrované hodnoty do konzole
    console.log(filteredValues);
  }
});
