-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysqldb.coowsb1lwe26.ap-south-1.rds.amazonaws.com:3306
-- Generation Time: Feb 09, 2022 at 03:57 PM
-- Server version: 8.0.23
-- PHP Version: 8.0.9

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
  `booking_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `show_id` int UNSIGNED NOT NULL,
  `seat_row` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `seat_number` int NOT NULL,
  `price` float NOT NULL COMMENT 'seat price',
  `booking_status` enum('confirmed','reserved','cancelled') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'reserved',
  `booking_datetime` datetime NOT NULL COMMENT 'the date time on which booking was made'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `user_id`, `show_id`, `seat_row`, `seat_number`, `price`, `booking_status`, `booking_datetime`) VALUES
(25, 10, 29, 'E', 0, 800, 'confirmed', '2021-06-06 03:31:29'),
(26, 10, 29, 'E', 1, 800, 'confirmed', '2021-06-06 03:31:31'),
(27, 10, 29, 'E', 2, 800, 'confirmed', '2021-06-06 03:31:33'),
(28, 10, 29, 'E', 3, 800, 'confirmed', '2021-06-06 03:31:35'),
(29, 10, 29, 'E', 4, 800, 'confirmed', '2021-06-06 03:31:37'),
(30, 10, 29, 'F', 4, 800, 'confirmed', '2021-06-06 03:31:38'),
(31, 10, 29, 'F', 3, 800, 'confirmed', '2021-06-06 03:31:40'),
(32, 10, 29, 'F', 0, 800, 'confirmed', '2021-06-06 03:31:42'),
(33, 10, 29, 'G', 0, 800, 'confirmed', '2021-06-06 03:31:43'),
(34, 10, 29, 'H', 4, 800, 'confirmed', '2021-06-06 03:31:45'),
(35, 10, 29, 'H', 3, 800, 'confirmed', '2021-06-06 03:31:47'),
(36, 10, 29, 'H', 1, 800, 'confirmed', '2021-06-06 03:31:48'),
(37, 10, 29, 'H', 0, 800, 'confirmed', '2021-06-06 03:31:50'),
(38, 10, 29, 'K', 0, 800, 'confirmed', '2021-06-06 03:31:52'),
(39, 10, 29, 'K', 1, 800, 'confirmed', '2021-06-06 03:31:53'),
(40, 10, 29, 'K', 2, 800, 'confirmed', '2021-06-06 03:31:55'),
(41, 10, 29, 'K', 3, 800, 'confirmed', '2021-06-06 03:31:57'),
(42, 10, 29, 'L', 3, 800, 'confirmed', '2021-06-06 03:31:58'),
(43, 10, 29, 'L', 2, 800, 'confirmed', '2021-06-06 03:32:00'),
(44, 10, 29, 'L', 1, 800, 'confirmed', '2021-06-06 03:32:02'),
(45, 10, 29, 'L', 0, 800, 'confirmed', '2021-06-06 03:32:03'),
(46, 10, 29, 'J', 2, 800, 'confirmed', '2021-06-06 03:32:05'),
(47, 10, 29, 'J', 1, 800, 'confirmed', '2021-06-06 03:32:06'),
(48, 10, 29, 'B', 1, 800, 'confirmed', '2021-06-06 03:32:08'),
(49, 10, 29, 'B', 2, 800, 'confirmed', '2021-06-06 03:32:09'),
(50, 10, 29, 'C', 2, 800, 'confirmed', '2021-06-06 03:32:11'),
(51, 10, 29, 'C', 1, 800, 'confirmed', '2021-06-06 03:32:13'),
(52, 10, 29, 'C', 3, 800, 'confirmed', '2021-06-06 03:32:14'),
(53, 10, 29, 'B', 3, 800, 'confirmed', '2021-06-06 03:32:16'),
(54, 10, 29, 'I', 5, 800, 'confirmed', '2021-06-06 03:32:17'),
(55, 10, 29, 'I', 6, 800, 'confirmed', '2021-06-06 03:32:19'),
(56, 10, 29, 'I', 7, 800, 'confirmed', '2021-06-06 03:32:20'),
(57, 10, 29, 'J', 9, 800, 'confirmed', '2021-06-06 03:32:22'),
(58, 10, 29, 'J', 8, 800, 'confirmed', '2021-06-06 03:32:24'),
(59, 10, 29, 'J', 7, 800, 'confirmed', '2021-06-06 03:32:25'),
(60, 10, 29, 'J', 6, 800, 'confirmed', '2021-06-06 03:32:27'),
(61, 10, 29, 'J', 5, 800, 'confirmed', '2021-06-06 03:32:28'),
(62, 10, 29, 'K', 7, 800, 'confirmed', '2021-06-06 03:32:30'),
(63, 10, 29, 'K', 8, 800, 'confirmed', '2021-06-06 03:32:32'),
(64, 10, 29, 'K', 9, 800, 'confirmed', '2021-06-06 03:32:34'),
(65, 10, 29, 'L', 5, 800, 'confirmed', '2021-06-06 03:32:35'),
(66, 10, 29, 'L', 6, 800, 'confirmed', '2021-06-06 03:32:37'),
(67, 10, 29, 'L', 7, 800, 'confirmed', '2021-06-06 03:32:39'),
(68, 10, 29, 'L', 8, 800, 'confirmed', '2021-06-06 03:32:40'),
(69, 10, 29, 'L', 9, 800, 'confirmed', '2021-06-06 03:32:42'),
(70, 10, 29, 'L', 11, 800, 'confirmed', '2021-06-06 03:32:44'),
(71, 10, 29, 'L', 13, 800, 'confirmed', '2021-06-06 03:32:45'),
(72, 10, 29, 'L', 14, 800, 'confirmed', '2021-06-06 03:32:47'),
(73, 10, 29, 'K', 14, 800, 'confirmed', '2021-06-06 03:32:49'),
(74, 10, 29, 'K', 13, 800, 'confirmed', '2021-06-06 03:32:50'),
(75, 10, 29, 'K', 12, 800, 'confirmed', '2021-06-06 03:32:52'),
(76, 10, 29, 'K', 11, 800, 'confirmed', '2021-06-06 03:32:53'),
(77, 10, 29, 'J', 11, 800, 'confirmed', '2021-06-06 03:32:55'),
(78, 10, 29, 'J', 12, 800, 'confirmed', '2021-06-06 03:32:57'),
(79, 10, 29, 'J', 13, 800, 'confirmed', '2021-06-06 03:32:58'),
(80, 10, 29, 'J', 14, 800, 'confirmed', '2021-06-06 03:33:00'),
(81, 10, 29, 'L', 12, 800, 'confirmed', '2021-06-06 03:33:01'),
(82, 10, 29, 'H', 14, 800, 'confirmed', '2021-06-06 03:33:03'),
(83, 10, 29, 'H', 13, 800, 'confirmed', '2021-06-06 03:33:05'),
(84, 10, 29, 'H', 12, 800, 'confirmed', '2021-06-06 03:33:06'),
(85, 10, 29, 'H', 11, 800, 'confirmed', '2021-06-06 03:33:08'),
(86, 10, 29, 'H', 10, 800, 'confirmed', '2021-06-06 03:33:09'),
(87, 10, 29, 'G', 14, 800, 'confirmed', '2021-06-06 03:33:11'),
(88, 10, 29, 'G', 13, 800, 'confirmed', '2021-06-06 03:33:13'),
(89, 10, 29, 'G', 12, 800, 'confirmed', '2021-06-06 03:33:14'),
(90, 10, 29, 'G', 11, 800, 'confirmed', '2021-06-06 03:33:16'),
(91, 10, 29, 'G', 10, 800, 'confirmed', '2021-06-06 03:33:17'),
(92, 10, 29, 'F', 14, 800, 'confirmed', '2021-06-06 03:33:19'),
(93, 10, 29, 'F', 10, 800, 'confirmed', '2021-06-06 03:33:21'),
(94, 10, 29, 'E', 12, 800, 'confirmed', '2021-06-06 03:33:22'),
(95, 10, 29, 'E', 13, 800, 'confirmed', '2021-06-06 03:33:24'),
(96, 10, 29, 'B', 6, 800, 'confirmed', '2021-06-06 03:33:25'),
(97, 10, 29, 'B', 8, 800, 'confirmed', '2021-06-06 03:33:27'),
(98, 10, 29, 'B', 7, 800, 'confirmed', '2021-06-06 03:33:29'),
(99, 10, 29, 'C', 7, 800, 'confirmed', '2021-06-06 03:33:30'),
(100, 10, 29, 'C', 6, 800, 'confirmed', '2021-06-06 03:33:32'),
(101, 10, 29, 'C', 8, 800, 'confirmed', '2021-06-06 03:33:33'),
(102, 10, 29, 'D', 7, 800, 'confirmed', '2021-06-06 03:33:35'),
(103, 10, 29, 'D', 9, 800, 'confirmed', '2021-06-06 03:33:37'),
(104, 10, 29, 'D', 8, 800, 'confirmed', '2021-06-06 03:33:38'),
(105, 10, 29, 'D', 6, 800, 'confirmed', '2021-06-06 03:33:40'),
(106, 10, 29, 'D', 5, 800, 'confirmed', '2021-06-06 03:33:41'),
(107, 10, 29, 'B', 13, 800, 'confirmed', '2021-06-06 03:33:43'),
(108, 10, 29, 'G', 1, 800, 'confirmed', '2021-06-06 03:33:44'),
(109, 10, 29, 'G', 2, 800, 'confirmed', '2021-06-06 03:33:46'),
(110, 10, 35, 'J', 0, 800, 'confirmed', '2021-06-06 03:36:08'),
(111, 10, 35, 'J', 1, 800, 'confirmed', '2021-06-06 03:36:10'),
(112, 10, 35, 'J', 2, 800, 'confirmed', '2021-06-06 03:36:12'),
(113, 10, 35, 'J', 4, 800, 'confirmed', '2021-06-06 03:36:14'),
(114, 10, 35, 'J', 5, 800, 'confirmed', '2021-06-06 03:36:16'),
(115, 10, 35, 'J', 6, 800, 'confirmed', '2021-06-06 03:36:18'),
(116, 10, 35, 'J', 8, 800, 'confirmed', '2021-06-06 03:36:19'),
(117, 10, 35, 'J', 9, 800, 'confirmed', '2021-06-06 03:36:21'),
(118, 10, 35, 'I', 0, 800, 'confirmed', '2021-06-06 03:36:23'),
(119, 10, 35, 'I', 1, 800, 'confirmed', '2021-06-06 03:36:24'),
(120, 10, 35, 'I', 2, 800, 'confirmed', '2021-06-06 03:36:26'),
(121, 10, 35, 'I', 4, 800, 'confirmed', '2021-06-06 03:36:27'),
(122, 10, 35, 'I', 5, 800, 'confirmed', '2021-06-06 03:36:29'),
(123, 10, 35, 'I', 6, 800, 'confirmed', '2021-06-06 03:36:31'),
(124, 10, 35, 'I', 8, 800, 'confirmed', '2021-06-06 03:36:32'),
(125, 10, 35, 'I', 9, 800, 'confirmed', '2021-06-06 03:36:34'),
(126, 10, 35, 'F', 1, 800, 'confirmed', '2021-06-06 03:36:35'),
(127, 10, 35, 'F', 2, 800, 'confirmed', '2021-06-06 03:36:37'),
(128, 10, 35, 'G', 4, 800, 'confirmed', '2021-06-06 03:36:39'),
(129, 10, 35, 'G', 5, 800, 'confirmed', '2021-06-06 03:36:40'),
(130, 10, 35, 'G', 9, 800, 'confirmed', '2021-06-06 03:36:42'),
(131, 10, 54, 'G', 2, 800, 'confirmed', '2021-06-06 03:41:58'),
(132, 10, 54, 'H', 2, 800, 'confirmed', '2021-06-06 03:42:00'),
(133, 10, 54, 'G', 3, 800, 'confirmed', '2021-06-06 03:42:02'),
(134, 10, 54, 'H', 3, 800, 'confirmed', '2021-06-06 03:42:03'),
(135, 10, 54, 'G', 7, 800, 'confirmed', '2021-06-06 03:42:05'),
(136, 10, 54, 'H', 7, 800, 'confirmed', '2021-06-06 03:42:07'),
(137, 10, 54, 'G', 8, 800, 'confirmed', '2021-06-06 03:42:08'),
(138, 10, 54, 'H', 8, 800, 'confirmed', '2021-06-06 03:42:10'),
(139, 10, 54, 'D', 4, 800, 'confirmed', '2021-06-06 03:42:11'),
(140, 10, 54, 'E', 4, 800, 'confirmed', '2021-06-06 03:42:13'),
(141, 10, 54, 'D', 5, 800, 'confirmed', '2021-06-06 03:42:14'),
(142, 10, 54, 'E', 5, 800, 'confirmed', '2021-06-06 03:42:16'),
(143, 10, 54, 'B', 2, 800, 'confirmed', '2021-06-06 03:42:18'),
(144, 10, 54, 'B', 3, 800, 'confirmed', '2021-06-06 03:42:19'),
(145, 10, 54, 'B', 10, 800, 'confirmed', '2021-06-06 03:42:21'),
(146, 10, 54, 'E', 10, 800, 'confirmed', '2021-06-06 03:42:23'),
(147, 10, 54, 'E', 11, 800, 'confirmed', '2021-06-06 03:42:24'),
(148, 10, 29, 'G', 6, 800, 'confirmed', '2021-06-06 21:24:31'),
(149, 10, 29, 'G', 7, 800, 'confirmed', '2021-06-06 21:24:35'),
(150, 10, 29, 'G', 8, 800, 'confirmed', '2021-06-06 21:24:37'),
(151, 10, 39, 'H', 0, 800, 'confirmed', '2021-06-06 22:43:19'),
(152, 10, 39, 'H', 1, 800, 'confirmed', '2021-06-06 22:43:21'),
(153, 10, 39, 'H', 2, 800, 'confirmed', '2021-06-06 22:43:22'),
(154, 10, 39, 'H', 4, 800, 'confirmed', '2021-06-06 22:43:24'),
(155, 10, 39, 'H', 5, 800, 'confirmed', '2021-06-06 22:43:25'),
(156, 10, 39, 'H', 6, 800, 'confirmed', '2021-06-06 22:43:27'),
(157, 10, 30, 'G', 6, 800, 'reserved', '2021-06-10 04:10:13'),
(158, 10, 30, 'G', 7, 800, 'reserved', '2021-06-10 04:10:15'),
(159, 10, 30, 'G', 8, 800, 'reserved', '2021-06-10 04:10:17'),
(160, 10, 30, 'L', 7, 800, 'reserved', '2021-06-10 04:10:18'),
(161, 10, 30, 'L', 6, 800, 'reserved', '2021-06-10 04:10:20'),
(164, 2, 41, 'E', 1, 800, 'confirmed', '2021-06-10 19:00:43'),
(165, 2, 41, 'F', 1, 800, 'confirmed', '2021-06-10 19:00:45'),
(166, 2, 41, 'G', 1, 800, 'confirmed', '2021-06-10 19:00:47'),
(167, 2, 41, 'J', 6, 800, 'confirmed', '2021-06-10 19:00:49'),
(168, 2, 41, 'J', 5, 800, 'confirmed', '2021-06-10 19:00:50'),
(169, 2, 41, 'J', 4, 800, 'confirmed', '2021-06-10 19:00:52'),
(170, 10, 43, 'A', 5, 800, 'confirmed', '2021-06-28 17:59:59'),
(171, 10, 43, 'E', 1, 800, 'confirmed', '2021-06-28 18:00:01'),
(172, 10, 43, 'F', 1, 800, 'confirmed', '2021-06-28 18:00:03'),
(173, 10, 43, 'H', 1, 800, 'confirmed', '2021-06-28 18:00:04'),
(174, 10, 30, 'G', 3, 800, 'confirmed', '2021-07-16 00:44:45'),
(175, 10, 30, 'H', 2, 800, 'confirmed', '2021-07-16 00:44:47'),
(176, 10, 30, 'G', 2, 800, 'confirmed', '2021-07-16 00:44:49'),
(177, 10, 30, 'G', 4, 800, 'confirmed', '2021-07-16 00:44:51'),
(178, 10, 30, 'H', 4, 800, 'confirmed', '2021-07-16 00:44:52'),
(179, 10, 30, 'H', 3, 800, 'confirmed', '2021-07-16 00:44:53'),
(180, 10, 30, 'I', 5, 800, 'confirmed', '2021-08-08 03:35:41'),
(181, 10, 23, 'J', 3, 800, 'confirmed', '2021-08-17 19:47:19'),
(184, 10, 23, 'I', 5, 800, 'confirmed', '2021-08-18 10:46:44'),
(185, 10, 23, 'I', 6, 800, 'confirmed', '2021-08-18 10:47:03'),
(186, 10, 27, 'E', 5, 800, 'confirmed', '2021-09-14 00:24:41'),
(187, 10, 27, 'F', 5, 800, 'confirmed', '2021-09-14 00:24:44'),
(188, 10, 27, 'G', 5, 800, 'confirmed', '2021-09-14 00:24:45'),
(189, 10, 26, 'I', 4, 800, 'confirmed', '2021-09-17 00:43:46'),
(190, 10, 26, 'I', 5, 800, 'confirmed', '2021-09-17 00:43:49'),
(191, 10, 26, 'I', 6, 800, 'confirmed', '2021-09-17 00:43:52'),
(192, 10, 26, 'I', 0, 800, 'confirmed', '2021-09-17 00:43:53'),
(193, 10, 26, 'I', 1, 800, 'confirmed', '2021-09-17 00:43:56'),
(194, 10, 26, 'I', 2, 800, 'confirmed', '2021-09-17 00:44:02'),
(195, 10, 26, 'H', 2, 800, 'confirmed', '2021-09-17 00:44:04'),
(196, 10, 26, 'H', 1, 800, 'confirmed', '2021-09-17 00:44:05'),
(197, 10, 26, 'H', 0, 800, 'confirmed', '2021-09-17 00:44:07'),
(198, 10, 26, 'G', 0, 800, 'confirmed', '2021-09-17 00:44:10'),
(199, 10, 26, 'G', 1, 800, 'confirmed', '2021-09-17 00:44:11'),
(200, 10, 26, 'G', 2, 800, 'confirmed', '2021-09-17 00:44:13'),
(201, 10, 26, 'G', 4, 800, 'confirmed', '2021-09-17 00:44:14'),
(202, 10, 26, 'G', 5, 800, 'confirmed', '2021-09-17 00:44:16'),
(203, 10, 26, 'G', 6, 800, 'confirmed', '2021-09-17 00:44:17'),
(204, 10, 26, 'E', 6, 800, 'confirmed', '2021-09-17 00:44:20'),
(205, 10, 26, 'D', 6, 800, 'confirmed', '2021-09-17 00:44:22'),
(206, 10, 26, 'D', 5, 800, 'confirmed', '2021-09-17 00:44:24'),
(207, 10, 26, 'D', 4, 800, 'confirmed', '2021-09-17 00:44:26'),
(208, 10, 26, 'E', 4, 800, 'confirmed', '2021-09-17 00:44:27'),
(209, 10, 26, 'E', 5, 800, 'confirmed', '2021-09-17 00:44:28'),
(210, 10, 26, 'F', 8, 800, 'confirmed', '2021-09-17 00:44:30'),
(211, 10, 26, 'F', 9, 800, 'confirmed', '2021-09-17 00:44:32'),
(212, 10, 26, 'G', 8, 800, 'confirmed', '2021-09-17 00:44:33'),
(213, 10, 26, 'G', 9, 800, 'confirmed', '2021-09-17 00:44:36'),
(214, 10, 26, 'J', 9, 800, 'confirmed', '2021-09-17 00:44:38'),
(215, 10, 26, 'J', 8, 800, 'confirmed', '2021-09-17 00:44:40'),
(216, 10, 26, 'E', 1, 800, 'confirmed', '2021-09-17 00:44:41'),
(217, 10, 26, 'E', 0, 800, 'confirmed', '2021-09-17 00:44:43'),
(218, 10, 26, 'C', 9, 800, 'confirmed', '2021-09-17 00:44:44'),
(219, 10, 26, 'C', 8, 800, 'confirmed', '2021-09-17 00:44:46'),
(220, 10, 23, 'G', 7, 800, 'confirmed', '2021-09-23 16:01:30'),
(221, 10, 23, 'K', 7, 800, 'confirmed', '2021-09-23 16:01:32'),
(222, 10, 23, 'K', 8, 800, 'confirmed', '2021-09-23 16:01:33'),
(223, 10, 30, 'J', 6, 800, 'confirmed', '2021-10-14 16:08:49'),
(224, 10, 30, 'J', 7, 800, 'confirmed', '2021-10-14 16:08:52'),
(225, 10, 30, 'J', 8, 800, 'confirmed', '2021-10-14 16:08:53'),
(226, 10, 30, 'J', 9, 800, 'confirmed', '2021-10-14 16:08:55'),
(227, 10, 23, 'J', 8, 800, 'confirmed', '2021-11-20 02:31:31'),
(228, 10, 23, 'J', 7, 800, 'confirmed', '2021-11-20 02:31:33'),
(229, 10, 23, 'J', 6, 800, 'confirmed', '2021-11-20 02:31:34'),
(230, 10, 23, 'J', 9, 800, 'confirmed', '2021-11-20 02:31:36'),
(231, 10, 26, 'J', 4, 800, 'confirmed', '2022-01-12 19:26:39'),
(232, 10, 26, 'J', 5, 800, 'confirmed', '2022-01-12 19:26:42'),
(233, 10, 26, 'J', 6, 800, 'confirmed', '2022-01-12 19:26:50'),
(234, 10, 26, 'H', 6, 800, 'confirmed', '2022-01-12 19:26:53'),
(235, 10, 29, 'K', 5, 800, 'confirmed', '2022-01-14 19:05:08'),
(236, 10, 29, 'K', 6, 800, 'confirmed', '2022-01-14 19:05:11'),
(237, 10, 29, 'I', 8, 800, 'confirmed', '2022-01-14 19:05:16'),
(238, 10, 29, 'I', 9, 800, 'confirmed', '2022-01-14 19:05:19'),
(239, 10, 27, 'G', 6, 800, 'reserved', '2022-01-15 05:49:12'),
(240, 10, 24, 'F', 6, 800, 'reserved', '2022-01-17 14:49:31'),
(241, 10, 24, 'F', 7, 800, 'reserved', '2022-01-17 14:49:33'),
(242, 10, 24, 'F', 8, 800, 'reserved', '2022-01-17 14:49:34'),
(243, 10, 24, 'G', 8, 800, 'reserved', '2022-01-17 14:49:36'),
(244, 10, 24, 'G', 6, 800, 'reserved', '2022-01-17 14:49:38'),
(245, 10, 24, 'G', 7, 800, 'reserved', '2022-01-17 14:49:40'),
(246, 10, 49, 'A', 5, 800, 'reserved', '2022-01-17 14:51:09'),
(247, 10, 36, 'A', 0, 800, 'reserved', '2022-01-17 15:39:17'),
(248, 10, 36, 'A', 1, 800, 'reserved', '2022-01-17 15:39:18'),
(249, 10, 36, 'A', 2, 800, 'reserved', '2022-01-17 15:39:20'),
(250, 10, 36, 'A', 3, 800, 'reserved', '2022-01-17 15:39:22'),
(251, 10, 36, 'A', 4, 800, 'reserved', '2022-01-17 15:39:23'),
(252, 10, 36, 'A', 5, 800, 'reserved', '2022-01-17 15:39:25'),
(253, 10, 36, 'A', 6, 800, 'reserved', '2022-01-17 15:39:27'),
(254, 10, 36, 'A', 7, 800, 'reserved', '2022-01-17 15:39:29'),
(255, 10, 36, 'A', 8, 800, 'reserved', '2022-01-17 15:39:30'),
(256, 10, 36, 'A', 10, 800, 'reserved', '2022-01-17 15:39:32'),
(257, 10, 36, 'A', 9, 800, 'reserved', '2022-01-17 15:39:34'),
(258, 10, 36, 'A', 11, 800, 'reserved', '2022-01-17 15:39:36'),
(259, 10, 36, 'A', 12, 800, 'reserved', '2022-01-17 15:39:37'),
(260, 10, 36, 'B', 12, 800, 'reserved', '2022-01-17 15:39:39'),
(261, 10, 36, 'B', 11, 800, 'reserved', '2022-01-17 15:39:41'),
(262, 10, 36, 'B', 9, 800, 'reserved', '2022-01-17 15:39:42'),
(263, 10, 36, 'B', 10, 800, 'reserved', '2022-01-17 15:39:44'),
(264, 10, 36, 'B', 8, 800, 'reserved', '2022-01-17 15:39:46'),
(265, 10, 36, 'B', 7, 800, 'reserved', '2022-01-17 15:39:48'),
(266, 10, 36, 'B', 6, 800, 'reserved', '2022-01-17 15:39:49'),
(267, 10, 36, 'B', 5, 800, 'reserved', '2022-01-17 15:39:51'),
(268, 10, 36, 'B', 4, 800, 'reserved', '2022-01-17 15:39:52'),
(269, 10, 36, 'B', 3, 800, 'reserved', '2022-01-17 15:39:54'),
(270, 10, 36, 'B', 2, 800, 'reserved', '2022-01-17 15:39:56'),
(271, 10, 36, 'E', 2, 800, 'reserved', '2022-01-17 15:39:57'),
(272, 10, 36, 'D', 2, 800, 'reserved', '2022-01-17 15:39:59'),
(273, 10, 36, 'D', 3, 800, 'reserved', '2022-01-17 15:40:01'),
(274, 10, 36, 'E', 3, 800, 'reserved', '2022-01-17 15:40:02'),
(275, 10, 36, 'D', 4, 800, 'reserved', '2022-01-17 15:40:04'),
(276, 10, 36, 'E', 4, 800, 'reserved', '2022-01-17 15:40:06'),
(277, 10, 36, 'D', 5, 800, 'reserved', '2022-01-17 15:40:07'),
(278, 10, 36, 'E', 5, 800, 'reserved', '2022-01-17 15:40:09'),
(279, 10, 36, 'D', 6, 800, 'reserved', '2022-01-17 15:40:11'),
(280, 10, 36, 'E', 6, 800, 'reserved', '2022-01-17 15:40:13'),
(281, 10, 36, 'E', 7, 800, 'reserved', '2022-01-17 15:40:14'),
(282, 10, 36, 'D', 8, 800, 'reserved', '2022-01-17 15:40:16'),
(283, 10, 36, 'E', 8, 800, 'reserved', '2022-01-17 15:40:18'),
(284, 10, 36, 'D', 7, 800, 'reserved', '2022-01-17 15:40:20'),
(285, 10, 36, 'D', 9, 800, 'reserved', '2022-01-17 15:40:21'),
(286, 10, 36, 'E', 9, 800, 'reserved', '2022-01-17 15:40:23'),
(287, 10, 36, 'D', 10, 800, 'reserved', '2022-01-17 15:40:25'),
(288, 10, 36, 'E', 10, 800, 'reserved', '2022-01-17 15:40:27'),
(289, 10, 36, 'D', 11, 800, 'reserved', '2022-01-17 15:40:28'),
(290, 10, 36, 'E', 11, 800, 'reserved', '2022-01-17 15:40:30'),
(291, 10, 36, 'D', 12, 800, 'reserved', '2022-01-17 15:40:32'),
(292, 10, 36, 'E', 12, 800, 'reserved', '2022-01-17 15:40:33'),
(293, 10, 36, 'H', 12, 800, 'reserved', '2022-01-17 15:40:35'),
(294, 10, 36, 'G', 12, 800, 'reserved', '2022-01-17 15:40:37'),
(295, 10, 36, 'G', 11, 800, 'reserved', '2022-01-17 15:40:38'),
(296, 10, 36, 'H', 11, 800, 'reserved', '2022-01-17 15:40:40'),
(297, 10, 36, 'G', 10, 800, 'reserved', '2022-01-17 15:40:42'),
(298, 10, 36, 'H', 9, 800, 'reserved', '2022-01-17 15:40:44'),
(299, 10, 36, 'H', 10, 800, 'reserved', '2022-01-17 15:40:45'),
(300, 10, 36, 'G', 9, 800, 'reserved', '2022-01-17 15:40:47'),
(301, 10, 36, 'H', 8, 800, 'reserved', '2022-01-17 15:40:49'),
(302, 10, 36, 'G', 8, 800, 'reserved', '2022-01-17 15:40:50'),
(303, 10, 36, 'G', 7, 800, 'reserved', '2022-01-17 15:40:52'),
(304, 10, 36, 'H', 7, 800, 'reserved', '2022-01-17 15:40:54'),
(305, 10, 36, 'H', 6, 800, 'reserved', '2022-01-17 15:40:55'),
(306, 10, 36, 'G', 6, 800, 'reserved', '2022-01-17 15:40:57'),
(307, 10, 36, 'G', 5, 800, 'reserved', '2022-01-17 15:40:59'),
(308, 10, 36, 'H', 5, 800, 'reserved', '2022-01-17 15:41:00'),
(309, 10, 36, 'G', 4, 800, 'reserved', '2022-01-17 15:41:02'),
(310, 10, 36, 'H', 4, 800, 'reserved', '2022-01-17 15:41:04'),
(311, 10, 36, 'H', 3, 800, 'reserved', '2022-01-17 15:41:06'),
(312, 10, 36, 'G', 2, 800, 'reserved', '2022-01-17 15:41:07'),
(313, 10, 36, 'G', 3, 800, 'reserved', '2022-01-17 15:41:09'),
(314, 10, 36, 'H', 2, 800, 'reserved', '2022-01-17 15:41:11'),
(315, 1, 55, 'G', 2, 800, 'reserved', '2022-01-18 15:34:50'),
(316, 1, 55, 'D', 0, 800, 'reserved', '2022-01-18 15:34:52');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` int UNSIGNED NOT NULL,
  `genre` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `genre`) VALUES
