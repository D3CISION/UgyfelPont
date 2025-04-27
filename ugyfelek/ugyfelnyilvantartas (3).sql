-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 27. 09:50
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ugyfelnyilvantartas`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cegek`
--

CREATE TABLE `cegek` (
  `CegId` int(255) NOT NULL,
  `telszam` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `formaId` int(255) NOT NULL,
  `cimId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cimek`
--

CREATE TABLE `cimek` (
  `CimId` int(255) NOT NULL,
  `hazszam` int(255) NOT NULL,
  `utca` varchar(255) NOT NULL,
  `telepulesNev` varchar(255) NOT NULL,
  `irsz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `feladatok`
--

CREATE TABLE `feladatok` (
  `FeladatId` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `leiras` varchar(255) NOT NULL,
  `ismGyak` varchar(255) NOT NULL,
  `allapot` tinyint(1) NOT NULL,
  `szinId` int(255) NOT NULL,
  `tipusId` int(255) NOT NULL,
  `hatarido` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `feladatok`
--

INSERT INTO `feladatok` (`FeladatId`, `nev`, `leiras`, `ismGyak`, `allapot`, `szinId`, `tipusId`, `hatarido`) VALUES
(1, 'a magy mű', 'óriási kisegér', 'asdasd', 0, 0, 0, '2005-10-10');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalofeladat`
--

CREATE TABLE `felhasznalofeladat` (
  `felkapcsId` int(11) NOT NULL,
  `feladatId` int(11) NOT NULL,
  `felhasznaloId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `nev` varchar(50) NOT NULL,
  `telszam` int(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `FelhasznaloId` int(255) NOT NULL,
  `passwd_hash` blob NOT NULL,
  `passwd_salt` blob NOT NULL,
  `szerepkor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`nev`, `telszam`, `email`, `FelhasznaloId`, `passwd_hash`, `passwd_salt`, `szerepkor`) VALUES
('string', 0, 'string', 1, 0xc2204bf1a71c198dfae026f3a402347ef47e15729f9df135d179401b0243c1235fdf7772940fea8c036838adc0b73b705a17ecac018ff9be51bf16349c444721, 0x77b2a8686c3e5e62975d638aeb373cf7b07c8ecf929bce462bcecf71454129637692af4da054ae424a1eb60fdf10d32e3504b58c20a8bf6263988489aa3034a6bb1ffc4b9592cf0c3fa4248c4821826604ae99305f8820988083560a196f61bf95ea03fd3614eb0c6998f80e1eed4b9abc467dcd31f73b7e64ed2dbb11948949, 'string');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `formak`
--

CREATE TABLE `formak` (
  `FormaId` int(255) NOT NULL,
  `nev` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szinek`
--

CREATE TABLE `szinek` (
  `SzinId` int(255) NOT NULL,
  `szinNev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szinek`
--

INSERT INTO `szinek` (`SzinId`, `szinNev`) VALUES
(0, 'asd');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tipusok`
--

CREATE TABLE `tipusok` (
  `TipusId` int(255) NOT NULL,
  `tipusNev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tipusok`
--

INSERT INTO `tipusok` (`TipusId`, `tipusNev`) VALUES
(0, 'valam');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cegek`
--
ALTER TABLE `cegek`
  ADD PRIMARY KEY (`CegId`),
  ADD KEY `Id` (`CegId`,`telszam`,`email`,`nev`,`formaId`,`cimId`),
  ADD KEY `formaId` (`formaId`),
  ADD KEY `cimId` (`cimId`);

--
-- A tábla indexei `cimek`
--
ALTER TABLE `cimek`
  ADD PRIMARY KEY (`CimId`),
  ADD KEY `Id` (`CimId`,`hazszam`,`utca`);

--
-- A tábla indexei `feladatok`
--
ALTER TABLE `feladatok`
  ADD PRIMARY KEY (`FeladatId`),
  ADD KEY `Id` (`FeladatId`,`nev`,`leiras`,`ismGyak`,`allapot`,`szinId`,`tipusId`,`hatarido`),
  ADD KEY `szinId` (`szinId`),
  ADD KEY `tipusId` (`tipusId`);

--
-- A tábla indexei `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  ADD PRIMARY KEY (`felkapcsId`,`feladatId`,`felhasznaloId`),
  ADD KEY `felhasznaloId` (`felhasznaloId`),
  ADD KEY `feladatId` (`feladatId`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`FelhasznaloId`),
  ADD KEY `veznev` (`nev`,`telszam`,`email`,`FelhasznaloId`);

--
-- A tábla indexei `formak`
--
ALTER TABLE `formak`
  ADD PRIMARY KEY (`FormaId`),
  ADD KEY `Id` (`FormaId`,`nev`);

--
-- A tábla indexei `szinek`
--
ALTER TABLE `szinek`
  ADD PRIMARY KEY (`SzinId`),
  ADD KEY `Id` (`SzinId`,`szinNev`);

--
-- A tábla indexei `tipusok`
--
ALTER TABLE `tipusok`
  ADD PRIMARY KEY (`TipusId`),
  ADD KEY `Id` (`TipusId`,`tipusNev`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `feladatok`
--
ALTER TABLE `feladatok`
  MODIFY `FeladatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `FelhasznaloId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cegek`
--
ALTER TABLE `cegek`
  ADD CONSTRAINT `cegek_ibfk_2` FOREIGN KEY (`formaId`) REFERENCES `formak` (`FormaId`),
  ADD CONSTRAINT `cegek_ibfk_3` FOREIGN KEY (`cimId`) REFERENCES `cimek` (`CimId`);

--
-- Megkötések a táblához `feladatok`
--
ALTER TABLE `feladatok`
  ADD CONSTRAINT `feladatok_ibfk_1` FOREIGN KEY (`tipusId`) REFERENCES `tipusok` (`TipusId`),
  ADD CONSTRAINT `feladatok_ibfk_2` FOREIGN KEY (`szinId`) REFERENCES `szinek` (`SzinId`);

--
-- Megkötések a táblához `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  ADD CONSTRAINT `felhasznalofeladat_ibfk_1` FOREIGN KEY (`feladatId`) REFERENCES `feladatok` (`FeladatId`),
  ADD CONSTRAINT `felhasznalofeladat_ibfk_2` FOREIGN KEY (`felhasznaloId`) REFERENCES `felhasznalok` (`FelhasznaloId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
