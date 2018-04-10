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

--
-- Dataark for tabell `tbl_raspberry`
--

INSERT INTO `tbl_raspberry` (`rasp_id`, `user_id`) VALUES
('admin', 2),
('kirra', 2),
('poiu', 2),
('Rasp', 2),
('Raspid1', 2),
('raspmartin', 2),
('years', 2),
('qwerty', 3);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tbl_sensor`
--

CREATE TABLE `tbl_sensor` (
  `sensor_id` int(11) NOT NULL,
  `sensor_name` varchar(255) NOT NULL,
  `rasp_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `tbl_sensor`
--

INSERT INTO `tbl_sensor` (`sensor_id`, `sensor_name`, `rasp_id`) VALUES
(1, 'Soverom', 'raspmartin'),
(2, 'Stue', 'raspmartin'),
(3, 'Entree', 'raspmartin'),
(4, 'Baderom', 'raspmartin'),
(6, 'KritiskKristian', 'Raspid1'),
(7, 'Kontor', 'Raspid1'),
(8, 'Kontor1', 'Raspid1');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tbl_sensor_data`
--

CREATE TABLE `tbl_sensor_data` (
  `sensor_id` int(11) NOT NULL,
  `sensor_name` varchar(255) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `tbl_sensor_data`
--

INSERT INTO `tbl_sensor_data` (`sensor_id`, `sensor_name`, `topic`, `data`, `timestamp`) VALUES
(1, '', '', '22.3', '2018-04-01 04:33:56'),
(2, '', '', '24.3', '2018-04-01 04:34:10'),
(3, '', '', '15.3', '2018-04-01 04:34:17'),
(4, '', '', '18', '2018-04-01 04:34:29');

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
-- Dataark for tabell `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `name`, `password`) VALUES
(2, 'admin', 'admin'),
(3, 'yess', 'yess'),
(4, 'yess', 'yess'),
(5, 'jau', 'yess'),
(6, 'test', 'test'),
(7, 'kiel', 'dar'),
(8, 'yre', 'er'),
(9, 'yreea', 'er'),
(10, 'iyu', 'uy');

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
  MODIFY `sensor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
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