(1, 'Horror'),
(2, 'Action'),
(3, 'Fantasy'),
(4, 'Comedy'),
(5, 'Drama'),
(6, 'Thriller'),
(7, 'Mystery'),
(8, 'Romance'),
(10, 'Sci-Fi'),
(11, 'Crime');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `summary` text COLLATE utf8_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `rating` decimal(2,1) UNSIGNED DEFAULT NULL,
  `trailer_url` text COLLATE utf8_unicode_ci NOT NULL,
  `poster_url` text COLLATE utf8_unicode_ci NOT NULL,
  `movie_type` enum('coming_soon','now_showing','removed') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'coming_soon'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `summary`, `year`, `rating`, `trailer_url`, `poster_url`, `movie_type`) VALUES
(4, 'GODZILLA VS KONG', 'Legends collide as Godzilla and Kong, the two most powerful forces of nature, clash on the big screen in a spectacular battle for the ages. As a squadron embarks on a perilous mission into fantastic uncharted terrain, unearthing clues to the Titans\' very origins and mankind\'s survival, a conspiracy threatens to wipe the creatures, both good and bad, from the face of the earth forever.', 2021, '6.5', 'https://media.publit.io/file/h_720/godzilla_vs_kong.mp4', 'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1615997337403-G2AT6OCZ0LD8VLQ1IHGC/ke17ZwdGBToddI8pDm48kJYq1aWJR-Opw9YCGEJvNoV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fL5tAx0_Wm6zQGcCxuXSnc3-CppMx_loiHYdjEK2HksYg/EwnOBogWEAEiakT.jpeg?format=1500w', 'now_showing'),
(34, 'JOKER', 'Arthur Fleck, a party clown, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of crime and chaos.', 2019, '8.4', 'https://media.publit.io/file/h_720/joker-x.mp4', 'https://pbs.twimg.com/media/EA4LLfsW4AErVjR.jpg', 'now_showing'),
(35, 'SUICIDE SQUAD 2', 'The government sends the most dangerous supervillains in the world -- Bloodsport, Peacemaker, King Shark, Harley Quinn and others -- to the remote, enemy-infused island of Corto Maltese. Armed with high-tech weapons, they trek through the dangerous jungle on a search-and-destroy mission, with only Col. Rick Flag on the ground to make them behave.', 2021, NULL, 'https://media.publit.io/file/h_720/suicide_squad.mp4', 'https://www.inspirationde.com/media/2019/08/cristiano-siqueira-on-behance-1565929796gk84n.png', 'coming_soon'),
(36, 'THE BATMAN', 'The Riddler plays a deadly game of cat and mouse with Batman and Commissioner Gordon in Gotham City.', 2022, NULL, 'https://media.publit.io/file/h_720/batman.mp4', 'https://www.inspirationde.com/media/2020/08/the-batman-poster-by-mizuriofficial-on-deviantart-15987584958gkn4.jpg', 'coming_soon');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genres`
--

CREATE TABLE `movie_genres` (
  `movie_id` int UNSIGNED NOT NULL,
  `genre_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie_genres`
--

INSERT INTO `movie_genres` (`movie_id`, `genre_id`) VALUES
(4, 1),
(4, 2),
(35, 2),
(36, 2),
(35, 3),
(4, 4),
(35, 4),
(34, 5),
(36, 5),
(34, 6),
(34, 11),
(36, 11);

-- --------------------------------------------------------

--
-- Table structure for table `movie_roles`
--

CREATE TABLE `movie_roles` (
  `movie_id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `role_type` enum('director','producer','cast') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `movie_roles`
