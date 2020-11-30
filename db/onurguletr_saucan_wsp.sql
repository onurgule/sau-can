-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 30 Kas 2020, 19:59:03
-- Sunucu sürümü: 10.2.19-MariaDB-cll-lve
-- PHP Sürümü: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `onurguletr_saucan`
--

DELIMITER $$
--
-- Yordamlar
--
CREATE DEFINER=`onurguletr`@`localhost` PROCEDURE `addGrade` (IN `sauid` VARCHAR(150), IN `wid` INT, IN `grade` FLOAT)  NO SQL
BEGIN
SET @sid = (SELECT s.SID FROM Students s WHERE s.SAUID = sauid);
INSERT INTO Grades(SID,WID,Grade) VALUES(@sid,wid,grade);
END$$

CREATE DEFINER=`onurguletr`@`localhost` PROCEDURE `doLogin` (IN `fsauid` VARCHAR(150), IN `fcode` VARCHAR(15))  NO SQL
BEGIN
SELECT * FROM (SELECT c.Code,s.SID FROM Codes c INNER JOIN Students s ON s.SID = c.SID WHERE s.SAUID = fsauid ORDER BY c.CID DESC LIMIT 0,3) cc WHERE cc.Code = fcode;
END$$

CREATE DEFINER=`onurguletr`@`localhost` PROCEDURE `getCode` (IN `fsauid` VARCHAR(150))  NO SQL
BEGIN
SET @sid = (SELECT s.SID FROM Students s WHERE s.SAUID = fsauid);
IF ISNULL(@sid) THEN
INSERT INTO Students(SAUID) VALUES(fsauid);
SET @lsid = LAST_INSERT_ID();
SET @code = LPAD(FLOOR(RAND() * 999999.99), 6, '0');
INSERT INTO Codes(SID,Code) VALUES(@lsid,@code);
SELECT @lsid AS SID, @code AS `Code`, 'ok' AS 'result';
ELSE 
SET @code = LPAD(FLOOR(RAND() * 999999.99), 6, '0');
INSERT INTO Codes(SID,Code) VALUES(@sid,@code);
SELECT @sid AS SID, @code AS `Code`, 'ok' AS 'result';
END IF;
END$$

CREATE DEFINER=`onurguletr`@`localhost` PROCEDURE `getLectures` (IN `fsemester` INT)  NO SQL
BEGIN
IF fsemester = 0 THEN
SELECT * FROM Lectures;
ELSE 
SELECT * FROM Lectures l WHERE l.Semester = fsemester;
END IF;
END$$

CREATE DEFINER=`onurguletr`@`localhost` PROCEDURE `getLectureWorks` (IN `lid` INT)  NO SQL
    COMMENT 'Ortalama da burada'
BEGIN
SELECT wt.Type, w.Ratio, AVG(g.Grade) AS ORT FROM Works w LEFT JOIN Grades g ON g.WID = w.WID INNER JOIN WorkTypes wt ON wt.WTID = w.WTID WHERE w.LID = lid GROUP BY w.WID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Codes`
--

CREATE TABLE `Codes` (
  `CID` int(11) NOT NULL,
  `SID` int(11) NOT NULL,
  `Code` varchar(15) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `Codes`
--

INSERT INTO `Codes` (`CID`, `SID`, `Code`, `Date`) VALUES
(1, 1, '123456', '2020-11-29 12:26:05'),
(2, 1, '112233', '2020-11-29 12:26:05'),
(3, 1, '304835', '2020-11-29 12:27:59'),
(4, 2, '977644', '2020-11-29 12:28:18'),
(5, 1, '144732', '2020-11-29 12:33:18'),
(6, 1, '937968', '2020-11-29 12:33:23'),
(7, 1, '468342', '2020-11-29 12:42:55'),
(8, 1, '837032', '2020-11-29 12:43:08');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Grades`
--

