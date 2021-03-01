-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2021 at 06:48 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ez_tickets`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `show_id` int(10) UNSIGNED NOT NULL,
  `seat_row` int(11) NOT NULL,
  `seat_number` int(11) NOT NULL,
  `price` double NOT NULL COMMENT 'seat price',
  `booking_status` enum('confirmed','reserved','cancelled') NOT NULL DEFAULT 'reserved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `summary` text NOT NULL,
  `year` year(4) NOT NULL,
  `rating` decimal(1,1) UNSIGNED DEFAULT NULL,
  `trailer_url` text NOT NULL,
  `poster_url` text NOT NULL,
  `movie_type` enum('coming_soon','now_showing','removed') NOT NULL DEFAULT 'coming_soon'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `summary`, `year`, `rating`, `trailer_url`, `poster_url`, `movie_type`) VALUES
(1, 'GOOGLE', 'Fearsome bitches.', 2012, '0.9', 'https://www.youtube.com/watch?v=odM92ap8_c0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMwciKW5gytHux-4a4B7e50sQCyvnix9C57mAGnY0DNX4-uGQ', 'now_showing'),
(4, 'FACEBOOK', 'Fearsome bitches.', 2020, '0.9', 'https://www.youtube.com/watch?v=odM92ap8_c0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMwciKW5gytHux-4a4B7e50sQCyvnix9C57mAGnY0DNX4-uGQ', 'coming_soon'),
(7, 'APPLE', 'Fearsome bitches.', 2020, '0.9', 'https://www.youtube.com/watch?v=odM92ap8_c0', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMwciKW5gytHux-4a4B7e50sQCyvnix9C57mAGnY0DNX4-uGQ', 'now_showing');

-- --------------------------------------------------------

--
-- Table structure for table `movie_roles`
--

CREATE TABLE `movie_roles` (
  `movie_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `role_type` enum('director','producer','cast') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie_roles`
--

INSERT INTO `movie_roles` (`movie_id`, `role_id`, `role_type`) VALUES
(1, 1, 'director'),
(1, 2, 'cast'),
(1, 3, 'cast'),
(4, 1, 'producer'),
(4, 2, 'director'),
(4, 3, 'cast'),
(7, 1, 'producer'),
(7, 2, 'director'),
(7, 3, 'cast');

-- --------------------------------------------------------

--
-- Table structure for table `otp_codes`
--

CREATE TABLE `otp_codes` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `OTP` text NOT NULL,
  `expiration_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `age` tinyint(3) UNSIGNED NOT NULL,
  `picture_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `full_name`, `age`, `picture_url`) VALUES
(1, 'Mrs. Lady', 29, 'https://www.biography.com/.image/t_share/MTE5NTU2MzE2Mzg0MTY3NDM1/quentin-tarantino-9502086-1-402.jpg'),
(2, 'Mrs. Women', 29, 'https://www.biography.com/.image/t_share/MTE5NTU2MzE2Mzg0MTY3NDM1/quentin-tarantino-9502086-1-402.jpg'),
(3, 'Mr. Guy', 36, 'https://www.biography.com/.image/t_share/MTE5NTU2MzE2Mzg0MTY3NDM1/quentin-tarantino-9502086-1-402.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `show_id` int(10) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `date` date NOT NULL,
  `movie_id` int(10) UNSIGNED NOT NULL,
  `theater_id` int(10) UNSIGNED NOT NULL,
  `show_status` enum('free','almost_full','full') NOT NULL DEFAULT 'free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shows`
--

INSERT INTO `shows` (`show_id`, `start_time`, `end_time`, `date`, `movie_id`, `theater_id`, `show_status`) VALUES
(14, '12:30:00', '02:45:00', '2021-03-15', 1, 8, 'free'),
(17, '02:30:00', '04:45:00', '2021-03-14', 4, 10, 'free'),
(18, '02:30:00', '04:45:00', '2021-03-16', 4, 10, 'full'),
(20, '11:30:00', '13:45:00', '2021-03-16', 4, 8, 'full'),
(21, '10:00:00', '12:15:00', '2021-03-16', 4, 10, 'full');

-- --------------------------------------------------------

--
-- Table structure for table `theaters`
--