--

INSERT INTO `movie_roles` (`movie_id`, `role_id`, `role_type`) VALUES
(4, 16, 'cast'),
(4, 17, 'cast'),
(4, 18, 'cast'),
(4, 19, 'director'),
(4, 20, 'producer'),
(34, 12, 'director'),
(34, 13, 'cast'),
(34, 14, 'cast'),
(34, 15, 'cast'),
(35, 8, 'cast'),
(35, 9, 'cast'),
(35, 10, 'cast'),
(35, 11, 'director'),
(36, 4, 'cast'),
(36, 5, 'cast'),
(36, 6, 'cast'),
(36, 7, 'director');

-- --------------------------------------------------------

--
-- Table structure for table `otp_codes`
--

CREATE TABLE `otp_codes` (
  `user_id` int UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `OTP` text NOT NULL,
  `expiration_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `otp_codes`
--

INSERT INTO `otp_codes` (`user_id`, `email`, `OTP`, `expiration_datetime`) VALUES
(10, 'arafaysaleem@gmail.com', '$2a$08$qEG2K154Ki4xZnxpVZ2znu3r.1rKutIRG57P4fBbxpvSBZXYSikM6', '2022-01-12 15:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int UNSIGNED NOT NULL,
  `amount` int NOT NULL,
  `payment_datetime` datetime NOT NULL,
  `payment_method` enum('cash','card','cod') COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `show_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `amount`, `payment_datetime`, `payment_method`, `user_id`, `show_id`) VALUES
