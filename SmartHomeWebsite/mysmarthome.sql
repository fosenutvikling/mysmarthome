-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 01. Apr, 2018 08:02 a.m.
-- Server-versjon: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysmarthome`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tbl_raspberry`
--

CREATE TABLE `tbl_raspberry` (
  `rasp_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tbl_sensor`
--

CREATE TABLE `tbl_sensor` (
  `sensor_id` int(11) NOT NULL,
  `sensor_name` varchar(255) NOT NULL,
  `rasp_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tbl_sensor_data`
--

CREATE TABLE `tbl_sensor_data` (
  `sensor_id` int(11) NOT NULL,
  `data` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_raspberry`
--
ALTER TABLE `tbl_raspberry`
  ADD PRIMARY KEY (`rasp_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_sensor`
--
ALTER TABLE `tbl_sensor`
  ADD PRIMARY KEY (`sensor_id`),
  ADD KEY `rasp_id` (`rasp_id`);

--
-- Indexes for table `tbl_sensor_data`
--
ALTER TABLE `tbl_sensor_data`
  ADD KEY `sensor_id` (`sensor_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_sensor`
--
ALTER TABLE `tbl_sensor`
  MODIFY `sensor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `tbl_raspberry`
--
ALTER TABLE `tbl_raspberry`
  ADD CONSTRAINT `tbl_raspberry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`);

--
-- Begrensninger for tabell `tbl_sensor`
--
ALTER TABLE `tbl_sensor`
  ADD CONSTRAINT `tbl_sensor_ibfk_1` FOREIGN KEY (`rasp_id`) REFERENCES `tbl_raspberry` (`rasp_id`);

--
-- Begrensninger for tabell `tbl_sensor_data`
--
ALTER TABLE `tbl_sensor_data`
  ADD CONSTRAINT `tbl_sensor_data_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `tbl_sensor` (`sensor_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
