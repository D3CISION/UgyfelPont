-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 11. 10:15
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
  `telszam` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `formaId` int(255) NOT NULL,
  `cimId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cegek`
--

INSERT INTO `cegek` (`CegId`, `telszam`, `email`, `nev`, `formaId`, `cimId`) VALUES
(6, '2147483647', 'info@ceg1.hu', 'Cég 1 Kft.', 1, 1),
(11, '2147483647', 'kapcsolat@ceg2.hu', 'Cég 2', 1, 3),
(12, '2147483647', 'hello@ceg3.hu', 'Cég 3', 1, 4),
(13, '0', '', '-', 3, 7),
(14, '2147483647', 'Gipszelo@gmail.com', 'Gipszelő Jakabok', 4, 8);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cimek`
--

CREATE TABLE `cimek` (
  `CimId` int(255) NOT NULL,
  `hazszam` varchar(40) NOT NULL,
  `utca` varchar(255) NOT NULL,
  `telepulesNev` varchar(255) NOT NULL,
  `irsz` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cimek`
--

INSERT INTO `cimek` (`CimId`, `hazszam`, `utca`, `telepulesNev`, `irsz`) VALUES
(1, '10', 'Fő utca', 'Budapest', 1011),
(3, '25', 'Kossuth Lajos utca', 'Debrecen', 4025),
(4, '3', 'Petofi ter', 'Szeged', 6720),
(7, '-', '-', '-', 0),
(8, '12', 'Fő utca', 'Szombathely', 9700);

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
  `szinId` varchar(255) NOT NULL,
  `hatarido` date NOT NULL,
  `csoport` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `feladatok`
--