(27, 68000, '2021-06-06 03:33:47', 'card', 10, 29),
(28, 16800, '2021-06-06 03:36:43', 'card', 10, 35),
(29, 13600, '2021-06-06 03:42:26', 'card', 10, 54),
(30, 2400, '2021-06-06 21:24:38', 'card', 10, 29),
(31, 4800, '2021-06-06 22:43:28', 'card', 10, 39),
(32, 4800, '2021-06-10 19:00:53', 'card', 2, 41),
(33, 3200, '2021-06-28 18:00:06', 'card', 10, 43),
(34, 4800, '2021-07-16 00:44:55', 'card', 10, 30),
(35, 800, '2021-08-08 03:35:43', 'card', 10, 30),
(36, 800, '2021-08-17 19:47:21', 'card', 10, 23),
(37, 1600, '2021-08-18 10:47:04', 'card', 10, 23),
(38, 2400, '2021-09-14 00:24:47', 'card', 10, 27),
(39, 24800, '2021-09-17 00:44:47', 'card', 10, 26),
(40, 2400, '2021-09-23 16:01:34', 'card', 10, 23),
(41, 3200, '2021-10-14 16:08:56', 'card', 10, 30),
(42, 3200, '2021-11-20 02:31:38', 'card', 10, 23),
(43, 3200, '2022-01-12 19:26:56', 'card', 10, 26),
(44, 3200, '2022-01-14 19:05:21', 'card', 10, 29);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int UNSIGNED NOT NULL,
  `full_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `age` tinyint UNSIGNED NOT NULL,
  `picture_url` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `full_name`, `age`, `picture_url`) VALUES
(4, 'Robert Pattinson', 35, 'https://i.pinimg.com/564x/8d/e3/89/8de389c84e919d3577f47118e2627d95.jpg'),
(5, 'Zoë Kravitz', 32, 'https://www.simplyceleb.com/wp-content/uploads/2020/06/Zoe-Kravitz-Filmleri.jpg'),
(6, 'Paul Dano', 36, 'https://resizing.flixster.com/1PQhbMray969ia5n7JHLBO3qATA=/506x652/v2/https://flxt.tmsimg.com/v9/AllPhotos/267214/267214_v9_ba.jpg'),
(7, 'Mat Reeves', 55, 'https://i.dailymail.co.uk/1s/2020/04/10/05/27028708-0-image-a-2_1586494056548.jpg'),
(8, 'Margot Robbie', 30, 'https://hips.hearstapps.com/elleuk.cdnds.net/18/10/1520210874-gettyimages-927252130.jpg?crop=0.988xw:0.658xh;0.0119xw,0.0691xh&resize=640:*'),
(9, 'Pete Davidson', 27, 'https://media.nu.nl/m/ansxdkraedri_sqr256.jpg/pete-davidson-vertelt-nieuwe-liefdes-meteen-over-eigenaardigheden.jpg'),
(10, 'John Cena', 44, 'https://ichef.bbci.co.uk/news/976/cpsprodpb/2536/production/_118662590_cena2.jpg'),
(11, 'James Gunn', 50, 'https://ichef.bbci.co.uk/news/976/cpsprodpb/22F5/production/_103794980_gettyimages-678895846.jpg'),
(12, 'Todd Phillips', 50, 'https://i.redd.it/hwk9xgheqzm51.jpg'),
(13, 'Zazie Beetz', 30, 'https://resizing.flixster.com/t3iiAgmwNQpbDsiVNvNc8s3Zuug=/506x652/v2/https://flxt.tmsimg.com/v9/AllPhotos/981946/981946_v9_bb.jpg'),
(14, 'Robert De Niro', 77, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Robert_De_Niro_Cannes_2016.jpg/220px-Robert_De_Niro_Cannes_2016.jpg'),
(15, 'Joaquin Phoenix', 46, 'https://i.pinimg.com/originals/1d/2e/12/1d2e12756addc022144c4a8ac437f5c0.jpg'),
(16, 'Millie Bobby Brown', 17, 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQhVfKxsjWZM-30ElFKcETvE1VUZyZ9OV3UcxZ_5O6hQMmawqCV'),
(17, 'Alexander Skarsgård', 44, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTXROK8cAOBwEOohepzhbjJdpAUVQBTVOaWQ4Rtp6iR0wMLyx4W'),
(18, 'Rebecca Hall', 39, 'https://i.pinimg.com/originals/30/ac/b4/30acb4e1f6f8f0437a8fb7ceb04085db.jpg'),
(19, 'Adam Wingard', 38, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkWTdn0iu8DiewFAFNvOEOXtFctVTC2-fCX5LWZJN8tc8l035q'),
(20, 'Mary Parent', 53, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTai8Ehm5_kioXJMqPfvIoFx8QwIOYsyoqUhFT0Im6FiIL1_mI_');

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `show_id` int UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `date` date NOT NULL,
  `movie_id` int UNSIGNED NOT NULL,
  `theater_id` int UNSIGNED NOT NULL,
  `show_status` enum('free','almost_full','full') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'free',
  `show_type` enum('3D','2D') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shows`