CREATE TABLE `theaters` (
  `theater_id` int(10) UNSIGNED NOT NULL,
  `theater_name` char(1) NOT NULL COMMENT 'one letter name',
  `num_of_rows` smallint(5) UNSIGNED NOT NULL,
  `seats_per_row` smallint(5) UNSIGNED NOT NULL,
  `theater_type` enum('normal','royal') NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `theaters`
--

INSERT INTO `theaters` (`theater_id`, `theater_name`, `num_of_rows`, `seats_per_row`, `theater_type`) VALUES
(8, 'A', 10, 20, 'normal'),
(10, 'B', 5, 5, 'royal'),
(15, 'C', 10, 20, 'normal'),
(16, 'D', 5, 5, 'royal'),
(22, 'E', 10, 2, 'normal');

-- --------------------------------------------------------

--
-- Table structure for table `theater_seats`
--

CREATE TABLE `theater_seats` (
  `seat_row` varchar(2) NOT NULL,
  `seat_number` smallint(5) UNSIGNED NOT NULL,
  `theater_id` int(10) UNSIGNED NOT NULL,
  `seat_type` enum('missing','blocked') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `theater_seats`
--

INSERT INTO `theater_seats` (`seat_row`, `seat_number`, `theater_id`, `seat_type`) VALUES
('A', 11, 15, 'missing'),
('B', 0, 15, 'missing'),
('C', 23, 15, 'blocked'),
('C', 22, 15, 'blocked'),
('D', 23, 15, 'blocked'),
('D', 22, 15, 'blocked'),
('A', 11, 16, 'missing'),
('B', 11, 16, 'missing'),
('C', 11, 16, 'missing'),
('D', 11, 16, 'missing'),
('A', 1, 22, 'blocked'),
('B', 2, 22, 'blocked'),
('C', 1, 22, 'blocked'),
('D', 2, 22, 'blocked');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `role` enum('api_user','admin','super_user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `address`, `contact`, `role`) VALUES
(1, 'Test Admin', 'admin@gmail.com', '$2a$08$y4hYovfviz31AZhru3t4FObYrLFrhdBNETXikx6WFD9VYGbUZucYO', 'Karachi', '+923009999999', 'admin'),
(2, 'Test User', 'user@gmail.com', '$2a$08$V5FWrXIoHeJPGe0WDgQcJ.eJEX.rz6tCtevaNSKBH6deaoVDKMosS', 'Karachi', '+923009999999', 'api_user'),
(10, 'Email Test User', 'arafaysaleem@gmail.com', '$2a$08$NMklGbvfLkOwYgo1lB6qbOxGUmOuH4gymNwU6WXC4H2gTa39v9OPW', 'Karachi', '+923009999999', 'api_user'),
(11, 'Test User', 'user2@gmail.com', '$2a$08$dP89ppGNiMczZM0JToQwF.WtiR53NL0j.r55wBNJP03sjDh/VpcrC', 'Karachi', '+923009999999', 'api_user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`user_id`,`show_id`,`seat_row`,`seat_number`) USING BTREE,
  ADD KEY `fk_bookings_show_id` (`show_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `movie_roles`
--
ALTER TABLE `movie_roles`
  ADD PRIMARY KEY (`movie_id`,`role_id`) USING BTREE,
  ADD KEY `fk_mroles_role_id` (`role_id`);

--
-- Indexes for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`show_id`),
  ADD UNIQUE KEY `unique_show_details` (`start_time`,`end_time`,`date`,`movie_id`,`theater_id`) USING BTREE,
  ADD KEY `fk_shows_movie_id` (`movie_id`),
  ADD KEY `fk_shows_theater_id` (`theater_id`);

--
-- Indexes for table `theaters`
--
ALTER TABLE `theaters`
  ADD PRIMARY KEY (`theater_id`),
  ADD UNIQUE KEY `theater_name` (`theater_name`) USING BTREE;

--
-- Indexes for table `theater_seats`
--
ALTER TABLE `theater_seats`
  ADD KEY `fk_tseats_theater_id` (`theater_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `otp_codes`
--
ALTER TABLE `otp_codes`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `show_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `theaters`
--
ALTER TABLE `theaters`
  MODIFY `theater_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`),
  ADD CONSTRAINT `fk_bookings_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `movie_roles`
--
ALTER TABLE `movie_roles`
  ADD CONSTRAINT `fk_mroles_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  ADD CONSTRAINT `fk_mroles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD CONSTRAINT `fk_otp_codes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `shows`
--
ALTER TABLE `shows`
  ADD CONSTRAINT `fk_shows_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  ADD CONSTRAINT `fk_shows_theater_id` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`theater_id`);

--
-- Constraints for table `theater_seats`
--
ALTER TABLE `theater_seats`
  ADD CONSTRAINT `fk_tseats_theater_id` FOREIGN KEY (`theater_id`) REFERENCES `theaters` (`theater_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
