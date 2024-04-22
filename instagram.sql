-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 22, 2024 at 10:01 PM
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
  `code_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `author_id`, `post_date`, `caption`, `photo`, `course`, `collaboration_id`, `path`, `code_text`) VALUES
(34, 4, '2024-04-22 17:57:34', 'Hi guys! We figured out how to do the accessibility with ARIA controls!', 0, 1, 1, 'none', '<header>\r\n       <a href=\"#main\" class=\"skip\">Skip to main content</a>\r\n       <script src=\"https://cdn.userway.org/widget.js\" data-account=\"nY3cImFAaN\"></script>\r\n       <nav class=\"navbar\">\r\n           <div class=\"logo\"><a href=\"homepage.html\" aria-label=\"Return to Homepage\" ><img src=\"images/ESSDG_Logo.png\" alt=\"Logo\" class=\"logo-img\"></a></div>      \r\n           <button class=\"menu-toggle\" onclick=\"toggleMenu()\" aria-controls=\"menuContent\" aria-expanded=\"false\" aria-label=\"Toggle menu\"></button>\r\n           <!-- <label for=\"toggle\"></label> -->\r\n           <div class=\"menu\" id=\"menuContent\">\r\n               <ul>\r\n                   <li><a href=\"homepage.html\" aria-label=\"Link to Homepage\" >Home</a></li>\r\n                   <li><a href=\"architecture.html\" aria-label=\"Link to Architecture page\">Architecture</a></li>\r\n                   <li><a href=\"timeline.html\" aria-label=\"Link to Timeline page\">Timeline</a></li>\r\n                   <li><a href=\"blog.html\" aria-label=\"Link to Blog page\">Blog</a></li>\r\n                   <li><a href=\"about.html\" aria-label=\"Link to About us page\">About Us</a></li>\r\n                   <li><a href=\"contact.html\" aria-label=\"Link to Contact page\">Contact</a></li>\r\n                   <li><a href=\"terms.html\" aria-label=\"Link to Terms and Conditions page\">Terms and Conditions</a></li>\r\n               </ul>\r\n           </div>\r\n       </nav>\r\n   </header>'),
(35, 2, '2024-04-22 18:51:12', 'I am using a GSAP scroll-trigger! It works super well for the project page.\r\n', 0, 2, 1, 'none', '//scroll trigger (scrolling = moving right on timeline)\r\nlet scrollTween = gsap.to(selections, {\r\n   xPercent: -100 * (selections.length - 1), // x-axis scroll\r\n   ease: \"none\", // constant speed of animation\r\n   scrollTrigger: {\r\n       trigger: \".timeline_project\",\r\n       pin: true, // element will be pinned to the viewport (while scrolling trigger, no down scrolling)\r\n       scrub: 1, // scroll and movement of text happens synchronized\r\n       end: \"+=1500\" // End point when all text sections are fully shown\r\n   }\r\n});\r\n'),
(36, 3, '2024-04-22 18:54:45', 'Here is my focus function on css.', 0, 1, 1, 'none', '/* focus style to all elements FOR ACCESIIBILITY TAP BUTTON*/\r\n*:focus-visible {\r\n   outline: 3px solid #007bff;\r\n   outline-offset: 5px; /*padding around element*/\r\n}\r\n'),
(37, 9, '2024-04-22 18:56:13', 'These are the functions we used for the 3D model on our page:', 0, 2, 1, 'none', '// call all functions\r\nresizeModel();\r\nzoomModel();\r\nsetAutoRotateModel();\r\nzoomModel();\r\nsetRotateSpeedOfModel();\r\nsetOrbitSensitivityForModel();\r\n'),
(38, 10, '2024-04-22 18:56:48', 'Easy banner:', 0, 1, 1, 'none', '<section class=\"banner_contact\">\r\n       <h1>Contact</h1>\r\n       <img src=\"images/contact.jpg\" alt=\"Basilica de la Sagrada Familia Photo\">\r\n   </section>'),
(40, 2, '2024-04-22 18:58:15', 'This is an easy toggle function for a burger menu!', 0, 1, 1, 'none', '// Burger menu functionality\r\nfunction toggleMenu() {\r\n   var menu = document.querySelector(\'.menu\');\r\n   menu.style.display = (menu.style.display === \'block\') ? \'none\' : \'block\';\r\n    //marina added: change the \"aria-expanded\" attribute\r\n   var menuToggle = document.querySelector(\'.menu-toggle\');\r\n   var isExpanded = menuToggle.getAttribute(\'aria-expanded\') === \'true\';\r\n   menuToggle.setAttribute(\'aria-expanded\', !isExpanded);\r\n}\r\n\r\n\r\nfunction closeMenuOnClickOutside(event) {\r\n   var menu = document.querySelector(\'.menu\');\r\n   var menuToggle = document.querySelector(\'.menu-toggle\');   \r\n  \r\n   if (!menu.contains(event.target) && !menuToggle.contains(event.target))'),
(41, 7, '2024-04-22 19:02:54', '\r\n How to make a burger menu accessible:\r\n', 0, 1, 1, 'none', 'document.addEventListener(\'keydown\', function(event) {\r\n   if (event.key === \'Tab\') {\r\n       var menu = document.querySelector(\'.menu\');\r\n       var menuToggle = document.querySelector(\'.menu-toggle\');\r\n       if (!menu.contains(document.activeElement) && document.activeElement !== menuToggle) {\r\n           menu.style.display = \'none\';\r\n           menuToggle.setAttribute(\'aria-expanded\', \'false\');\r\n       }\r\n   }\r\n});\r\n'),
(42, 8, '2024-04-22 19:12:28', 'Guys, for those of you who do not have jumper wires, I figured out how to connect the Arduino Uno on the bottom of the Sensor Kit:', 1, 3, 1, 'arduino.jpg', 'none'),
(43, 9, '2024-04-22 19:13:31', 'Rendering worked well! Just click on “render image” and 4k resolution! Don’t forget to click on “include lights”!', 1, 3, 1, 'lights.jpg', 'none'),
(44, 17, '2024-04-22 19:15:12', 'This is my newest assignment for John\'s class! If anyone needs help, I can teach you Three.js!', 1, 3, 1, 'threejs.jpg', 'none'),
(45, 1, '2024-04-22 19:16:08', 'this is our blog page!', 1, 1, 1, 'webpage.jpg', 'none'),
(46, 18, '2024-04-22 19:17:02', '', 1, 1, 1, 'mdelpage.jpg', 'none'),
(47, 5, '2024-04-22 19:18:41', 'Just went on vacation to Geiranger in Norway and thought I’d make an illustration off it… what do you guys think?', 1, 3, 1, 'geiranger.jpg', 'none');

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
(1, 'john_doe', 'Doe', 'John', 'john@example.com', 'USA', '1990-01-01', 1, 1, 3),
(2, 'jane_smith', 'Smith', 'Jane', 'jane@example.com', 'UK', '1985-03-15', 2, 2, 5),
(3, 'sam_jones', 'Jones', 'Sam', 'sam@example.com', 'Australia', '1988-07-20', 1, 2, 1),
(4, 'emily_wilson', 'Wilson', 'Emily', 'emily@example.com', 'Canada', '1992-05-10', 2, 1, 4),
(5, 'michael_brown', 'Brown', 'Michael', 'michael@example.com', 'Germany', '1983-11-30', 1, 1, 2),
(6, 'olivia_taylor', 'Taylor', 'Olivia', 'olivia@example.com', 'France', '1995-09-25', 2, 2, 3),
(7, 'william_clark', 'Clark', 'William', 'william@example.com', 'Spain', '1987-02-18', 1, 1, 5),
(8, 'sophia_anderson', 'Anderson', 'Sophia', 'sophia@example.com', 'Italy', '1991-06-12', 2, 2, 1),
(9, 'ethan_thomas', 'Thomas', 'Ethan', 'ethan@example.com', 'Japan', '1980-04-05', 1, 2, 4),
(10, 'ava_rodriguez', 'Rodriguez', 'Ava', 'ava@example.com', 'Brazil', '1993-08-08', 2, 1, 5),
(17, 'monroe_miller', 'Miller', 'Monroe', 'monroe@example.com', 'USA', '1987-06-25', 1, 2, 4),
(18, 'jesse_jackson', 'Jackson', 'Jesse', 'jesse@example.com', 'UK', '1991-12-12', 2, 1, 5),
(19, 'lana_rose', 'Rose', 'Lana', 'lana@example.com', 'Australia', '1988-03-03', 1, 2, 2),
(3535, 'birtenbr', 'Neubauer', 'Birte', 'birte@example.com', 'Germany', '2000-02-15', 1, 1, 1);

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
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
