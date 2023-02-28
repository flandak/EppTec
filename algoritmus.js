let pole = [5, 10, 15, 20, 25, 30];

const FILTR_NAZEV = "--filtr";
const PRAVIDLO_NAZEV = "--pravidlo";

// získání hodnoty parametru pro filtr a pravidlo z příkazové řádky
let filtrHodnota = null;
let pravidloHodnota = null;
process.argv.forEach((argument, index) => {
  if (argument === FILTR_NAZEV && index < process.argv.length - 1) {
    filtrHodnota = parseInt(process.argv[index + 1]);
  }
  if (argument === PRAVIDLO_NAZEV && index < process.argv.length - 1) {
    pravidloHodnota = process.argv[index + 1];
  }
});

let pravidlo = eval(pravidloHodnota);

if (!pravidlo) {
  pravidlo = (prvek) => {
    return prvek > filtrHodnota;
  };
}

let novePole = pole.filter(pravidlo);

console.log(novePole);