CREATE TABLE `Grades` (
  `GID` int(11) NOT NULL,
  `SID` int(11) NOT NULL,
  `WID` int(11) NOT NULL,
  `Grade` decimal(10,0) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Lectures`
--

CREATE TABLE `Lectures` (
  `LID` int(11) NOT NULL,
  `Name` varchar(150) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `Code` varchar(10) NOT NULL COMMENT 'Ders Kodu',
  `Semester` int(11) NOT NULL COMMENT 'Yarıyıl 1,2,3',
  `AKTS` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Dersler';

--
-- Tablo döküm verisi `Lectures`
--

INSERT INTO `Lectures` (`LID`, `Name`, `Code`, `Semester`, `AKTS`) VALUES
(1, 'BİLGİSAYAR MÜHENDİSLİĞİNE GİRİŞ', 'BSM101', 1, 4),
(2, 'PROGRAMLAMAYA GİRİŞ', 'BSM103', 1, 6),
(3, 'FİZİK I', 'FIZ111', 1, 6),
(4, 'MATEMATİK I ', 'MAT111', 1, 6),
(5, 'LİNEER CEBİR', 'MAT113', 1, 4),
(6, 'TÜRK DİLİ', 'TUR101', 1, 4),
(7, 'ATATÜRK İLKELERİ VE İNKILÂP TARİHİ', 'ATA203', 3, 4),
(8, 'MANTIK DEVRELERİ', 'BSM203', 3, 5),
(9, 'VERİ YAPILARI', 'BSM207', 3, 6),
(10, 'VERİTABANI YÖNETİM SİSTEMLERİ', 'BSM211', 3, 5),
(11, 'ELEKTRONİK DEVRELER VE LABORATUVARI', 'BSM213', 3, 5),
(12, 'SAYISAL ANALİZ', 'MAT217', 3, 5),
(13, 'BİÇİMSEL DİLLER VE SOYUT MAKİNELER', 'BSM301', 5, 4),
(14, 'VERİ İLETİŞİMİ', 'BSM305', 5, 4),
(15, 'İŞARETLER VE SİSTEMLER', 'BSM307', 5, 5),
(16, 'İŞLETİM SİSTEMLERİ', 'BSM309', 5, 5),
(17, 'WEB PROGRAMLAMA', 'BSM311', 5, 4),
(18, 'NESNELERİN İNTERNETİ VE UYGULAMALARI', 'BSM313', 5, 4),
(19, 'BİLGİSAYAR MÜHENDİSLİĞİ TASARIMI', 'BSM401', 7, 5),
(20, 'BİTİRME ÇALIŞMASI', 'BSM497', 7, 10),
(21, 'BULANIK MANTIK VE YAPAY SİNİR AĞLARINA GİRİŞ', 'BSM427', 7, 5),
(22, 'OPTİMİZASYON', 'BSM433', 7, 5),
(23, 'İNTERNET MÜHENDİSLİĞİ', 'BSM435', 7, 5),
(24, 'MOBİL UYGULAMA GELİŞTİRME', 'BSM447', 7, 5),
(25, 'TIBBİ İSTATİSTİK VE TIP BİLİŞİMİNE GİRİŞ', 'BSM449', 7, 5),
(26, 'FİNANSAL BİLGİ TEKNOLOJİLERİ', 'BSM455', 7, 5),
(27, 'BÜYÜK VERİYE GİRİŞ', 'BSM461', 7, 5),
(28, 'SİSTEM SİMÜLASYONU', 'BSM463', 7, 5),
(29, 'KRİPTOLOJİYE GİRİŞ', 'BSM465', 7, 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Students`
--

CREATE TABLE `Students` (
  `SID` int(11) NOT NULL,
  `SAUID` varchar(15) NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT 0 COMMENT '0:student, 1:vip, 2:teacher, 3:admin',
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `Students`
--

INSERT INTO `Students` (`SID`, `SAUID`, `user_type`, `created_date`) VALUES
(1, 'G171210021', 0, '2020-11-29 12:25:54'),
(2, 'G171210375', 0, '2020-11-29 12:28:18');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Works`
--

CREATE TABLE `Works` (
  `WID` int(11) NOT NULL,
  `LID` int(11) NOT NULL,
  `WTID` int(11) NOT NULL COMMENT 'WorkTypeID',
  `Ratio` float NOT NULL COMMENT '100 üzerinden etki puanı'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `Works`
--

INSERT INTO `Works` (`WID`, `LID`, `WTID`, `Ratio`) VALUES
(1, 19, 3, 12.5),
(2, 19, 3, 12.5),
(3, 19, 3, 12.5),
(4, 19, 3, 12.5),
(5, 19, 6, 50),
(6, 24, 5, 24),
(7, 24, 2, 6),
(8, 24, 2, 6),
(9, 24, 2, 24),
(10, 24, 6, 40),
(11, 26, 5, 50),
(12, 26, 6, 50),
(13, 27, 5, 20),
(14, 27, 1, 5),
(15, 27, 1, 5),
(16, 27, 2, 20),
(17, 27, 6, 50);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `WorkTypes`
--

CREATE TABLE `WorkTypes` (
  `WTID` int(11) NOT NULL,
  `Type` varchar(60) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `WorkTypes`
--

INSERT INTO `WorkTypes` (`WTID`, `Type`) VALUES
(1, 'Kısa Sınav'),
(2, 'Ödev'),
(3, 'Proje / Tasarım'),
(4, 'Performans Görevi (Uygulama)'),
(5, 'Ara Sınav (Vize)'),
(6, 'Final');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `Codes`
--
ALTER TABLE `Codes`
  ADD PRIMARY KEY (`CID`);

--
-- Tablo için indeksler `Grades`
--
ALTER TABLE `Grades`
  ADD PRIMARY KEY (`GID`),
  ADD UNIQUE KEY `SID` (`SID`,`WID`);

--
-- Tablo için indeksler `Lectures`
--
ALTER TABLE `Lectures`
  ADD PRIMARY KEY (`LID`);

--
-- Tablo için indeksler `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`SID`),
  ADD KEY `Numara` (`SAUID`);

--
-- Tablo için indeksler `Works`
--
ALTER TABLE `Works`
  ADD PRIMARY KEY (`WID`);

--
-- Tablo için indeksler `WorkTypes`
--
ALTER TABLE `WorkTypes`
  ADD PRIMARY KEY (`WTID`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `Codes`
--
ALTER TABLE `Codes`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `Grades`
--
ALTER TABLE `Grades`
  MODIFY `GID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `Lectures`
--
ALTER TABLE `Lectures`
  MODIFY `LID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Tablo için AUTO_INCREMENT değeri `Students`
--
ALTER TABLE `Students`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `Works`
--
ALTER TABLE `Works`
  MODIFY `WID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Tablo için AUTO_INCREMENT değeri `WorkTypes`
--
ALTER TABLE `WorkTypes`
  MODIFY `WTID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
