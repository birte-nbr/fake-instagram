-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 21, 2024 at 10:35 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instagram`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(255) NOT NULL,
  `commenter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `caption` varchar(255) NOT NULL,
  `photo` tinyint(1) NOT NULL,
  `course` tinyint(1) NOT NULL,
  `collaboration_id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `code_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `author_id`, `post_date`, `caption`, `photo`, `course`, `collaboration_id`, `path`, `code_text`) VALUES
(1, 2, '2024-02-15 00:00:00', 'This is the caption', 1, 1, 2, '2024-02-15-filename.jpg', ''),
(2, 1, '2024-04-15 19:56:55', 'a beautiful day', 1, 1, 1, '5450klein.jpg', 'none'),
(16, 3, '2024-04-16 20:41:47', 'my caption ', 1, 1, 1, '872720220211_164244.jpg', 'none'),
(17, 3, '2024-04-16 20:55:38', 'my caption', 1, 1, 1, '2764Conch shell tattoo design short.jpeg', 'none'),
(18, 3, '2024-04-16 22:17:02', 'my code', 0, 2, 1, 'none', 'hmmm'),
(23, 3, '2024-04-20 15:39:45', 'testetst', 1, 3, 1, 'none', 'console.log(\"jaaa\");'),
(24, 2, '2024-04-21 11:00:54', 'this was my culinary project last year!', 1, 1, 1, '5306PXL_20210320_195434195.jpg', 'none'),
(25, 4, '2024-04-21 11:08:52', 'my code looks bad guys', 0, 2, 1, 'none', 'blablabl'),
(26, 6, '2024-04-21 11:13:03', 'my design', 1, 3, 1, '7066Conch shell tattoo design short.jpeg', 'none'),
(27, 5, '2024-04-21 11:19:44', 'my project!', 1, 2, 1, '2694Conch shell tattoo design short.jpeg', 'none'),
(28, 6, '2024-04-21 11:20:24', 'my project!', 1, 1, 1, '4173Conch shell tattoo design short.jpeg', 'none'),
(29, 3, '2024-04-21 14:59:40', 'here is the caption for this image', 1, 2, 1, '90972024-02-15-filename-2.jpg.jpg', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `given_name` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `profile_pic` tinyint(1) NOT NULL,
  `background_pic` tinyint(1) NOT NULL,
  `fav_course` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `surname`, `given_name`, `email_address`, `country`, `date_of_birth`, `profile_pic`, `background_pic`, `fav_course`) VALUES
(0, 'test-user', 'Doe', 'Joe', 'joe-doe@gmail.com', 'Ireland', '2024-02-12', 0, 0, 0),
(1, 'user1', 'Smith', 'John', 'user1@example.com', 'USA', '1990-01-01', 0, 0, 0),
(2, 'user2', 'Johnson', 'Emily', 'user2@example.com', 'Canada', '1995-03-15', 0, 0, 0),
(3, 'user3', 'Brown', 'Michael', 'user3@example.com', 'UK', '1988-07-20', 0, 0, 0),
(4, 'user4', 'Davis', 'Emma', 'user4@example.com', 'Australia', '1992-11-30', 0, 0, 0),
(5, 'user5', 'Wilson', 'Sophia', 'user5@example.com', 'Germany', '1985-04-10', 0, 0, 0),
(6, 'user6', 'Martinez', 'Daniel', 'user6@example.com', 'Spain', '1998-09-25', 0, 0, 0),
(7, 'user7', 'Taylor', 'Olivia', 'user7@example.com', 'France', '1993-12-05', 0, 0, 0),
(8, 'user8', 'Anderson', 'James', 'user8@example.com', 'Brazil', '1996-02-18', 0, 0, 0),
(3374, 'f3pomevp', 'on3pnp', 'oeinn3ovk ', '	fl3mf3p', 'êfpo3p', '2024-04-03', 1, 2, 1),
(8136, 'efofon1', 'pfmpf3m', 'wmpfpem', 'mfepmepfm', 'pwfp', '1111-09-07', 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
