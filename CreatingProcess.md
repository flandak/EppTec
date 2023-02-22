*Jak vytvořit dotaz SQL:* 
node nazev databáze, název sloupce, hodnota filtru a operátoru porovnání
příklad: node database.js ucet UCET_ID 8 "<"



# Postavte dotaz, který vybere všechny klienty (např. id_klient, jméno a příjmení) pro něž bude platit, že suma jistin všech jejich účtů na konci měsíce bude větší než číslo c:

SELECT k.KLIENT_ID, k.JMENO, k.PRIJMENI
FROM Klient k
INNER JOIN Ucet u ON k.KLIENT_ID = u.KLIENT_ID
INNER JOIN Balance b ON u.UCET_ID = b.UCET_ID
WHERE MONTH(b.DATUM) = MONTH(NOW()) AND YEAR(b.DATUM) = YEAR(NOW())
GROUP BY k.KLIENT_ID
HAVING SUM(b.JISTINA) > c;
----------------------------------------------


# Postavte dotaz, který zobrazí 10 klientů s maximální celkovou výší pohledávky (suma všech pohledávek klienta) k ultimu měsíce a tuto na konci řádku vždy zobrazte:

SELECT K.KLIENT_ID, K.JMENO, K.PRIJMENI, SUM(B.JISTINA + B.UROK + B.POPLATKY) AS CELKOVA_POHLEDAVKA
FROM Klient K
JOIN Ucet U ON K.KLIENT_ID = U.KLIENT_ID
JOIN Balance B ON U.UCET_ID = B.UCET_ID
WHERE MONTH(B.DATUM) = MONTH(CURRENT_DATE()) AND YEAR(B.DATUM) = YEAR(CURRENT_DATE())
GROUP BY K.KLIENT_ID
ORDER BY CELKOVA_POHLEDAVKA DESC
LIMIT 10;
-------------------------------------------------


# jak jsem vytvoril tabulky:


*Klient*

CREATE TABLE `Klient` (
  `KLIENT_ID` INT NOT NULL AUTO_INCREMENT,
  `JMENO` VARCHAR(50),
  `PRIJMENI` VARCHAR(50),
  `EMAIL` VARCHAR(50),
  PRIMARY KEY (`KLIENT_ID`)
);
ALTER TABLE `Klient` AUTO_INCREMENT=100;
-------------------------------------

*Ucet*
CREATE TABLE `Ucet` (
  `UCET_ID` int NOT NULL AUTO_INCREMENT,
  `UCET_TYP` varchar(50),
  `KLIENT_ID` int,
  `STAV` decimal(10,2),
  PRIMARY KEY (`UCET_ID`)
);
ALTER TABLE UCET ADD CONSTRAINT FOREIGN KEY(KLIENT_ID) REFERENCES KLIENT(KLIENT_ID)
-------------------------------------

*Balance*
CREATE TABLE `Balance` (
  `UCET_ID` int NOT NULL AUTO_INCREMENT,
  `JISTINA` int,
  `UROK` int,
  `POPLATKY` int,
  `DATUM` date,
  PRIMARY KEY (`UCET_ID`)
);
ALTER TABLE `BALANCE` AUTO_INCREMENT=150;
-------------------------------------

*Transakce*
CREATE TABLE `Transakce` (
  `TRANSAKCE_ID` int NOT NULL AUTO_INCREMENT,
  `KLIENT_ID` int,
  `UCET_ID` int,
  `TRANSAKCE_TYP_ID` int,
  `DATUM` date,
  PRIMARY KEY (`TRANSAKCE_ID`)
);
ALTER TABLE `BALANCE` AUTO_INCREMENT=50
ALTER TABLE transakce ADD CONSTRAINT FOREIGN KEY(UCET_ID) REFERENCES UCET(UCET_ID)
ALTER TABLE transakce ADD CONSTRAINT FOREIGN KEY(KLIENT_ID) REFERENCES KLIENT(KLIENT_ID)
ALTER TABLE transakce ADD CONSTRAINT FOREIGN KEY(TRANSAKCE_TYP_ID) REFERENCES CISELNIK(TRANSAKCE_TYP)

---------------------------------------

*Ciselnik*
CREATE TABLE `ciselnik` (
  `TRANSAKCE_TYP` int NOT NULL AUTO_INCREMENT,
  `TRANSAKCE_ID` int,
  `popis` varchar(50),
  PRIMARY KEY (`TRANSAKCE_ID`)
);
ALTER TABLE `ciselnik` AUTO_INCREMENT=250
ALTER TABLE CISELNIK ADD CONSTRAINT FOREIGN KEY(TRANSAKCE_ID) REFERENCES TRANSAKCE(TRANSAKCE_ID)