--

INSERT INTO `shows` (`show_id`, `start_time`, `end_time`, `date`, `movie_id`, `theater_id`, `show_status`, `show_type`) VALUES
(23, '10:00:00', '12:15:00', '2021-06-05', 4, 16, 'free', '3D'),
(24, '12:30:00', '14:45:00', '2021-06-05', 4, 16, 'free', '3D'),
(25, '18:30:00', '20:45:00', '2021-06-05', 4, 15, 'almost_full', '3D'),
(26, '21:30:00', '23:45:00', '2021-06-05', 4, 15, 'free', '3D'),
(27, '21:30:00', '23:45:00', '2021-06-06', 4, 15, 'free', '3D'),
(28, '18:30:00', '20:45:00', '2021-06-06', 4, 22, 'almost_full', '3D'),
(29, '19:30:00', '21:45:00', '2021-06-06', 4, 16, 'almost_full', '3D'),
(30, '12:30:00', '14:45:00', '2021-06-07', 4, 16, 'almost_full', '3D'),
(31, '18:30:00', '20:45:00', '2021-06-07', 4, 16, 'full', '3D'),
(32, '18:30:00', '20:45:00', '2021-06-07', 4, 15, 'full', '3D'),
(33, '19:30:00', '21:45:00', '2021-06-07', 4, 22, 'full', '3D'),
(34, '21:30:00', '23:45:00', '2021-06-07', 4, 16, 'full', '3D'),
(35, '12:30:00', '14:45:00', '2021-06-05', 34, 15, 'free', '3D'),
(36, '13:30:00', '15:45:00', '2021-06-05', 34, 22, 'almost_full', '3D'),
(37, '16:30:00', '18:45:00', '2021-06-05', 34, 16, 'free', '3D'),
(38, '16:30:00', '18:45:00', '2021-06-06', 34, 16, 'free', '3D'),
(39, '18:30:00', '20:45:00', '2021-06-06', 34, 15, 'almost_full', '3D'),
(40, '21:30:00', '23:45:00', '2021-06-06', 34, 22, 'full', '3D'),
(41, '21:30:00', '23:45:00', '2021-06-07', 34, 15, 'free', '3D'),
(42, '15:30:00', '17:45:00', '2021-06-07', 34, 15, 'free', '3D'),
(43, '10:30:00', '12:45:00', '2021-06-07', 34, 15, 'free', '3D'),
(44, '10:30:00', '12:45:00', '2021-06-07', 35, 22, 'free', '2D'),
(45, '13:30:00', '15:45:00', '2021-06-07', 35, 22, 'free', '2D'),
(46, '15:30:00', '17:45:00', '2021-06-07', 35, 16, 'full', '2D'),
(47, '16:30:00', '18:45:00', '2021-06-07', 35, 22, 'free', '2D'),
(48, '13:30:00', '15:45:00', '2021-06-08', 35, 22, 'almost_full', '2D'),
(49, '16:00:00', '18:15:00', '2021-06-08', 35, 16, 'almost_full', '2D'),
(50, '18:00:00', '20:15:00', '2021-06-08', 35, 15, 'almost_full', '2D'),
(51, '18:00:00', '20:15:00', '2021-06-08', 35, 22, 'almost_full', '2D'),
(52, '21:00:00', '23:15:00', '2021-06-08', 35, 15, 'almost_full', '2D'),
(53, '21:00:00', '23:15:00', '2021-06-08', 35, 16, 'almost_full', '2D'),
(54, '09:00:00', '11:15:00', '2021-06-06', 35, 22, 'free', '2D'),
(55, '18:00:00', '19:30:00', '2021-06-10', 36, 22, 'free', '3D'),
(56, '18:00:00', '19:30:00', '2021-06-10', 36, 16, 'free', '3D'),
(57, '19:00:00', '20:30:00', '2021-06-10', 36, 15, 'free', '3D'),
(58, '22:00:00', '23:30:00', '2021-06-10', 36, 15, 'free', '3D'),
(59, '21:00:00', '22:30:00', '2021-06-10', 36, 16, 'free', '3D');

