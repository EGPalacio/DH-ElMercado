CREATE DATABASE  IF NOT EXISTS `site_team4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `site_team4`;
-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: site_team4
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Indumentaria'),(2,'Tecnologia'),(3,'Entretenimiento'),(4,'Electrodomesticos');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `id` int NOT NULL,
  `discount` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,10),(2,20),(3,30);
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `discount_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `discount_id` (`discount_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Macbook Pro 2022','Macbook Pro 2019 Mpxq2ll/a Intel Core i5 2.3 Ghz 8gb RAM 128gb SSD Pantalla 13.3\" Retina Apple Nueva Original. Importada de USA. Se entrega con la factura de compra para contar con la garantía del fabricante',800,'img-macbook-pro-2019.jpg',NULL,NULL,NULL,NULL),(4,'Heladera no frost Whirlpool WRM45A','Disfrutá de la frescura de tus alimentos y almacenalos de manera práctica y cómoda en tu heladera Whirlpool, la protagonista de tu cocina. Su sistema no frost evita la generación de escarcha y te permitirá conservar el sabor y las propiedades nutritivas de los productos.A su vez, su freezer cuenta con una capacidad de 86 litros, que facilitará la distribución y el orden de tus congelados para que no te preocupes por la falta de espacio.',47900,'img-heladera-whirpool.jpg',NULL,NULL,NULL,NULL),(5,'Nikon Reflex D3500 - Kit','Incluye la cámara D3500, el objetivo zoom AF-P DX NIKKOR 18-55mm y el superteleobjetivo zoom compacto AF-P DX NIKKOR 70-300mm. Ambos objetivos enfocan de forma rápida y silenciosa, lo que resulta ideal para grabar metraje de vídeo sin que se escuche apenas el ruido del accionamiento.',53000,'img-camara-nikon.jpg',NULL,NULL,NULL,NULL),(6,'Aire Acondicionado 3200w Frio / Calor','AIRE SPLIT 3200W TACA-3200WCHSA/KC FC TCL. Capacidad frio 3200 Watts. Capacidad calor 3300 Watts. Potencia Electrica(W)frio 996. Potencia Electrica(W)calor 1028. Eficiencia energética calor C. Eficiencia energética frio A. Frigorias 2750 UNIDAD INTERIOR. Peso Bruto 10kg. Peso Neto 7 kg',20999,'img-aire-acondicionado.jpg',NULL,NULL,NULL,NULL),(7,'Notebook Lenovo I3 Intel 8gb Ram','PROCESADOR / CHIPSET. CPU: Intel Core i3(8a generación) 8130U / 2.2 GHz. Velocidad turbo máxima: 3, 4 GHz. Numero de núcleos: Doble núcleo. Cache: 4 MB. Arquitectura de 64 bit: ss. MEMORIA CACHÉ. Tamaño instalada: 4 MB. ALMACENAMIENTO. Interfaz Serial ATA - 600',36700,'img-laptop-lenovo.jpg',NULL,NULL,NULL,NULL),(8,'Apple iPhone 11 Pro Dual SIM 256 GB','¡El nuevo smartphone que lo tiene todo! Con este lanzamiento, Apple ha superado todos sus récords. Su diseño se destaca por sus líneas finas y distinguidas a partir de una sola hoja de vidrio resistente, combinada con aluminio de excelente calidad.',148000,'img-iphone-11.jpg',NULL,NULL,NULL,NULL),(13,'Smart TV Samsung 4K 50','Con el Smart TV Samsung UN50MU6100, viví una nueva experiencia visual con la resolución 4K, que te presentará imágenes con gran detalle y de alta calidad. Ahora todo lo que veas cobrará vida con brillo y colores más reales. Gracias a su tamaño de 50\", podrás transformar tu espacio en una sala de cine y transportarte a donde quieras.',34990,'img-tv-samsung-smart.jpg',NULL,NULL,NULL,NULL),(14,'Sony S6700 Reproductor De Blu-ray ','Disfruta de tus películas favoritas con hasta cuatro veces más detalles que Full HD, gracias a la conversión de señales 4K. Cuando se conecta a un televisor compatible,un procesador de video avanzado convierte el video estándar en una señal cercana a la resolución 4K (3840 x 2160). Con ocho millones de píxeles, obtendrás imágenes más nítidas y detalladas, y la mayor calidad de la image te permite sentarte más cerca de la pantalla para que te sientas como en el cine.',10999,'img-sony-blueray.jpg',NULL,NULL,NULL,NULL),(15,'Bicicleta Mountain Bike Fierce Rodado 29','Bicicleta Mountain Bike Fierce Rodado 29 21 velocidades. Tipo: Mountain Bike. Rodado: 29. Material Cuadro: Aluminio. Talle: 18. Suspensión: Delantera. Velocidades: 21 - Shimano. Sistema de Freno: Disco Mecánico. Llantas: Doble pared.',15979,'img-bicicleta-fierce.jpg',NULL,NULL,NULL,NULL),(16,'Sony Srs-xb12 Parlante Bluetooth Portátil','Deja que la música dance cobre vida con EXTRA BASS™ Anima el ambiente con EXTRA BASS™1. Un radiador pasivo trabaja con el parlante monoaural para potenciar los tonos bajos y mejorar los graves, a pesar del tamaño compacto. ',4699,'img-parlante-sony.jpg',NULL,NULL,NULL,NULL),(17,'Teclado Super','descripcion teclado Super, escribe solo, una maravilla',999,'imgPortada-teclado-magico.jpeg',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_type` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'Admin'),(2,'Empresa'),(3,'Individuo');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `user_type_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_type_id` (`user_type_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jon','Snow','jon@snow.com','avatar.jpg','1324',1,NULL,NULL),(2,'Tyrion','Lannister','tyrion@lannister.com','avatar.jpg','12345',1,NULL,NULL),(3,'Daenerys','Targaryen','Khaleesi@got.com','avatar-Khaleesi.jpg','123456',1,NULL,NULL),(5,'Leandro','Higa','lah_797@hotmail.com','avatar-jk.jpg','$2b$10$PBfVFNQ9LfGaSG5ySZJF7Oob0hLsrqtLThDxZiZVUiaM4K0hMa54S',1,NULL,NULL),(6,'Hodor','Hodor-Hodor-Hodor','Hodor@got.com','avatar-hodor.jpg','$2b$10$C81/beI4gN7wY.UDJxiqbOxBCRDxoTzJFWMUFjK/d6r8JWsGjaeQ.',1,NULL,NULL),(7,'Tywin ','Lannister','tywin@lannister.com','avatar-260px-TywinLa.png','$2b$10$xHJ51ouyDL/8VGRjFFXk0.Nex6WnY8UiRTke2ZTlUdZVgwAJ1xIFq',2,NULL,NULL),(8,'Melisandre',' Asshai','Melisandre@got.com','avatar-110816.jpg','$2b$10$gi/dpyY1GDK/gGM17TWqhO.3C3J9w1CDNkdFfUS9.kUwKmYabJ0cK',1,NULL,NULL),(9,'Arya',' Stark','arya@stark.com','Arya.jpeg','$2b$10$11GCDVTjK8NQy.KRqsA7o.wpY58S8sNhiMWBcfzks5v.i64VuQZ2K',1,'2020-06-25 03:07:51',NULL),(10,'Dale','Cooper','dalecooper@fbi.com','Dale.jpg','$2b$10$s9a.TbBE0mun1j/WwzRNAusrCuDT1ARz1zlQp4qqSKYNquumxRzNO',1,'2020-06-25 03:10:30',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-25  9:27:18
