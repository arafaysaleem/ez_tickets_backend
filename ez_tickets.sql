-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2021 at 05:11 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `movie_roles`
--

CREATE TABLE `movie_roles` (
  `movie_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `role_type` enum('director','producer','cast') NOT NULL
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

-- --------------------------------------------------------

--
-- Table structure for table `theaters`
--

CREATE TABLE `theaters` (
  `theater_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(1) NOT NULL COMMENT 'one letter name',
  `num_of_rows` smallint(5) UNSIGNED NOT NULL,
  `seats_per_row` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `theater_seats`
--

CREATE TABLE `theater_seats` (
  `seat_row` varchar(2) NOT NULL,
  `seat_number` smallint(5) UNSIGNED NOT NULL,
  `theater_id` int(10) UNSIGNED NOT NULL,
  `seat_type` enum('missing','vip','blocked') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `movie_roles`
--
ALTER TABLE `movie_roles`
  ADD PRIMARY KEY (`movie_id`,`role_id`) USING BTREE,
  ADD KEY `fk_mroles_role_id` (`role_id`);

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
  ADD KEY `fk_shows_movie_id` (`movie_id`),
  ADD KEY `fk_shows_theater_id` (`theater_id`);

--
-- Indexes for table `theaters`
--
ALTER TABLE `theaters`
  ADD PRIMARY KEY (`theater_id`);

--
-- Indexes for table `theater_seats`
--
ALTER TABLE `theater_seats`
  ADD KEY `fk_tseats_theater_id` (`theater_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `show_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theaters`
--
ALTER TABLE `theaters`
  MODIFY `theater_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

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