-- --------------------------------------------------------

--
-- Table structure for table `theaters`
--

CREATE TABLE `theaters` (
  `theater_id` int UNSIGNED NOT NULL,
  `theater_name` char(1) COLLATE utf8_unicode_ci NOT NULL COMMENT 'one letter name',
  `num_of_rows` smallint UNSIGNED NOT NULL,
  `seats_per_row` smallint UNSIGNED NOT NULL,
  `theater_type` enum('normal','royal') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `theaters`
--

INSERT INTO `theaters` (`theater_id`, `theater_name`, `num_of_rows`, `seats_per_row`, `theater_type`) VALUES
(8, 'A', 10, 20, 'normal'),
(10, 'B', 5, 5, 'royal'),
(15, 'C', 10, 10, 'normal'),
(16, 'D', 12, 15, 'royal'),
(22, 'E', 8, 13, 'normal');

-- --------------------------------------------------------

--
-- Table structure for table `theater_seats`
--

CREATE TABLE `theater_seats` (
  `seat_row` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `seat_number` smallint UNSIGNED NOT NULL,
  `theater_id` int UNSIGNED NOT NULL,
  `seat_type` enum('missing','blocked') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `theater_seats`
--

INSERT INTO `theater_seats` (`seat_row`, `seat_number`, `theater_id`, `seat_type`) VALUES
('A', 11, 15, 'missing'),
('B', 0, 15, 'missing'),
('A', 11, 16, 'missing'),
('B', 11, 16, 'missing'),
('C', 11, 16, 'missing'),
('D', 11, 16, 'missing'),
('A', 3, 15, 'missing'),
('B', 3, 15, 'missing'),
('C', 3, 15, 'missing'),
('D', 3, 15, 'missing'),
('E', 3, 15, 'missing'),
('F', 3, 15, 'missing'),
('G', 3, 15, 'missing'),
('H', 3, 15, 'missing'),
('I', 3, 15, 'missing'),
('J', 3, 15, 'missing'),
('A', 7, 15, 'missing'),
('B', 7, 15, 'missing'),
('C', 7, 15, 'missing'),
('D', 7, 15, 'missing'),
('E', 7, 15, 'missing'),
('F', 7, 15, 'missing'),
('G', 7, 15, 'missing'),
('H', 7, 15, 'missing'),
('I', 7, 15, 'missing'),
('J', 7, 15, 'missing'),
('A', 4, 16, 'missing'),
('B', 4, 16, 'missing'),
('C', 4, 16, 'missing'),
('D', 4, 16, 'missing'),
('D', 0, 16, 'missing'),
('D', 1, 16, 'missing'),
('D', 2, 16, 'missing'),
('D', 3, 16, 'missing'),
('I', 0, 16, 'missing'),
('I', 1, 16, 'missing'),
('I', 2, 16, 'missing'),
('I', 3, 16, 'missing'),
('I', 4, 16, 'missing'),
('J', 4, 16, 'missing'),
('K', 4, 16, 'missing'),
('L', 4, 16, 'missing'),
('A', 10, 16, 'missing'),
('B', 10, 16, 'missing'),
('C', 10, 16, 'missing'),
('D', 10, 16, 'missing'),
('D', 11, 16, 'missing'),
('D', 12, 16, 'missing'),
('D', 13, 16, 'missing'),
('D', 14, 16, 'missing'),
('I', 10, 16, 'missing'),
('J', 10, 16, 'missing'),
('K', 10, 16, 'missing'),
('L', 10, 16, 'missing'),
('I', 11, 16, 'missing'),
('I', 12, 16, 'missing'),
('I', 13, 16, 'missing'),
('I', 14, 16, 'missing'),
('E', 5, 16, 'missing'),
('E', 6, 16, 'missing'),
('E', 7, 16, 'missing'),
('E', 8, 16, 'missing'),
('E', 9, 16, 'missing'),
('F', 5, 16, 'missing'),
('F', 9, 16, 'missing'),
('G', 5, 16, 'missing'),
('G', 9, 16, 'missing'),
('H', 5, 16, 'missing'),
('H', 6, 16, 'missing'),
('H', 7, 16, 'missing'),
('H', 8, 16, 'missing'),
('H', 9, 16, 'missing'),
('C', 0, 22, 'missing'),
('C', 1, 22, 'missing'),
('C', 2, 22, 'missing'),
('C', 3, 22, 'missing'),
('C', 4, 22, 'missing'),
('C', 5, 22, 'missing'),
('C', 6, 22, 'missing'),
('C', 7, 22, 'missing'),
('C', 8, 22, 'missing'),
('C', 9, 22, 'missing'),
('C', 10, 22, 'missing'),
('C', 11, 22, 'missing'),
('C', 12, 22, 'missing'),
('F', 0, 22, 'missing'),
('F', 1, 22, 'missing'),
('F', 2, 22, 'missing'),
('F', 3, 22, 'missing'),
('F', 4, 22, 'missing'),
('F', 5, 22, 'missing'),
('F', 6, 22, 'missing'),
('F', 7, 22, 'missing'),
('F', 8, 22, 'missing'),
('F', 9, 22, 'missing'),
('F', 10, 22, 'missing'),
('F', 11, 22, 'missing'),
('F', 12, 22, 'missing');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int UNSIGNED NOT NULL,
  `full_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `contact` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `role` enum('api_user','admin','super_user') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `address`, `contact`, `role`) VALUES
(1, 'Test Admin', 'admin@gmail.com', '$2a$08$y4hYovfviz31AZhru3t4FObYrLFrhdBNETXikx6WFD9VYGbUZucYO', 'Karachi', '+923009999999', 'admin'),
(2, 'Test User', 'user@gmail.com', '$2a$08$V5FWrXIoHeJPGe0WDgQcJ.eJEX.rz6tCtevaNSKBH6deaoVDKMosS', 'Karachi', '+923009999999', 'api_user'),
(10, 'Email Test User', 'arafaysaleem@gmail.com', '$2a$08$36p1ozvvj/MEoHBBp5ZxY.f46YUg.wACpZ8W7/wA52qhAKvFUaxfu', 'Karachi', '+923009999999', 'api_user'),
(11, 'Test User', 'user2@gmail.com', '$2a$08$dP89ppGNiMczZM0JToQwF.WtiR53NL0j.r55wBNJP03sjDh/VpcrC', 'Karachi', '+923009999999', 'api_user'),
(14, 'Test User 3', 'user3@gmail.com', '$2a$08$hyIqip2MuwqbmkKIoiWG9eihI0HkAF0aB.3aWVUBO0YiBPIBawEDK', 'Karachi', '+923009999999', 'api_user'),
(15, 'Delete Me', 'deleteme@eztickets.com', '$2a$08$lWgRO3U/XnZ3Etw0HQE4cOgCXsb/UDu3tYcRx.NzoIb6y96Cwa0ea', 'Re', '+923009268622', 'api_user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD UNIQUE KEY `unique_booking_details` (`user_id`,`show_id`,`seat_row`,`seat_number`) USING BTREE,
  ADD KEY `fk_bookings_show_id` (`show_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `fk_mgenres_genre_id` (`genre_id`);

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
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_payments_user_id` (`user_id`),
  ADD KEY `fk_payment_show_id` (`show_id`);

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
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=317;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `show_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `theaters`
--
ALTER TABLE `theaters`
  MODIFY `theater_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_bookings_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD CONSTRAINT `fk_mgenres_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`),
  ADD CONSTRAINT `fk_mgenres_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_roles`
--
ALTER TABLE `movie_roles`
  ADD CONSTRAINT `fk_mroles_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_mroles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD CONSTRAINT `fk_otp_codes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payment_show_id` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_payments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `shows`
--
ALTER TABLE `shows`
  ADD CONSTRAINT `fk_shows_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
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
