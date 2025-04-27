-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 24, 2025 at 06:32 PM
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

CREATE DATABASE ugyfelnyilvantartas
CHARACTER SET 'utf8' COLLATE 'utf8_hungarian_ci';
USE ugyfelnyilvantartas;
-- --------------------------------------------------------

--
-- Table structure for table `cegek`
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
-- Dumping data for table `cegek`
--

INSERT INTO `cegek` (`CegId`, `telszam`, `email`, `nev`, `formaId`, `cimId`) VALUES
(18, '+36112223333', 'viktorcege@ceg1.hu', 'Viktor cége', 3, 10),
(19, '+36203525021', 'aroncege@ceg2.hu', 'Áron cége', 4, 12);

-- --------------------------------------------------------

--
-- Table structure for table `cimek`
--

CREATE TABLE `cimek` (
  `CimId` int(255) NOT NULL,
  `hazszam` varchar(40) NOT NULL,
  `utca` varchar(255) NOT NULL,
  `telepulesNev` varchar(255) NOT NULL,
  `irsz` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `cimek`
--

INSERT INTO `cimek` (`CimId`, `hazszam`, `utca`, `telepulesNev`, `irsz`) VALUES
(10, '4.', 'Kitalált', 'Szombathely', 9700),
(12, '2.', 'Valami', 'Nyírbogát', 4361);

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
  `szinId` varchar(255) NOT NULL,
  `hatarido` datetime NOT NULL,
  `csoport` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `feladatok`
--

INSERT INTO `feladatok` (`FeladatId`, `nev`, `leiras`, `ismGyak`, `allapot`, `szinId`, `hatarido`, `csoport`) VALUES
(259, 'Ügyféladatok frissítése', 'Ügyfél adatbázis aktualizálása', 'Egyszeri', 0, '#5cab48', '2025-05-01 09:00:00', 0),
(260, 'Havi jelentés készítése', 'Havi pénzügyi jelentés összeállítása', 'Havi', 1, '#74e3b1', '2025-05-15 17:00:00', 1),
(261, 'Éves közgyűlés előkészítése', 'Dokumentumok előkészítése az éves közgyűlésre', 'Éves', 0, '#7e8ef7', '2025-12-10 14:00:00', 2),
(262, 'Weboldal karbantartás', 'Weboldal biztonsági frissítése', 'Negyedéves', 1, '#c15ee6', '2025-07-01 10:00:00', 3),
(263, 'Ügyféltalálkozó szervezése', 'Találkozó időpont egyeztetése ügyfelekkel', 'Féléves', 0, '#e6e675', '2025-09-20 15:00:00', 4),
(264, 'Képzés szervezése', 'Dolgozók képzése új szoftverre', 'Egyszeri', 1, '#f05e54', '2025-06-10 09:00:00', 5),
(265, 'Hírlevél kiküldése', 'Havi hírlevél elkészítése és kiküldése', 'Havi', 0, '#f0b169', '2025-05-30 12:00:00', 6),
(266, 'Adóbevallás előkészítése', 'Adóbevallási dokumentumok összegyűjtése', 'Éves', 1, '#5cab48', '2026-03-15 16:00:00', 7),
(267, 'Raktárleltár', 'Raktárkészlet ellenőrzése', 'Negyedéves', 0, '#74e3b1', '2025-06-30 13:00:00', 8),
(268, 'Marketing kampány tervezése', 'Új marketing kampány kidolgozása', 'Féléves', 1, '#7e8ef7', '2025-08-15 11:00:00', 9),
(269, 'Szerződések felülvizsgálata', 'Meglévő szerződések ellenőrzése', 'Egyszeri', 0, '#c15ee6', '2025-05-25 14:00:00', 10),
(270, 'Ügyfél visszajelzések elemzése', 'Ügyfél visszajelzések összegzése', 'Havi', 1, '#e6e675', '2025-06-05 10:00:00', 11),
(271, 'Éves költségvetés tervezése', 'Következő év költségvetésének előkészítése', 'Éves', 0, '#f05e54', '2025-11-30 15:00:00', 12),
(272, 'IT rendszerek frissítése', 'Szoftverek és rendszerek frissítése', 'Negyedéves', 1, '#f0b169', '2025-07-15 09:00:00', 13),
(273, 'Csapatépítő szervezése', 'Csapatépítő esemény tervezése', 'Féléves', 0, '#5cab48', '2025-10-10 16:00:00', 14),
(274, 'Új ügyfél regisztráció', 'Új ügyfél adatainak rögzítése', 'Egyszeri', 1, '#74e3b1', '2025-05-10 11:00:00', 15),
(275, 'Pénzügyi audit előkészítése', 'Dokumentumok előkészítése auditra', 'Havi', 0, '#7e8ef7', '2025-06-20 14:00:00', 16),
(276, 'Éves beszámoló készítése', 'Cég éves beszámolójának összeállítása', 'Éves', 1, '#c15ee6', '2026-01-15 12:00:00', 17),
(277, 'Rendszergazdai feladatok', 'Szerver karbantartása', 'Negyedéves', 0, '#e6e675', '2025-08-01 10:00:00', 18),
(278, 'Ügyfélkapcsolati stratégia', 'Ügyfélkapcsolati terv frissítése', 'Féléves', 1, '#f05e54', '2025-09-01 13:00:00', 19),
(279, 'Új projekt indítása', 'Projektterv kidolgozása', 'Egyszeri', 0, '#f0b169', '2025-05-15 15:00:00', 20),
(280, 'Havi teljesítmény riport', 'Munkatársak teljesítményének elemzése', 'Havi', 1, '#5cab48', '2025-06-01 09:00:00', 21),
(281, 'Éves stratégiai tervezés', 'Cég stratégiai céljainak meghatározása', 'Éves', 0, '#74e3b1', '2025-12-01 14:00:00', 22),
(282, 'Biztonsági ellenőrzés', 'Irodai biztonsági rendszerek tesztelése', 'Negyedéves', 1, '#7e8ef7', '2025-07-10 11:00:00', 23),
(283, 'Dolgozói elégedettség felmérés', 'Kérdőív készítése és kiértékelése', 'Féléves', 0, '#c15ee6', '2025-10-15 12:00:00', 24),
(284, 'Új beszállító keresése', 'Beszállítói ajánlatok bekérése', 'Egyszeri', 1, '#e6e675', '2025-05-20 10:00:00', 25),
(285, 'Havi számlázás', 'Ügyfél számlák kiállítása', 'Havi', 0, '#f05e54', '2025-06-10 16:00:00', 26),
(286, 'Éves adótervezés', 'Adózási stratégia kidolgozása', 'Éves', 1, '#f0b169', '2025-12-15 13:00:00', 27),
(287, 'Raktár optimalizálás', 'Raktár elrendezésének átalakítása', 'Negyedéves', 0, '#5cab48', '2025-08-15 14:00:00', 28),
(288, 'Ügyfélpanaszok kezelése', 'Panaszok kivizsgálása és megoldása', 'Féléves', 1, '#74e3b1', '2025-09-10 11:00:00', 29),
(289, 'Új szoftver bevezetése', 'Szoftver telepítése és tesztelése', 'Egyszeri', 0, '#7e8ef7', '2025-05-30 09:00:00', 30),
(290, 'Havi meeting szervezése', 'Havi csapattalálkozó előkészítése', 'Havi', 1, '#c15ee6', '2025-06-15 15:00:00', 31),
(291, 'Éves beszállítói tárgyalás', 'Beszállítókkal való egyeztetés', 'Éves', 0, '#e6e675', '2026-01-10 10:00:00', 32),
(292, 'Rendszeres karbantartás', 'Irodai eszközök ellenőrzése', 'Negyedéves', 1, '#f05e54', '2025-07-20 12:00:00', 33),
(293, 'Új ügyfélkampány', 'Célzott kampány kidolgozása', 'Féléves', 0, '#f0b169', '2025-10-01 14:00:00', 34),
(294, 'Adatbázis tisztítás', 'Elavult adatok törlése', 'Egyszeri', 1, '#5cab48', '2025-06-05 11:00:00', 35),
(295, 'Havi költségvetés ellenőrzés', 'Kiadások és bevételek áttekintése', 'Havi', 0, '#74e3b1', '2025-06-25 13:00:00', 36),
(296, 'Éves célok felülvizsgálata', 'Céges célok értékelése', 'Éves', 1, '#7e8ef7', '2025-12-20 15:00:00', 37),
(297, 'Hálózati biztonsági teszt', 'Hálózati rendszerek ellenőrzése', 'Negyedéves', 0, '#c15ee6', '2025-08-10 09:00:00', 38),
(298, 'Új munkatárs onboarding', 'Új kolléga betanítása', 'Féléves', 1, '#e6e675', '2025-09-15 10:00:00', 39),
(299, 'Projekt dokumentáció', 'Projekt dokumentumok rendszerezése', 'Egyszeri', 0, '#f05e54', '2025-06-01 12:00:00', 40),
(300, 'Havi hírlevél tervezése', 'Hírlevél tartalom összeállítása', 'Havi', 1, '#f0b169', '2025-06-20 14:00:00', 41),
(301, 'Éves beszámoló benyújtása', 'Hatóságok felé benyújtandó dokumentumok', 'Éves', 0, '#5cab48', '2026-02-01 11:00:00', 42),
(302, 'Irodai eszközleltár', 'Irodai eszközök felmérése', 'Negyedéves', 1, '#74e3b1', '2025-07-25 13:00:00', 43),
(303, 'Ügyfél elégedettség felmérés', 'Ügyfél visszajelzések gyűjtése', 'Féléves', 0, '#7e8ef7', '2025-10-20 15:00:00', 44),
(304, 'Új termék bevezetése', 'Termék piacra dobásának előkészítése', 'Egyszeri', 1, '#c15ee6', '2025-06-10 09:00:00', 45),
(305, 'Havi riport készítése', 'Ügyféladatok elemzése', 'Havi', 0, '#e6e675', '2025-07-01 10:00:00', 46),
(306, 'Éves stratégiai meeting', 'Stratégiai célok átbeszélése', 'Éves', 1, '#f05e54', '2025-12-05 14:00:00', 47),
(307, 'Rendszerek biztonsági mentése', 'Adatok biztonsági mentése', 'Negyedéves', 0, '#f0b169', '2025-08-20 11:00:00', 48),
(308, 'Új marketing stratégia', 'Marketing terv kidolgozása', 'Féléves', 1, '#5cab48', '2025-09-20 12:00:00', 49),
(309, 'Adatbázis optimalizálás', 'Adatbázis teljesítményének javítása', 'Egyszeri', 0, '#74e3b1', '2025-06-15 13:00:00', 50),
(310, 'Havi ügyfélértekezlet', 'Ügyfélproblémák átbeszélése', 'Havi', 1, '#7e8ef7', '2025-07-10 15:00:00', 51),
(311, 'Éves adóellenőrzés előkészítése', 'Adóellenőrzéshez szükséges dokumentumok', 'Éves', 0, '#c15ee6', '2026-02-15 09:00:00', 52),
(312, 'Raktár rendszerezése', 'Raktár újrarendezése', 'Negyedéves', 1, '#e6e675', '2025-09-01 10:00:00', 53),
(313, 'Új ügyfélkapcsolat építése', 'Új ügyfelek megkeresése', 'Féléves', 0, '#f05e54', '2025-10-05 11:00:00', 54),
(314, 'Szoftverfrissítés tesztelése', 'Új szoftververzió tesztelése', 'Egyszeri', 1, '#f0b169', '2025-06-20 12:00:00', 55),
(315, 'Havi költség riport', 'Költségek részletes elemzése', 'Havi', 0, '#5cab48', '2025-07-15 14:00:00', 56),
(316, 'Éves teljesítményértékelés', 'Munkatársak értékelése', 'Éves', 1, '#74e3b1', '2025-12-10 15:00:00', 57),
(317, 'Irodai hálózat karbantartása', 'Hálózati eszközök ellenőrzése', 'Negyedéves', 0, '#7e8ef7', '2025-09-10 09:00:00', 58),
(318, 'Új kampány elemzése', 'Kampány eredményeinek kiértékelése', 'Féléves', 1, '#c15ee6', '2025-10-15 10:00:00', 59),
(319, 'Projekt zárása', 'Projekt dokumentumok archiválása', 'Egyszeri', 0, '#e6e675', '2025-06-25 11:00:00', 60),
(320, 'Havi ügyfél visszajelzés', 'Ügyfél elégedettség elemzése', 'Havi', 1, '#f05e54', '2025-07-20 13:00:00', 61),
(321, 'Éves költségvetés felülvizsgálata', 'Költségvetés újratervezése', 'Éves', 0, '#f0b169', '2026-01-05 14:00:00', 62),
(322, 'Rendszerek frissítése', 'Szoftverek naprakész állapotban tartása', 'Negyedéves', 1, '#5cab48', '2025-09-15 15:00:00', 63),
(323, 'Új ügyfélprogram indítása', 'Ügyfélhűség program kidolgozása', 'Féléves', 0, '#74e3b1', '2025-10-25 09:00:00', 64),
(324, 'Adatbázis karbantartása', 'Adatbázis integritásának ellenőrzése', 'Egyszeri', 1, '#7e8ef7', '2025-07-01 10:00:00', 65),
(325, 'Havi pénzügyi elemzés', 'Pénzügyi adatok áttekintése', 'Havi', 0, '#c15ee6', '2025-07-25 11:00:00', 66),
(326, 'Éves közgyűlés szervezése', 'Közgyűlés előkészítése', 'Éves', 1, '#e6e675', '2026-01-15 12:00:00', 67),
(327, 'Irodai rendszerek tesztelése', 'Rendszerek stabilitásának ellenőrzése', 'Negyedéves', 0, '#f05e54', '2025-09-20 13:00:00', 68),
(328, 'Új beszállítói kapcsolat', 'Beszállítók felkutatása', 'Féléves', 1, '#f0b169', '2025-11-01 14:00:00', 69),
(329, 'Új projekt tervezése', 'Projekt részleteinek kidolgozása', 'Egyszeri', 0, '#5cab48', '2025-07-05 15:00:00', 70),
(330, 'Havi riport összeállítása', 'Teljesítmény riport készítése', 'Havi', 1, '#74e3b1', '2025-08-01 09:00:00', 71),
(331, 'Éves stratégiai célok', 'Céges célok meghatározása', 'Éves', 0, '#7e8ef7', '2026-01-20 10:00:00', 72),
(332, 'Raktár ellenőrzése', 'Raktárkészlet felülvizsgálata', 'Negyedéves', 1, '#c15ee6', '2025-10-01 11:00:00', 73),
(333, 'Ügyfélkapcsolat erősítése', 'Ügyfélkapcsolatok ápolása', 'Féléves', 0, '#e6e675', '2025-11-10 12:00:00', 74),
(334, 'Új szoftver telepítése', 'Szoftver bevezetése', 'Egyszeri', 1, '#f05e54', '2025-07-10 13:00:00', 75),
(335, 'Havi meeting előkészítése', 'Csapattalálkozó szervezése', 'Havi', 0, '#f0b169', '2025-08-10 14:00:00', 76),
(336, 'Éves beszámoló előkészítése', 'Beszámoló dokumentumok összeállítása', 'Éves', 1, '#5cab48', '2026-02-01 15:00:00', 77),
(337, 'Irodai eszközök karbantartása', 'Eszközök ellenőrzése', 'Negyedéves', 0, '#74e3b1', '2025-10-10 09:00:00', 78),
(338, 'Új marketing kampány', 'Kampány tervezése', 'Féléves', 1, '#7e8ef7', '2025-11-15 10:00:00', 79),
(339, 'Adatbázis biztonsági mentés', 'Adatok archiválása', 'Egyszeri', 0, '#c15ee6', '2025-07-15 11:00:00', 80),
(340, 'Havi pénzügyi riport', 'Pénzügyi teljesítmény elemzése', 'Havi', 1, '#e6e675', '2025-08-15 12:00:00', 81),
(341, 'Éves adóstratégia', 'Adózási terv kidolgozása', 'Éves', 0, '#f05e54', '2026-02-10 13:00:00', 82),
(342, 'Rendszerek karbantartása', 'Rendszerek frissítése', 'Negyedéves', 1, '#f0b169', '2025-10-15 14:00:00', 83),
(343, 'Új ügyfélkampány tervezése', 'Célzott kampány előkészítése', 'Féléves', 0, '#5cab48', '2025-11-20 15:00:00', 84),
(344, 'Projekt dokumentáció készítése', 'Projekt záró dokumentumok', 'Egyszeri', 1, '#74e3b1', '2025-07-20 09:00:00', 85),
(345, 'Havi ügyfél visszajelzés', 'Ügyfélpanaszok elemzése', 'Havi', 0, '#7e8ef7', '2025-08-20 10:00:00', 86),
(346, 'Éves teljesítmény riport', 'Munkatársak teljesítményének áttekintése', 'Éves', 1, '#c15ee6', '2026-02-15 11:00:00', 87),
(347, 'Irodai hálózat tesztelése', 'Hálózati rendszerek ellenőrzése', 'Negyedéves', 0, '#e6e675', '2025-10-20 12:00:00', 88),
(348, 'Új beszállítói tárgyalás', 'Beszállítói ajánlatok elemzése', 'Féléves', 1, '#f05e54', '2025-12-01 13:00:00', 89),
(349, 'Új projekt indítása', 'Projektterv kidolgozása', 'Egyszeri', 0, '#f0b169', '2025-07-25 14:00:00', 90),
(350, 'Havi költségvetés elemzése', 'Kiadások és bevételek áttekintése', 'Havi', 1, '#5cab48', '2025-08-25 15:00:00', 91),
(351, 'Éves stratégiai tervezés', 'Céges stratégia kidolgozása', 'Éves', 0, '#74e3b1', '2026-02-20 09:00:00', 92),
(352, 'Raktár optimalizálása', 'Raktár elrendezésének javítása', 'Negyedéves', 1, '#7e8ef7', '2025-10-25 10:00:00', 93),
(353, 'Ügyfélkapcsolati stratégia', 'Ügyfélkapcsolatok fejlesztése', 'Féléves', 0, '#c15ee6', '2025-12-05 11:00:00', 94),
(354, 'Szoftverfrissítés bevezetése', 'Új szoftververzió telepítése', 'Egyszeri', 1, '#e6e675', '2025-08-01 12:00:00', 95),
(355, 'Havi riport készítése', 'Teljesítmény riport összeállítása', 'Havi', 0, '#f05e54', '2025-09-01 13:00:00', 96),
(356, 'Éves beszámoló benyújtása', 'Hatóságok felé benyújtandó dokumentumok', 'Éves', 1, '#f0b169', '2026-03-01 14:00:00', 97),
(357, 'Irodai eszközleltár', 'Irodai eszközök felmérése', 'Negyedéves', 0, '#5cab48', '2025-11-01 15:00:00', 98),
(358, 'Új ügyfél elégedettség felmérés', 'Ügyfél visszajelzések gyűjtése', 'Féléves', 1, '#74e3b1', '2025-12-10 09:00:00', 99),
(359, 'Új termék bevezetése', 'Termék piacra dobásának előkészítése', 'Egyszeri', 0, '#7e8ef7', '2025-08-05 10:00:00', 100),
(360, 'Havi pénzügyi elemzés', 'Pénzügyi adatok áttekintése', 'Havi', 1, '#c15ee6', '2025-09-05 11:00:00', 101),
(361, 'Éves közgyűlés előkészítése', 'Közgyűlés dokumentumainak összeállítása', 'Éves', 0, '#e6e675', '2026-03-05 12:00:00', 102),
(362, 'Rendszerek biztonsági mentése', 'Adatok biztonsági mentése', 'Negyedéves', 1, '#f05e54', '2025-11-05 13:00:00', 103),
(363, 'Új marketing stratégia', 'Marketing terv kidolgozása', 'Féléves', 0, '#f0b169', '2025-12-15 14:00:00', 104),
(364, 'Adatbázis optimalizálás', 'Adatbázis teljesítményének javítása', 'Egyszeri', 1, '#5cab48', '2025-08-10 15:00:00', 105),
(365, 'Havi ügyfélértekezlet', 'Ügyfélproblémák átbeszélése', 'Havi', 0, '#74e3b1', '2025-09-10 09:00:00', 106),
(366, 'Éves adóellenőrzés előkészítése', 'Adóellenőrzéshez szükséges dokumentumok', 'Éves', 1, '#7e8ef7', '2026-03-10 10:00:00', 107),
(367, 'Raktár rendszerezése', 'Raktár újrarendezése', 'Negyedéves', 0, '#c15ee6', '2025-11-10 11:00:00', 108),
(368, 'Új ügyfélkapcsolat építése', 'Új ügyfelek megkeresése', 'Féléves', 1, '#e6e675', '2025-12-20 12:00:00', 109),
(369, 'Szoftverfrissítés tesztelése', 'Új szoftververzió tesztelése', 'Egyszeri', 0, '#f05e54', '2025-08-15 13:00:00', 110),
(370, 'Havi költség riport', 'Költségek részletes elemzése', 'Havi', 1, '#f0b169', '2025-09-15 14:00:00', 111),
(371, 'Éves teljesítményértékelés', 'Munkatársak értékelése', 'Éves', 0, '#5cab48', '2026-03-15 15:00:00', 112),
(372, 'Irodai hálózat karbantartása', 'Hálózati eszközök ellenőrzése', 'Negyedéves', 1, '#74e3b1', '2025-11-15 09:00:00', 113),
(373, 'Új kampány elemzése', 'Kampány eredményeinek kiértékelése', 'Féléves', 0, '#7e8ef7', '2026-01-01 10:00:00', 114),
(374, 'Projekt zárása', 'Projekt dokumentumok archiválása', 'Egyszeri', 1, '#c15ee6', '2025-08-20 11:00:00', 115),
(375, 'Havi ügyfél visszajelzés', 'Ügyfél elégedettség elemzése', 'Havi', 0, '#e6e675', '2025-09-20 12:00:00', 116),
(376, 'Éves költségvetés felülvizsgálata', 'Költségvetés újratervezése', 'Éves', 1, '#f05e54', '2026-03-20 13:00:00', 117),
(377, 'Rendszerek frissítése', 'Szoftverek naprakész állapotban tartása', 'Negyedéves', 0, '#f0b169', '2025-11-20 14:00:00', 118),
(378, 'Új ügyfélprogram indítása', 'Ügyfélhűség program kidolgozása', 'Féléves', 1, '#5cab48', '2026-01-05 15:00:00', 119),
(379, 'Adatbázis karbantartása', 'Adatbázis integritásának ellenőrzése', 'Egyszeri', 0, '#74e3b1', '2025-08-25 09:00:00', 120),
(380, 'Havi pénzügyi elemzés', 'Pénzügyi adatok áttekintése', 'Havi', 1, '#7e8ef7', '2025-09-25 10:00:00', 121),
(381, 'Éves közgyűlés szervezése', 'Közgyűlés előkészítése', 'Éves', 0, '#c15ee6', '2026-03-25 11:00:00', 122),
(382, 'Irodai rendszerek tesztelése', 'Rendszerek stabilitásának ellenőrzése', 'Negyedéves', 1, '#e6e675', '2025-11-25 12:00:00', 123),
(383, 'Új beszállítói kapcsolat', 'Beszállítók felkutatása', 'Féléves', 0, '#f05e54', '2026-01-10 13:00:00', 124),
(384, 'Új projekt tervezése', 'Projekt részleteinek kidolgozása', 'Egyszeri', 1, '#f0b169', '2025-09-01 14:00:00', 125),
(385, 'Havi riport összeállítása', 'Teljesítmény riport készítése', 'Havi', 0, '#5cab48', '2025-10-01 15:00:00', 126),
(386, 'Éves stratégiai célok', 'Céges célok meghatározása', 'Éves', 1, '#74e3b1', '2026-03-30 09:00:00', 127),
(387, 'Raktár ellenőrzése', 'Raktárkészlet felülvizsgálata', 'Negyedéves', 0, '#7e8ef7', '2025-12-01 10:00:00', 128),
(388, 'Ügyfélkapcsolat erősítése', 'Ügyfélkapcsolatok ápolása', 'Féléves', 1, '#c15ee6', '2026-01-15 11:00:00', 129),
(389, 'Új szoftver telepítése', 'Szoftver bevezetése', 'Egyszeri', 0, '#e6e675', '2025-09-05 12:00:00', 130),
(390, 'Havi meeting előkészítése', 'Csapattalálkozó szervezése', 'Havi', 1, '#f05e54', '2025-10-05 13:00:00', 131),
(391, 'Éves beszámoló előkészítése', 'Beszámoló dokumentumok összeállítása', 'Éves', 0, '#f0b169', '2026-04-01 14:00:00', 132),
(392, 'Irodai eszközök karbantartása', 'Eszközök ellenőrzése', 'Negyedéves', 1, '#5cab48', '2025-12-05 15:00:00', 133),
(393, 'Új marketing kampány', 'Kampány tervezése', 'Féléves', 0, '#74e3b1', '2026-01-20 09:00:00', 134),
(394, 'Adatbázis biztonsági mentés', 'Adatok archiválása', 'Egyszeri', 1, '#7e8ef7', '2025-09-10 10:00:00', 135),
(395, 'Havi pénzügyi riport', 'Pénzügyi teljesítmény elemzése', 'Havi', 0, '#c15ee6', '2025-10-10 11:00:00', 136),
(396, 'Éves adóstratégia', 'Adózási terv kidolgozása', 'Éves', 1, '#e6e675', '2026-04-05 12:00:00', 137),
(397, 'Rendszerek karbantartása', 'Rendszerek frissítése', 'Negyedéves', 0, '#f05e54', '2025-12-10 13:00:00', 138),
(398, 'Új ügyfélkampány tervezése', 'Célzott kampány előkészítése', 'Féléves', 1, '#f0b169', '2026-01-25 14:00:00', 139),
(399, 'Projekt dokumentáció készítése', 'Projekt záró dokumentumok', 'Egyszeri', 0, '#5cab48', '2025-09-15 15:00:00', 140),
(400, 'Havi ügyfél visszajelzés', 'Ügyfélpanaszok elemzése', 'Havi', 1, '#74e3b1', '2025-10-15 09:00:00', 141),
(401, 'Éves teljesítmény riport', 'Munkatársak teljesítményének áttekintése', 'Éves', 0, '#7e8ef7', '2026-04-10 10:00:00', 142),
(402, 'Irodai hálózat tesztelése', 'Hálózati rendszerek ellenőrzése', 'Negyedéves', 1, '#c15ee6', '2025-12-15 11:00:00', 143);

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
(869, 259, 191),
(870, 259, 179),
(871, 260, 191),
(872, 260, 179),
(873, 261, 191),
(874, 261, 179),
(875, 262, 191),
(876, 262, 179),
(877, 263, 191),
(878, 263, 179),
(879, 264, 191),
(880, 264, 179),
(881, 265, 191),
(882, 265, 180),
(883, 266, 191),
(884, 266, 180),
(885, 267, 191),
(886, 267, 180),
(887, 268, 191),
(888, 268, 180),
(889, 269, 191),
(890, 269, 180),
(891, 270, 191),
(892, 270, 180),
(893, 271, 191),
(894, 271, 181),
(895, 272, 191),
(896, 272, 181),
(897, 273, 191),
(898, 273, 181),
(899, 274, 191),
(900, 274, 181),
(901, 275, 191),
(902, 275, 181),
(903, 276, 191),
(904, 276, 181),
(905, 277, 191),
(906, 277, 182),
(907, 278, 191),
(908, 278, 182),
(909, 279, 191),
(910, 279, 182),
(911, 280, 191),
(912, 280, 182),
(913, 281, 191),
(914, 281, 182),
(915, 282, 191),
(916, 282, 182),
(917, 283, 191),
(918, 283, 183),
(919, 284, 191),
(920, 284, 183),
(921, 285, 191),
(922, 285, 183),
(923, 286, 191),
(924, 286, 183),
(925, 287, 191),
(926, 287, 183),
(927, 288, 191),
(928, 288, 183),
(929, 289, 191),
(930, 289, 184),
(931, 290, 191),
(932, 290, 184),
(933, 291, 191),
(934, 291, 184),
(935, 292, 191),
(936, 292, 184),
(937, 293, 191),
(938, 293, 184),
(939, 294, 191),
(940, 294, 184),
(941, 295, 191),
(942, 295, 185),
(943, 296, 191),
(944, 296, 185),
(945, 297, 191),
(946, 297, 185),
(947, 298, 191),
(948, 298, 185),
(949, 299, 191),
(950, 299, 185),
(951, 300, 191),
(952, 300, 185),
(953, 301, 191),
(954, 301, 186),
(955, 302, 191),
(956, 302, 186),
(957, 303, 191),
(958, 303, 186),
(959, 304, 191),
(960, 304, 186),
(961, 305, 191),
(962, 305, 186),
(963, 306, 191),
(964, 306, 186),
(965, 307, 191),
(966, 307, 187),
(967, 308, 191),
(968, 308, 187),
(969, 309, 191),
(970, 309, 187),
(971, 310, 191),
(972, 310, 187),
(973, 311, 191),
(974, 311, 187),
(975, 312, 191),
(976, 312, 187),
(977, 313, 191),
(978, 313, 188),
(979, 314, 191),
(980, 314, 188),
(981, 315, 191),
(982, 315, 188),
(983, 316, 191),
(984, 316, 188),
(985, 317, 191),
(986, 317, 188),
(987, 318, 191),
(988, 318, 188),
(989, 319, 191),
(990, 319, 189),
(991, 320, 191),
(992, 320, 189),
(993, 321, 191),
(994, 321, 189),
(995, 322, 191),
(996, 322, 189),
(997, 323, 191),
(998, 323, 189),
(999, 324, 191),
(1000, 324, 189),
(1001, 325, 191),
(1002, 325, 190),
(1003, 326, 191),
(1004, 326, 190),
(1005, 327, 191),
(1006, 327, 190),
(1007, 328, 191),
(1008, 328, 190),
(1009, 329, 191),
(1010, 329, 190),
(1011, 330, 191),
(1012, 330, 190),
(1013, 331, 192),
(1014, 331, 179),
(1015, 332, 192),
(1016, 332, 179),
(1017, 333, 192),
(1018, 333, 179),
(1019, 334, 192),
(1020, 334, 179),
(1021, 335, 192),
(1022, 335, 179),
(1023, 336, 192),
(1024, 336, 179),
(1025, 337, 192),
(1026, 337, 180),
(1027, 338, 192),
(1028, 338, 180),
(1029, 339, 192),
(1030, 339, 180),
(1031, 340, 192),
(1032, 340, 180),
(1033, 341, 192),
(1034, 341, 180),
(1035, 342, 192),
(1036, 342, 180),
(1037, 343, 192),
(1038, 343, 181),
(1039, 344, 192),
(1040, 344, 181),
(1041, 345, 192),
(1042, 345, 181),
(1043, 346, 192),
(1044, 346, 181),
(1045, 347, 192),
(1046, 347, 181),
(1047, 348, 192),
(1048, 348, 181),
(1049, 349, 192),
(1050, 349, 182),
(1051, 350, 192),
(1052, 350, 182),
(1053, 351, 192),
(1054, 351, 182),
(1055, 352, 192),
(1056, 352, 182),
(1057, 353, 192),
(1058, 353, 182),
(1059, 354, 192),
(1060, 354, 182),
(1061, 355, 192),
(1062, 355, 183),
(1063, 356, 192),
(1064, 356, 183),
(1065, 357, 192),
(1066, 357, 183),
(1067, 358, 192),
(1068, 358, 183),
(1069, 359, 192),
(1070, 359, 183),
(1071, 360, 192),
(1072, 360, 183),
(1073, 361, 192),
(1074, 361, 184),
(1075, 362, 192),
(1076, 362, 184),
(1077, 363, 192),
(1078, 363, 184),
(1079, 364, 192),
(1080, 364, 184),
(1081, 365, 192),
(1082, 365, 184),
(1083, 366, 192),
(1084, 366, 184),
(1085, 367, 192),
(1086, 367, 185),
(1087, 368, 192),
(1088, 368, 185),
(1089, 369, 192),
(1090, 369, 185),
(1091, 370, 192),
(1092, 370, 185),
(1093, 371, 192),
(1094, 371, 185),
(1095, 372, 192),
(1096, 372, 185),
(1097, 373, 192),
(1098, 373, 186),
(1099, 374, 192),
(1100, 374, 186),
(1101, 375, 192),
(1102, 375, 186),
(1103, 376, 192),
(1104, 376, 186),
(1105, 377, 192),
(1106, 377, 186),
(1107, 378, 192),
(1108, 378, 186),
(1109, 379, 192),
(1110, 379, 187),
(1111, 380, 192),
(1112, 380, 187),
(1113, 381, 192),
(1114, 381, 187),
(1115, 382, 192),
(1116, 382, 187),
(1117, 383, 192),
(1118, 383, 187),
(1119, 384, 192),
(1120, 384, 187),
(1121, 385, 192),
(1122, 385, 188),
(1123, 386, 192),
(1124, 386, 188),
(1125, 387, 192),
(1126, 387, 188),
(1127, 388, 192),
(1128, 388, 188),
(1129, 389, 192),
(1130, 389, 188),
(1131, 390, 192),
(1132, 390, 188),
(1133, 391, 192),
(1134, 391, 189),
(1135, 392, 192),
(1136, 392, 189),
(1137, 393, 192),
(1138, 393, 189),
(1139, 394, 192),
(1140, 394, 189),
(1141, 395, 192),
(1142, 395, 189),
(1143, 396, 192),
(1144, 396, 189),
(1145, 397, 192),
(1146, 397, 190),
(1147, 398, 192),
(1148, 398, 190),
(1149, 399, 192),
(1150, 399, 190),
(1151, 400, 192),
(1152, 400, 190),
(1153, 401, 192),
(1154, 401, 190),
(1155, 402, 192),
(1156, 402, 190);

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
('Kovács Anna', '06301234567', 'anna.kovacs@ugyfel1.hu', 179, '', '', 'ügyfél', 18),
('Nagy Béla', '06309876543', 'bela.nagy@ugyfel2.hu', 180, '', '', 'ügyfél', 18),
('Szabó Eszter', '06301112233', 'eszter.szabo@ugyfel3.hu', 181, '', '', 'ügyfél', 18),
('Szűcs Tamás', '06305555555', 'tamas.szucs@ugyfel4.hu', 182, '', '', 'ügyfél', 19),
('Barta Júlia', '06306666666', 'julia.barta@ugyfel5.hu', 183, '', '', 'ügyfél', 19),
('Mészáros Levente', '06307777777', 'levente.meszaros@ugyfel6.hu', 184, '', '', 'ügyfél', 19),
('Antal József', '06307788990', 'jozsef.antal@alkalmazott1.hu', 185, '', '', 'alkalmazott', 18),
('Bakos Katalin', '06308899001', 'katalin.bakos@alkalmazott2.hu', 186, '', '', 'alkalmazott', 18),
('Csonka Gábor', '06309900112', 'gabor.csonka@alkalmazott3.hu', 187, '', '', 'alkalmazott', 18),
('Váradi Dániel', '06309888990', 'daniel.varadi@alkalmazott4.hu', 188, '', '', 'alkalmazott', 19),
('Zámbó Zsuzsa', '06301099001', 'zsuzsa.zambo@alkalmazott5.hu', 189, '', '', 'alkalmazott', 19),
('Ábel Boglárka', '06302100112', 'boglarka.abel@alkalmazott6.hu', 190, '', '', 'alkalmazott', 19),
('Kovács Viktor', '+3611222333', 'kovacsviktor1@ugyfelnyilvan.hu', 191, 0x16bcfd3004dae25a98e5fc6f23ab49fbc47806fcc827888485e920586d027d64dd2fb24524b82852db62548bac5655eb8822a0ed006fc4d13482eb879700e48f, 0x63194aca181eac8c70a951e47bdc1d091bbea34984f114ab69a339e58c11319c42b23b7b583424fa27009764c4e99efe3a19a120ed2e2995f9ea8397704228c715fed936d8ebf476eed15c97c2850b22b69618c5c11b2f4e842044dd41cbdb58652d0be07e592a83b28507543dab79322d88474c9cc3d1835f2d0a974458db64, 'felhasználó', 18),
('Révay Áron', '+3620352502', 'revayaron@ugyfelnyilvan.hu', 192, 0x79bb5f00f8b812b64e291dfa4a8d5fa88d4cb1fba73797ded2ae282fef31f09618820bbd4e056a255a617a83dd4468497f9d00ac22909dc07119ba314faff65d, 0x01816f92a5a6c7510e0dcf6ec14d1ec4a17d962de53edd5f3c4c98f9afee29ccbf43324a43b7274c92c221201a8e7a5fae20022a6232aa166bf3f87016fd0c8efb7e3dac8ff77d602062c75cd9898d3b248909d1cc7171b55a379a6e50625584c216215be986160b01c23dc0498800fd84c055f1c9124455fb5073860a93000d, 'felhasználó', 19);

-- --------------------------------------------------------

--
-- Table structure for table `formak`
--

CREATE TABLE `formak` (
  `FormaId` int(255) NOT NULL,
  `nev` varchar(40) NOT NULL,
  `rovidites` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `formak`
--

INSERT INTO `formak` (`FormaId`, `nev`, `rovidites`) VALUES
(1, 'Egyéni vállakozás', 'e.v.'),
(2, 'Egyéni cég', 'e.c.'),
(3, 'Betéti társaság', 'Bt.'),
(4, 'Korlátolt felelősségű társaság', 'Kft.'),
(5, 'Közkereseti társaság', 'Kkt.'),
(6, 'Nyíltkörű Részvénytársaság', 'Nyrt.'),
(7, 'Zártkörű Részvénytársaság', 'Zrt.');

-- --------------------------------------------------------

--
-- Table structure for table `szinek`
--

CREATE TABLE `szinek` (
  `SzinId` varchar(10) NOT NULL,
  `szinNev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `szinek`
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
  ADD KEY `Id` (`FeladatId`,`nev`,`leiras`,`ismGyak`,`allapot`,`szinId`,`hatarido`),
  ADD KEY `szinId` (`szinId`),
  ADD KEY `csoport` (`csoport`);

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
  ADD PRIMARY KEY (`SzinId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cegek`
--
ALTER TABLE `cegek`
  MODIFY `CegId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `cimek`
--
ALTER TABLE `cimek`
  MODIFY `CimId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feladatok`
--
ALTER TABLE `feladatok`
  MODIFY `FeladatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;

--
-- AUTO_INCREMENT for table `felhasznalofeladat`
--
ALTER TABLE `felhasznalofeladat`
  MODIFY `felkapcsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1157;

--
-- AUTO_INCREMENT for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `FelhasznaloId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `formak`
--
ALTER TABLE `formak`
  MODIFY `FormaId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  ADD CONSTRAINT `feladatok_ibfk_1` FOREIGN KEY (`szinId`) REFERENCES `szinek` (`SzinId`);

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
