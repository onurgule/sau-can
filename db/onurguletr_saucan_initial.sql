-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 27 Kas 2020, 10:32:01
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

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `Works`
--

CREATE TABLE `Works` (
  `WID` int(11) NOT NULL,
  `LID` int(11) NOT NULL,
  `WTID` int(11) NOT NULL COMMENT 'WorkTypeID',
  `Ratio` int(11) NOT NULL COMMENT '100 üzerinden etki puanı'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `WorkTypes`
--

CREATE TABLE `WorkTypes` (
  `WTID` int(11) NOT NULL,
  `Type` varchar(60) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `Grades`
--
ALTER TABLE `Grades`
  ADD PRIMARY KEY (`GID`);

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
-- Tablo için AUTO_INCREMENT değeri `Grades`
--
ALTER TABLE `Grades`
  MODIFY `GID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `Lectures`
--
ALTER TABLE `Lectures`
  MODIFY `LID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `Students`
--
ALTER TABLE `Students`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `Works`
--
ALTER TABLE `Works`
  MODIFY `WID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `WorkTypes`
--
ALTER TABLE `WorkTypes`
  MODIFY `WTID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
