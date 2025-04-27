-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 24, 2025 at 08:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ugyfelnyilvantartas`
--

-- --------------------------------------------------------

--
-- Table structure for table `cegek`
--

CREATE TABLE `cegek` (
  `CegId` int(255) NOT NULL,
  `telszam` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `formaId` int(255) NOT NULL,
  `cimId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `cegek`
--

INSERT INTO `cegek` (`CegId`, `telszam`, `email`, `nev`, `formaId`, `cimId`) VALUES
(6, 2147483647, 'info@ceg1.hu', 'Cég 1 Kft.', 1, 1),
(11, 2147483647, 'kapcsolat@ceg2.hu', 'Cég 2', 1, 3),
(12, 2147483647, 'hello@ceg3.hu', 'Cég 3', 1, 4),
(13, 0, '', '-', 3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `cimek`
--

CREATE TABLE `cimek` (
  `CimId` int(255) NOT NULL,
  `hazszam` varchar(40) NOT NULL,
  `utca` varchar(255) NOT NULL,
  `telepulesNev` varchar(255) NOT NULL,
  `irsz` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `cimek`
--

INSERT INTO `cimek` (`CimId`, `hazszam`, `utca`, `telepulesNev`, `irsz`) VALUES
(1, '10', 'Fő utca', 'Budapest', '1011'),
(3, '25', 'Kossuth Lajos utca', 'Debrecen', '4025'),
(4, '3', 'Petofi ter', 'Szeged', '6720'),
(7, '-', '-', '-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `feladatok`
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
-- Dumping data for table `feladatok`
--

INSERT INTO `feladatok` (`FeladatId`, `nev`, `leiras`, `ismGyak`, `allapot`, `szinId`, `tipusId`, `hatarido`) VALUES
(1, 'Szerződés aláírása', 'Alá kell írni az új szerződést.', 'havi', 0, 1, 1, '2025-03-15'),
(2, 'Marketing kampány', 'Új kampány előkészítése.', 'negyedéves', 1, 2, 2, '2025-04-01'),
(3, 'Fejlesztési meeting', 'Technikai egyeztetés a fejlesztőkkel.', 'heti', 0, 3, 3, '2025-02-20'),
(4, 'Januári riport', 'Havi teljesítmény értékelése.', 'havi', 0, 1, 1, '2025-01-10'),
(5, 'Februári pénzügyi audit', 'Pénzügyi adatok ellenőrzése.', 'havi', 0, 2, 2, '2025-02-15'),
(6, 'Márciusi ügyféltalálkozó', 'Fontos ügyfelek meghívása és prezentáció.', 'havi', 1, 3, 3, '2025-03-20'),
(7, 'Áprilisi termékfejlesztés', 'Új termékötletek kidolgozása.', 'havi', 0, 1, 1, '2025-04-18'),
(8, 'Május havi értékesítési elemzés', 'Eladások felmérése és tervek módosítása.', 'havi', 0, 2, 2, '2025-05-12'),
(9, 'Júniusi HR megbeszélés', 'Új toborzási stratégiák megvitatása.', 'havi', 1, 3, 3, '2025-06-22'),
(10, 'Júliusi kampánytervezés', 'Marketing stratégiák kidolgozása.', 'havi', 0, 1, 1, '2025-07-05'),
(11, 'Augusztusi ügyfélkutatás', 'Ügyféligények felmérése és visszajelzések gyűjtése.', 'havi', 1, 2, 2, '2025-08-14'),
(12, 'Szeptemberi pénzügyi jelentés', 'Negyedéves pénzügyi helyzet értékelése.', 'havi', 0, 3, 3, '2025-09-28'),
(13, 'Októberi IT karbantartás', 'Szerverek és biztonsági rendszerek frissítése.', 'havi', 0, 1, 1, '2025-10-30'),
(14, 'Novemberi ügyfél-elégedettségi felmérés', 'Ügyfél-visszajelzések gyűjtése.', 'havi', 1, 2, 2, '2025-11-25'),
(15, 'Decemberi évzárás', 'Éves összegzés és új évi tervek kidolgozása.', 'havi', 0, 3, 3, '2025-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalofeladat`
--

CREATE TABLE `felhasznalofeladat` (
  `felkapcsId` int(11) NOT NULL,
  `feladatId` int(11) NOT NULL,
  `felhasznaloId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `felhasznalofeladat`
--

INSERT INTO `felhasznalofeladat` (`felkapcsId`, `feladatId`, `felhasznaloId`) VALUES
(2, 1, 8),
(3, 1, 20),
(4, 2, 8),
(5, 2, 15),
(6, 3, 8),
(7, 3, 20),
(8, 4, 8),
(9, 4, 19);

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `nev` varchar(50) NOT NULL,
  `telszam` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `FelhasznaloId` int(255) NOT NULL,
  `passwd_hash` blob NOT NULL,
  `passwd_salt` blob NOT NULL,
  `szerepkor` varchar(255) NOT NULL,
  `CegId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`nev`, `telszam`, `email`, `FelhasznaloId`, `passwd_hash`, `passwd_salt`, `szerepkor`, `CegId`) VALUES
('Kovács Péter', '06200001111', 'kovacs.peter@ceg1.hu', 8, 0x490c3e452097cd02e23aa9c0b29dae9c25249577b6711915b91c737f7b94161cec85d2737e4d081fa0581c2dcda7538a77905bbf469f1a2f52894c947583a928, 0x544e97733de71343146d38b2c5e1cdc896de9d0a573b05db80a4c9bd3ecdab6d9d8f0ebaab1aab74c681a4e3bacb4eae68d96a51d25c869ec5d155d49b8c9d77ad8df60f043709fb921a512ff0e05bfc89f65c6265a7a32f32db50c7b2957cd3411ba0c8c0bc305839c0958c9c9344b53882fa2b42c214ca1a03e737aed3a179, 'felhasználó', 6),
('Szabó Anna', '06201112222', 'szabo.anna@ceg2.hu', 10, 0x3c4a3f1337199ea8cb7d7a770bc7faebe480185906b90c7ca87203fc2a83a798e844ebda7f1a401aa3fb27369908b7389c607859b55db093b86c1cb5f305474d, 0x7db3a5d7d71f5e1b2349468d05c88bc2b2324453b2ce88cf6e9e541a6a193117a35517ce8e3641b7077f16b69b4dc6cc9990191f554c39d8f9e81ba46adab498da61b7d83aa00e080bb3455b471c50b31997ec824a4e4b29915e3ed90278b67b589c76676b4ab4cc1a8989b7ea00a0962c539849b96beb675d58eb88e3575ad3, 'felhasználó', 12),
('Molnár Zoltán', '06304576857', 'molnarzoltan@ugyfel.hu', 15, '', '', 'ügyfél', 13),
('Rhythm Niranjani', '06303568476', 'rhythmniranjani@ugyfel.hu', 16, '', '', 'ügyfél', 13),
('Tóth Erika', '06804657294', 'totherika1@gmail.com', 19, 0x693a14781397a5e8a5993bca492dd3017283080c054f210ba7607a2db911da8810408d0c54cfa6e7c0d4575c80268ca6e4aba77484103e58d39f78d07f3ae122, 0x61f8195d3c9be6aab8eb65c8806e6cfa495247f265ad03aa5cd858a1414efd612053f3286215e77cfae38c18799c8c2bc9d1b79761846ed154dd1852d4ae4380d8eb81787c2c1f96a0221b011e9fa353ea97241ecd92beda5998d0cc60a7f7426801bc996604e4e25a120bd0a2deb604b3cb93c74e4ed4699c2f5465cf3c4533, 'ügyfél', 13),
('Nagy László', '06644657238', 'nagylaszlo@ugyfel.hu', 20, '', '', 'ügyfél', 13);

-- --------------------------------------------------------

--
-- Table structure for table `formak`
--

CREATE TABLE `formak` (
  `FormaId` int(255) NOT NULL,
  `nev` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `formak`
--

INSERT INTO `formak` (`FormaId`, `nev`) VALUES
(1, '0'),
(2, '0'),
(3, 'Nincs forma');

-- --------------------------------------------------------

--
-- Table structure for table `szinek`
--

CREATE TABLE `szinek` (
  `SzinId` int(255) NOT NULL,
  `szinNev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `szinek`
--

INSERT INTO `szinek` (`SzinId`, `szinNev`) VALUES
(1, 'Piros'),
(2, 'Kék'),
(3, 'Zöld'),
(4, 'Narancs'),
(5, 'Lila'),
(6, 'Szürke'),
(7, 'Barna');

-- --------------------------------------------------------

--
-- Table structure for table `tipusok`
--

CREATE TABLE `tipusok` (
  `TipusId` int(255) NOT NULL,
  `tipusNev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `tipusok`
--

INSERT INTO `tipusok` (`TipusId`, `tipusNev`) VALUES
(1, 'Adminisztráció'),
(2, 'Pénzügy'),
(3, 'IT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cegek`
--
ALTER TABLE `cegek`
  ADD PRIMARY KEY (`CegId`),
  ADD KEY `Id` (`CegId`,`telszam`,`email`,`nev`,`formaId`,`cimId`),
  ADD KEY `formaId` (`formaId`),
  ADD KEY `cimId` (`cimId`);

--
-- Indexes for table `cimek`
--
ALTER TABLE `cimek`
  ADD PRIMARY KEY (`CimId`),
  ADD KEY `Id` (`CimId`,`hazszam`,`utca`);

--
-- Indexes for table `feladatok`
--
ALTER TABLE `feladatok`
  ADD PRIMARY KEY (`FeladatId`),
  ADD KEY `Id` (`FeladatId`,`nev`,`leiras`,`ismGyak`,`allapot`,`szinId`,`tipusId`,`hatarido`),
  ADD KEY `szinId` (`szinId`),
  ADD KEY `tipusId` (`tipusId`);

--
-- Indexes for table `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  ADD PRIMARY KEY (`felkapcsId`,`feladatId`,`felhasznaloId`),
  ADD KEY `felhasznaloId` (`felhasznaloId`),
  ADD KEY `feladatId` (`feladatId`);

--
-- Indexes for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`FelhasznaloId`),
  ADD KEY `veznev` (`nev`,`telszam`,`email`,`FelhasznaloId`),
  ADD KEY `CegId` (`CegId`);

--
-- Indexes for table `formak`
--
ALTER TABLE `formak`
  ADD PRIMARY KEY (`FormaId`),
  ADD KEY `Id` (`FormaId`,`nev`);

--
-- Indexes for table `szinek`
--
ALTER TABLE `szinek`
  ADD PRIMARY KEY (`SzinId`),
  ADD KEY `Id` (`SzinId`,`szinNev`);

--
-- Indexes for table `tipusok`
--
ALTER TABLE `tipusok`
  ADD PRIMARY KEY (`TipusId`),
  ADD KEY `Id` (`TipusId`,`tipusNev`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cegek`
--
ALTER TABLE `cegek`
  MODIFY `CegId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cimek`
--
ALTER TABLE `cimek`
  MODIFY `CimId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feladatok`
--
ALTER TABLE `feladatok`
  MODIFY `FeladatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  MODIFY `felkapcsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `FelhasznaloId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `formak`
--
ALTER TABLE `formak`
  MODIFY `FormaId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `szinek`
--
ALTER TABLE `szinek`
  MODIFY `SzinId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tipusok`
--
ALTER TABLE `tipusok`
  MODIFY `TipusId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cegek`
--
ALTER TABLE `cegek`
  ADD CONSTRAINT `cegek_ibfk_1` FOREIGN KEY (`formaId`) REFERENCES `formak` (`FormaId`),
  ADD CONSTRAINT `cegek_ibfk_2` FOREIGN KEY (`cimId`) REFERENCES `cimek` (`CimId`);

--
-- Constraints for table `feladatok`
--
ALTER TABLE `feladatok`
  ADD CONSTRAINT `feladatok_ibfk_1` FOREIGN KEY (`tipusId`) REFERENCES `tipusok` (`TipusId`),
  ADD CONSTRAINT `feladatok_ibfk_2` FOREIGN KEY (`szinId`) REFERENCES `szinek` (`SzinId`);

--
-- Constraints for table `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  ADD CONSTRAINT `felhasznalofeladat_ibfk_1` FOREIGN KEY (`felhasznaloId`) REFERENCES `felhasznalok` (`FelhasznaloId`),
  ADD CONSTRAINT `felhasznalofeladat_ibfk_2` FOREIGN KEY (`feladatId`) REFERENCES `feladatok` (`FeladatId`);

--
-- Constraints for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`CegId`) REFERENCES `cegek` (`CegId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
