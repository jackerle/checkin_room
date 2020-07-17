-- MySQL dump 10.16  Distrib 10.1.44-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: checkin_room
-- ------------------------------------------------------
-- Server version       10.1.44-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `checkin_room`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `checkin_room` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `checkin_room`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` char(50) NOT NULL,
  `hash_password` varchar(1000) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `about` mediumtext,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('','e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855','',1,'undefined'),('admin','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','test test',1,'for test'),('jackerle','5e69001cc5b4a7b6e24f0017eb88843991ce596021f35c24e4f4834e7a0eda86','ภาณวชญ วงศทองพสท',1,'Hello');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_schedule`
--

DROP TABLE IF EXISTS `class_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_schedule` (
  `class_id` char(10) NOT NULL,
  `class_sect` int(11) NOT NULL,
  `class_day` tinyint(6) NOT NULL,
  `class_start_time` time NOT NULL,
  `class_end_time` time NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  KEY `class_id` (`class_id`,`class_sect`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `class_schedule_ibfk_1` FOREIGN KEY (`class_id`, `class_sect`) REFERENCES `class_table` (`class_id`, `class_sect`),
  CONSTRAINT `class_schedule_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room_table` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `class_table`
--

DROP TABLE IF EXISTS `class_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_table` (
  `class_id` char(10) NOT NULL,
  `class_sect` int(11) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  PRIMARY KEY (`class_id`,`class_sect`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `reg_class`
--

DROP TABLE IF EXISTS `reg_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reg_class` (
  `class_id` char(10) NOT NULL,
  `class_sect` int(11) NOT NULL,
  `student_id` char(20) NOT NULL,
  PRIMARY KEY (`class_id`,`class_sect`,`student_id`),
  KEY `class_id` (`class_id`),
  KEY `class_sect` (`class_sect`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `reg_class_ibfk_1` FOREIGN KEY (`class_id`, `class_sect`) REFERENCES `class_table` (`class_id`, `class_sect`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `room_table`
--

DROP TABLE IF EXISTS `room_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_table` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_table`
--

LOCK TABLES `room_table` WRITE;
/*!40000 ALTER TABLE `room_table` DISABLE KEYS */;
INSERT INTO `room_table` VALUES (1,'หอง 4306',50),(2,'หอง 4310',64),(3,'หอง 4318',64),(4,'หอง 402 ว.3',36),(5,'หอง 403 ว.3',36);
/*!40000 ALTER TABLE `room_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_table`
--

DROP TABLE IF EXISTS `student_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_table` (
  `u_id` char(100) NOT NULL,
  `student_id` char(20) NOT NULL,
  `student_name` char(200) NOT NULL,
  PRIMARY KEY (`u_id`,`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `room_id` int(11) NOT NULL,
  `u_id` char(100) NOT NULL,
  `timestamp_checkin` timestamp NULL DEFAULT NULL,
  `timestamp_checkout` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `role` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-15 12:05:28