INSERT INTO `feladatok` (`FeladatId`, `nev`, `leiras`, `ismGyak`, `allapot`, `szinId`, `hatarido`, `csoport`) VALUES
(1, 'Szerződés aláírása', 'Alá kell írni az új szerződést.', 'havi', 0, '#7e8ef7', '2025-02-15', 1),
(2, 'Marketing kampány', 'Új kampány előkészítése.', 'negyedéves', 1, '#f0b169', '2025-04-01', 2),
(3, 'Fejlesztési meeting', 'Technikai egyeztetés a fejlesztőkkel.', 'heti', 0, '#f0b169', '2025-02-20', 3),
(4, 'Januári riport', 'Havi teljesítmény értékelése.', 'havi', 0, '#5cab48', '2025-01-10', 4),
(5, 'Februári pénzügyi audit', 'Pénzügyi adatok ellenőrzése.', 'havi', 0, '#5cab48', '2025-02-15', 5),
(6, 'Márciusi ügyféltalálkozó', 'Fontos ügyfelek meghívása és prezentáció.', 'havi', 1, '#f0b169', '2025-03-20', 6),
(7, 'Áprilisi termékfejlesztés', 'Új termékötletek kidolgozása.', 'havi', 0, '#7e8ef7', '2025-04-18', 7),
(8, 'Május havi értékesítési elemzés', 'Eladások felmérése és tervek módosítása.', 'havi', 0, '#5cab48', '2025-05-12', 8),
(9, 'Júniusi HR megbeszélés', 'Új toborzási stratégiák megvitatása.', 'havi', 1, '#f0b169', '2025-06-22', 9),
(10, 'Júliusi kampánytervezés', 'Marketing stratégiák kidolgozása.', 'havi', 0, '#7e8ef7', '2025-07-05', 10),
(11, 'Augusztusi ügyfélkutatás', 'Ügyféligények felmérése és visszajelzések gyűjtése.', 'havi', 1, '#5cab48', '2025-08-14', 11),
(12, 'Szeptemberi pénzügyi jelentés', 'Negyedéves pénzügyi helyzet értékelése.', 'havi', 0, '#f0b169', '2025-09-28', 12),
(13, 'Októberi IT karbantartás', 'Szerverek és biztonsági rendszerek frissítése.', 'havi', 0, '#7e8ef7', '2025-10-30', 13),
(14, 'Novemberi ügyfél-elégedettségi felmérés', 'Ügyfél-visszajelzések gyűjtése.', 'havi', 1, '#5cab48', '2025-11-25', 14),
(15, 'Decemberi évzárás', 'Éves összegzés és új évi tervek kidolgozása.', 'havi', 0, '#f0b169', '2025-12-31', 15),
(16, 'Márciusi feladat', '', '1', 1, '#5cab48', '2025-03-18', 16),
(17, 'Márciusi feladat', '', '1', 1, '#5cab48', '2025-03-18', 17),
(19, 'dsa', 'dsa', 'egyszeri', 0, '#5cab48', '2025-03-06', 19),
(20, 'Feladat 1', 'Leírás 1', 'Egyszeri', 0, '#5cab48', '2025-01-15', 20),
(21, 'Feladat 2', 'Leírás 2', 'Heti', 0, '#74e3b1', '2025-02-10', 21),
(22, 'Feladat 3', 'Leírás 3', 'Havi', 1, '#7e8ef7', '2025-03-05', 22),
(23, 'Feladat 4', 'Leírás 4', 'Negyedéves', 0, '#c15ee6', '2025-04-22', 23),
(24, 'Feladat 5', 'Leírás 5', 'Féléves', 1, '#e6e675', '2025-05-18', 24),
(25, 'Feladat 6', 'Leírás 6', 'Éves', 0, '#f05e54', '2025-06-12', 25),
(26, 'Feladat 7', 'Leírás 7', 'Egyszeri', 1, '#f0b169', '2025-07-30', 26),
(27, 'Feladat 8', 'Leírás 8', 'Heti', 0, '#5cab48', '2025-08-14', 27),
(28, 'Feladat 9', 'Leírás 9', 'Havi', 1, '#74e3b1', '2025-09-21', 28),
(29, 'Feladat 10', 'Leírás 10', 'Negyedéves', 0, '#7e8ef7', '2025-10-06', 29),
(30, 'Feladat 11', 'Leírás 11', 'Féléves', 1, '#c15ee6', '2025-11-25', 30),
(31, 'Feladat 12', 'Leírás 12', 'Éves', 0, '#e6e675', '2025-12-01', 31),
(32, 'Feladat 13', 'Leírás 13', 'Egyszeri', 1, '#f05e54', '2025-01-07', 32),
(33, 'Feladat 14', 'Leírás 14', 'Heti', 0, '#f0b169', '2025-02-15', 33),
(34, 'Feladat 15', 'Leírás 15', 'Havi', 1, '#5cab48', '2025-03-30', 34),
(35, 'Feladat 16', 'Leírás 16', 'Negyedéves', 0, '#74e3b1', '2025-04-20', 35),
(36, 'Feladat 17', 'Leírás 17', 'Féléves', 1, '#7e8ef7', '2025-05-08', 36),
(37, 'Feladat 18', 'Leírás 18', 'Éves', 0, '#c15ee6', '2025-06-26', 37),
(38, 'Feladat 19', 'Leírás 19', 'Egyszeri', 1, '#e6e675', '2025-07-19', 38),
(39, 'Feladat 20', 'Leírás 20', 'Heti', 0, '#f05e54', '2025-08-29', 39),
(40, 'Feladat 21', 'Leírás 21', 'Havi', 1, '#f0b169', '2025-09-17', 40),
(41, 'Feladat 22', 'Leírás 22', 'Negyedéves', 0, '#5cab48', '2025-10-23', 41),
(42, 'Feladat 23', 'Leírás 23', 'Féléves', 1, '#74e3b1', '2025-11-11', 42),
(43, 'Feladat 24', 'Leírás 24', 'Éves', 0, '#7e8ef7', '2025-12-05', 43),
(44, 'Feladat 25', 'Leírás 25', 'Egyszeri', 1, '#c15ee6', '2025-01-29', 44),
(45, 'Feladat 26', 'Leírás 26', 'Heti', 0, '#e6e675', '2025-02-09', 45),
(46, 'Feladat 27', 'Leírás 27', 'Havi', 1, '#f05e54', '2025-03-22', 46),
(47, 'Feladat 28', 'Leírás 28', 'Negyedéves', 0, '#f0b169', '2025-04-18', 47),
(48, 'Feladat 29', 'Leírás 29', 'Féléves', 1, '#5cab48', '2025-05-28', 48),
(49, 'Feladat 30', 'Leírás 30', 'Éves', 0, '#74e3b1', '2025-06-09', 49),
(50, 'Feladat 1', 'Leírás 1', 'Egyszeri', 0, '#5cab48', '2025-01-15', 50),
(51, 'Feladat 2', 'Leírás 2', 'Heti', 0, '#74e3b1', '2025-02-10', 51),
(52, 'Feladat 3', 'Leírás 3', 'Havi', 1, '#7e8ef7', '2025-03-05', 52),
(53, 'Feladat 4', 'Leírás 4', 'Negyedéves', 0, '#c15ee6', '2025-04-22', 53),
(54, 'Feladat 5', 'Leírás 5', 'Féléves', 1, '#e6e675', '2025-05-18', 54),
(55, 'Feladat 6', 'Leírás 6', 'Éves', 0, '#f05e54', '2025-06-12', 55),
(56, 'Feladat 7', 'Leírás 7', 'Egyszeri', 1, '#f0b169', '2025-07-30', 56),
(57, 'Feladat 8', 'Leírás 8', 'Heti', 0, '#5cab48', '2025-08-14', 57),
(58, 'Feladat 9', 'Leírás 9', 'Havi', 1, '#74e3b1', '2025-09-21', 58),
(59, 'Feladat 10', 'Leírás 10', 'Negyedéves', 0, '#7e8ef7', '2025-10-06', 59),
(60, 'Feladat 11', 'Leírás 11', 'Féléves', 1, '#c15ee6', '2025-11-25', 60),
(61, 'Feladat 12', 'Leírás 12', 'Éves', 0, '#e6e675', '2025-12-01', 61),
(62, 'Feladat 13', 'Leírás 13', 'Egyszeri', 1, '#f05e54', '2025-01-07', 62),
(63, 'Feladat 14', 'Leírás 14', 'Heti', 0, '#f0b169', '2025-02-15', 63),
(64, 'Feladat 15', 'Leírás 15', 'Havi', 1, '#5cab48', '2025-03-30', 64),
(65, 'Feladat 16', 'Leírás 16', 'Negyedéves', 0, '#74e3b1', '2025-04-20', 65),
(66, 'Feladat 17', 'Leírás 17', 'Féléves', 1, '#7e8ef7', '2025-05-08', 66),
(67, 'Feladat 18', 'Leírás 18', 'Éves', 0, '#c15ee6', '2025-06-26', 67),
(68, 'Feladat 19', 'Leírás 19', 'Egyszeri', 1, '#e6e675', '2025-07-19', 68),
(69, 'Feladat 20', 'Leírás 20', 'Heti', 0, '#f05e54', '2025-08-29', 69),
(70, 'Feladat 21', 'Leírás 21', 'Havi', 1, '#f0b169', '2025-09-17', 70),
(71, 'Feladat 22', 'Leírás 22', 'Negyedéves', 0, '#5cab48', '2025-10-23', 71),
(72, 'Feladat 23', 'Leírás 23', 'Féléves', 1, '#74e3b1', '2025-11-11', 72),
(73, 'Feladat 24', 'Leírás 24', 'Éves', 0, '#7e8ef7', '2025-12-05', 73),
(74, 'Feladat 25', 'Leírás 25', 'Egyszeri', 1, '#c15ee6', '2025-01-29', 74),
(75, 'Feladat 26', 'Leírás 26', 'Heti', 0, '#e6e675', '2025-02-09', 75),
(76, 'Feladat 27', 'Leírás 27', 'Havi', 1, '#f05e54', '2025-03-22', 76),
(77, 'Feladat 28', 'Leírás 28', 'Negyedéves', 0, '#f0b169', '2025-04-18', 77),
(78, 'Feladat 29', 'Leírás 29', 'Féléves', 1, '#5cab48', '2025-05-28', 78),
(79, 'Feladat 30', 'Leírás 30', 'Éves', 0, '#74e3b1', '2025-06-09', 79);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalofeladat`
--

CREATE TABLE `felhasznalofeladat` (
  `felkapcsId` int(11) NOT NULL,
  `feladatId` int(11) NOT NULL,
  `felhasznaloId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalofeladat`
--

INSERT INTO `felhasznalofeladat` (`felkapcsId`, `feladatId`, `felhasznaloId`) VALUES
(2, 1, 8),
(3, 1, 20),
(4, 2, 8),
(5, 2, 15),
(6, 3, 8),
(7, 3, 20),
(8, 4, 8),
(9, 4, 19),
(10, 6, 8),
(11, 9, 8),
(12, 16, 8),
(13, 19, 8),
(136, 20, 8),
(137, 20, 31),
(138, 21, 8),
(139, 21, 36),
(140, 22, 8),
(141, 22, 30),
(142, 23, 8),
(143, 23, 33),
(144, 24, 8),
(145, 24, 38),
(146, 25, 8),
(147, 25, 29),
(148, 26, 8),
(149, 26, 32),
(150, 27, 8),
(151, 27, 35),
(152, 28, 8),
(153, 28, 37),
(154, 29, 8),
(155, 29, 34),
(156, 30, 8),
(157, 30, 31),
(158, 31, 8),
(159, 31, 29),
(160, 32, 8),
(161, 32, 38),
(162, 33, 8),
(163, 33, 30),
(164, 34, 8),
(165, 34, 32),
(166, 35, 8),
(167, 35, 35),
(168, 36, 8),
(169, 36, 33),
(170, 37, 8),
(171, 37, 37),
(172, 38, 8),
(173, 38, 36),
(174, 39, 8),
(175, 39, 31),
(176, 40, 8),
(177, 40, 29),
(178, 41, 8),
(179, 41, 38),
(180, 42, 8),
(181, 42, 35),
(182, 43, 8),
(183, 43, 37),
(184, 44, 8),
(185, 44, 32),
(186, 45, 8),
(187, 45, 33),
(188, 46, 8),
(189, 46, 30),
(190, 47, 8),
(191, 47, 36),
(192, 48, 8),
(193, 48, 34),
(194, 49, 8),
(195, 49, 31),
(196, 50, 8),
(197, 50, 29),
(198, 51, 8),
(199, 51, 38),
(200, 52, 8),
(201, 52, 30),
(202, 53, 8),
(203, 53, 35),
(204, 54, 8),
(205, 54, 33),
(206, 55, 8),
(207, 55, 32),
(208, 56, 8),
(209, 56, 37),
(210, 57, 8),
(211, 57, 36),
(212, 58, 8),
(213, 58, 34),
(214, 59, 8),
(215, 59, 31),
(216, 60, 8),
(217, 60, 29),
(218, 61, 8),
(219, 61, 38),
(220, 62, 8),
(221, 62, 35),
(222, 63, 8),
(223, 63, 32),
(224, 64, 8),
(225, 64, 33),
(226, 65, 8),
(227, 65, 30),
(228, 66, 8),
(229, 66, 37),
(230, 67, 8),
(231, 67, 36),
(232, 68, 8),
(233, 68, 31),
(234, 69, 8),
(235, 69, 29),
(236, 70, 8),
(237, 70, 38),
(238, 71, 8),
(239, 71, 35),
(240, 72, 8),
(241, 72, 32),
(242, 73, 8),
(243, 73, 33),
(244, 74, 8),
(245, 74, 34),
(246, 75, 8),
(247, 75, 37),
(248, 76, 8),
(249, 76, 30),
(250, 77, 8),
(251, 77, 36),
(252, 78, 8),
(253, 78, 31),
(254, 79, 8),
(255, 79, 29);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
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
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`nev`, `telszam`, `email`, `FelhasznaloId`, `passwd_hash`, `passwd_salt`, `szerepkor`, `CegId`) VALUES
('Kovács Péter', '06200001111', 'kovacs.peter@ceg1.hu', 8, 0x490c3e452097cd02e23aa9c0b29dae9c25249577b6711915b91c737f7b94161cec85d2737e4d081fa0581c2dcda7538a77905bbf469f1a2f52894c947583a928, 0x544e97733de71343146d38b2c5e1cdc896de9d0a573b05db80a4c9bd3ecdab6d9d8f0ebaab1aab74c681a4e3bacb4eae68d96a51d25c869ec5d155d49b8c9d77ad8df60f043709fb921a512ff0e05bfc89f65c6265a7a32f32db50c7b2957cd3411ba0c8c0bc305839c0958c9c9344b53882fa2b42c214ca1a03e737aed3a179, 'felhasználó', 6),
('Szabó Anna', '06201112222', 'szabo.anna@ceg2.hu', 10, 0x3c4a3f1337199ea8cb7d7a770bc7faebe480185906b90c7ca87203fc2a83a798e844ebda7f1a401aa3fb27369908b7389c607859b55db093b86c1cb5f305474d, 0x7db3a5d7d71f5e1b2349468d05c88bc2b2324453b2ce88cf6e9e541a6a193117a35517ce8e3641b7077f16b69b4dc6cc9990191f554c39d8f9e81ba46adab498da61b7d83aa00e080bb3455b471c50b31997ec824a4e4b29915e3ed90278b67b589c76676b4ab4cc1a8989b7ea00a0962c539849b96beb675d58eb88e3575ad3, 'felhasználó', 12),
('Molnár Zoltán', '06304576857', 'molnarzoltan@ugyfel.hu', 15, '', '', 'ügyfél', 13),
('Rhythm Niranjani', '06303568476', 'rhythmniranjani@ugyfel.hu', 16, '', '', 'ügyfél', 6),
('Tóth Erika', '06804657294', 'totherika1@gmail.com', 19, 0x693a14781397a5e8a5993bca492dd3017283080c054f210ba7607a2db911da8810408d0c54cfa6e7c0d4575c80268ca6e4aba77484103e58d39f78d07f3ae122, 0x61f8195d3c9be6aab8eb65c8806e6cfa495247f265ad03aa5cd858a1414efd612053f3286215e77cfae38c18799c8c2bc9d1b79761846ed154dd1852d4ae4380d8eb81787c2c1f96a0221b011e9fa353ea97241ecd92beda5998d0cc60a7f7426801bc996604e4e25a120bd0a2deb604b3cb93c74e4ed4699c2f5465cf3c4533, 'ügyfél', 13),
('Nagy László', '06644657238', 'nagylaszlo@ugyfel.hu', 20, '', '', 'ügyfél', 6),
('Gipsz Jakab', '06200001111', 'probaproba@gmail.com', 21, 0xea848d09acdb50051ef1add4ed38ecfabb12b866c4a10a2edae8968350caae433e6adde0df4a7747bc90ac80b231535a6086245f662c85ebbd22758160fc00f1, 0x790cef01b12c2300d0c7330f78d7261631dbf91417176a88589d06aa9a07e9dca044ca313bbfa07ea8b5477aaa488dbe9171c838112c95dd54cf5402f4390c6d68a65c0dc5646301cba91f4516adf7e3cb90c34ffd33b2e543378c3a2f8576a374f91dc4bc364b50f6440a47c3c5f3ead684b3dac3e760173d9fcd8a403be878, 'felhasználó', 14),
('Kiss Péter', '06301112233', 'peter.kiss@example.com', 29, 0x6861736831, 0x73616c7431, 'ügyfél', 6),
('Nagy Éva', '06302223344', 'eva.nagy@example.com', 30, 0x6861736832, 0x73616c7432, 'ügyfél', 6),
('Tóth Gábor', '06303334455', 'gabor.toth@example.com', 31, 0x6861736833, 0x73616c7433, 'ügyfél', 6),
('Szabó Anna', '06304445566', 'anna.szabo@example.com', 32, 0x6861736834, 0x73616c7434, 'ügyfél', 6),
('Horváth László', '06305556677', 'laszlo.horvath@example.com', 33, 0x6861736835, 0x73616c7435, 'ügyfél', 6),
('Varga Zoltán', '06306667788', 'zoltan.varga@example.com', 34, 0x6861736836, 0x73616c7436, 'ügyfél', 6),
('Kovács Mária', '06307778899', 'maria.kovacs@example.com', 35, 0x6861736837, 0x73616c7437, 'ügyfél', 6),
('Balogh Bence', '06308889900', 'bence.balogh@example.com', 36, 0x6861736838, 0x73616c7438, 'ügyfél', 6),
('Molnár Júlia', '06309990011', 'julia.molnar@example.com', 37, 0x6861736839, 0x73616c7439, 'ügyfél', 6),
('Farkas Tamás', '06301001122', 'tamas.farkas@example.com', 38, 0x686173683130, 0x73616c743130, 'ügyfél', 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `formak`
--

CREATE TABLE `formak` (
  `FormaId` int(255) NOT NULL,
  `nev` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `formak`
--

INSERT INTO `formak` (`FormaId`, `nev`) VALUES
(1, '0'),
(2, '0'),
(3, 'Nincs forma'),
(4, 'Egyéni vállalkozás');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szinek`
--

CREATE TABLE `szinek` (
  `SzinId` varchar(10) NOT NULL,
  `szinNev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szinek`
--

INSERT INTO `szinek` (`SzinId`, `szinNev`) VALUES
('#5cab48', 'Zöld'),
('#74e3b1', 'Türkiz'),
('#7e8ef7', 'Kék'),
('#c15ee6', 'Lila'),
('#e6e675', 'Homok'),
('#f05e54', 'Piros'),
('#f0b169', 'Narancs');

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
  ADD KEY `Id` (`FeladatId`,`nev`,`leiras`,`ismGyak`,`allapot`,`szinId`,`hatarido`),
  ADD KEY `szinId` (`szinId`),
  ADD KEY `csoport` (`csoport`);

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
  ADD KEY `veznev` (`nev`,`telszam`,`email`,`FelhasznaloId`),
  ADD KEY `CegId` (`CegId`);

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
  ADD PRIMARY KEY (`SzinId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cegek`
--
ALTER TABLE `cegek`
  MODIFY `CegId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `cimek`
--
ALTER TABLE `cimek`
  MODIFY `CimId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `feladatok`
--
ALTER TABLE `feladatok`
  MODIFY `FeladatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT a táblához `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  MODIFY `felkapcsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `FelhasznaloId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT a táblához `formak`
--
ALTER TABLE `formak`
  MODIFY `FormaId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cegek`
--
ALTER TABLE `cegek`
  ADD CONSTRAINT `cegek_ibfk_1` FOREIGN KEY (`formaId`) REFERENCES `formak` (`FormaId`),
  ADD CONSTRAINT `cegek_ibfk_2` FOREIGN KEY (`cimId`) REFERENCES `cimek` (`CimId`);

--
-- Megkötések a táblához `feladatok`
--
ALTER TABLE `feladatok`
  ADD CONSTRAINT `feladatok_ibfk_1` FOREIGN KEY (`szinId`) REFERENCES `szinek` (`SzinId`);

--
-- Megkötések a táblához `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  ADD CONSTRAINT `felhasznalofeladat_ibfk_1` FOREIGN KEY (`felhasznaloId`) REFERENCES `felhasznalok` (`FelhasznaloId`),
  ADD CONSTRAINT `felhasznalofeladat_ibfk_2` FOREIGN KEY (`feladatId`) REFERENCES `feladatok` (`FeladatId`);

--
-- Megkötések a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`CegId`) REFERENCES `cegek` (`CegId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
