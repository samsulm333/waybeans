-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Jan 2022 pada 17.04
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waybeans`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `stock`, `price`, `description`, `photo`, `createdAt`, `updatedAt`) VALUES
(15, 'RWANDA beans', 368, 700000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1640656044501-rwanda4.png', '2021-12-28 01:47:24', '2022-01-07 02:20:49'),
(22, 'COLOMBIA beans', 89, 100000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1640734851848-Colombia.png', '2021-12-28 23:40:51', '2022-01-07 03:35:37'),
(23, 'ETHIOPIA beans', 96, 120000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1640734916798-ethiopia.png', '2021-12-28 23:41:56', '2021-12-29 08:28:38'),
(26, 'GUETEMALA beans', 10, 50000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1640759479632-guatemala.png', '2021-12-29 06:31:19', '2022-01-07 02:20:49'),
(27, 'Costa Rica Beans', 10, 50000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1640761235441-CostaRicaSingle-Origin_12oz.jpg', '2021-12-29 07:00:35', '2021-12-29 07:00:35'),
(28, 'SUMATRA beans', 20, 100000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1641519451138-africanillustrationdesigninspiration.jpg', '2022-01-07 01:37:31', '2022-01-07 03:35:37'),
(29, 'Costa Rica 500gr', 10, 100000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1641522252423-CostaRicaSingle-Origin_12oz.jpg', '2022-01-07 02:24:12', '2022-01-07 02:24:12'),
(30, 'Costa Rica 250gr', 10, 50000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p', '1641526702570-CostaRicaSingle-Origin_12oz.jpg', '2022-01-07 03:38:22', '2022-01-07 03:38:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20211223032429-create-user.js'),
('20211223033625-create-product.js'),
('20211223034704-create-transaction.js'),
('20211223035616-create-transaction-detail.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `post_code` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `buyyer_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Waiting Approve',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `name`, `email`, `phone`, `post_code`, `address`, `attachment`, `subtotal`, `buyyer_id`, `status`, `createdAt`, `updatedAt`) VALUES
(68, 'SAMSUL MA\'ARIF', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1640746469605-Bukti-Transfer-BRI-Mobile.jpg', 2200000, 2, 'Canceled', '2021-12-29 02:54:29', '2021-12-29 03:41:08'),
(69, 'SAMSUL MA\'ARIF', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1640749248258-Bukti-Transfer-BRI-Mobile.jpg', 800000, 7, 'On the way', '2021-12-29 03:40:48', '2021-12-29 03:41:10'),
(70, 'SAMSUL MA\'ARIF', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1640759561989-Bukti-Transfer-BRI-Mobile.jpg', 500000, 2, 'Success', '2021-12-29 06:32:41', '2021-12-29 06:33:16'),
(71, 'SAMSUL MA\'ARIF', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1640761118177-Bukti-Transfer-BRI-Mobile.jpg', 1640000, 10, 'Success', '2021-12-29 06:58:38', '2021-12-29 06:59:31'),
(72, 'SAMSUL MA\'ARIF', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1640766517690-Bukti-Transfer-BRI-Mobile.jpg', 1840000, 10, 'On the way', '2021-12-29 08:28:37', '2022-01-09 15:13:52'),
(74, 'Rifandi Yusuf', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1641522049063-Bukti-Transfer-BRI-Mobile.jpg', 1000000, 13, 'Success', '2022-01-07 02:20:49', '2022-01-07 02:22:21'),
(75, 'SAMSUL MA\'ARIF', 'samsul.m333@gmail.com', '089657465013', 40221, 'KP. PASIRKOJA RT.03 RW.03 NO.RUMAH : 39, KEL. SUKAHAJI, KEC. BABAKAN CIPARAY, KOTA. BANDUNG', '1641526537086-Bukti-Transfer-BRI-Mobile.jpg', 400000, 14, 'Success', '2022-01-07 03:35:37', '2022-01-07 03:36:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction_details`
--

CREATE TABLE `transaction_details` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transaction_details`
--

INSERT INTO `transaction_details` (`id`, `transaction_id`, `product_id`, `qty`, `createdAt`, `updatedAt`) VALUES
(131, 68, 15, 3, '2021-12-29 02:54:29', '2021-12-29 02:54:29'),
(132, 68, 22, 1, '2021-12-29 02:54:29', '2021-12-29 02:54:29'),
(133, 69, 15, 1, '2021-12-29 03:40:48', '2021-12-29 03:40:48'),
(134, 69, 22, 1, '2021-12-29 03:40:48', '2021-12-29 03:40:48'),
(135, 70, 22, 4, '2021-12-29 06:32:42', '2021-12-29 06:32:42'),
(136, 70, 26, 2, '2021-12-29 06:32:42', '2021-12-29 06:32:42'),
(137, 71, 15, 2, '2021-12-29 06:58:38', '2021-12-29 06:58:38'),
(138, 71, 23, 2, '2021-12-29 06:58:38', '2021-12-29 06:58:38'),
(139, 72, 26, 2, '2021-12-29 08:28:38', '2021-12-29 08:28:38'),
(140, 72, 22, 1, '2021-12-29 08:28:38', '2021-12-29 08:28:38'),
(141, 72, 23, 2, '2021-12-29 08:28:38', '2021-12-29 08:28:38'),
(142, 72, 15, 2, '2021-12-29 08:28:38', '2021-12-29 08:28:38'),
(144, 74, 15, 1, '2022-01-07 02:20:49', '2022-01-07 02:20:49'),
(145, 74, 26, 6, '2022-01-07 02:20:49', '2022-01-07 02:20:49'),
(146, 75, 28, 3, '2022-01-07 03:35:37', '2022-01-07 03:35:37'),
(147, 75, 22, 1, '2022-01-07 03:35:37', '2022-01-07 03:35:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'customer',
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fullName`, `role`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@mail.com', '$2b$10$FTkKTea0PbEnrKqRhIrRIeB8Jx4yAS3iP8ygXYWmgicdkfm3OKCeO', 'admin', 'admin', 'male-avatar.png', '2021-12-23 09:58:49', '2021-12-23 09:58:49'),
(2, 'test2@mail.com', '$2b$10$lGVCTYFa3CIPtOfYJlfFVO15zAt96QTjA4mlBVRjT8iq4wllPuwyG', 'Test Update 2', 'customer', '1640673331006-Rectangle12.png', '2021-12-23 10:00:28', '2021-12-28 06:35:31'),
(3, 'testtest@gmail.com', '$2b$10$YYQT8ry1Zh.vuIBTWbYyoeW6LHPMX/qwoOQFE9J1kz.TtfwqHx2vW', 'test', 'customer', 'male-avatar.png', '2021-12-23 14:57:34', '2021-12-23 14:57:34'),
(4, 'admin@gmail.com', '$2b$10$emj8Mr5pidnZOIR97Zo1o.woOA0Fpc7oXMYo591bAqK9QkHlfIFpu', 'admin', 'admin', 'male-avatar.png', '2021-12-23 15:21:47', '2021-12-23 15:21:47'),
(5, 'user2@mail.com', '$2b$10$Ewtb4o9IFOT.Pt/Eaiq2t.ryDWTF2EFB5FcWuYOwXkKReXXpqMSBG', 'user 2', 'customer', 'male-avatar.png', '2021-12-28 06:41:03', '2021-12-28 06:41:03'),
(6, 'user3@gmail.com', '$2b$10$BHB/orWi5GJBfpUWqbWASe1PQlkHNOsUMc8E34NXBlcXhXmI3dq9K', 'user3', 'customer', 'male-avatar.png', '2021-12-28 07:38:09', '2021-12-28 07:38:09'),
(7, 'userdemo@mail.com', '$2b$10$UwG1IAeWcJ5.N53lUJ24RO3Lm3VFWjIK5oW24KvhWtHAvfpeea.ye', 'user demo', 'customer', '1640678972024-ethiopia.png', '2021-12-28 08:08:37', '2021-12-28 08:09:32'),
(8, 'user33@mail.com', '$2b$10$FtApn4ePmWoduYFPpnPEC.PfKx2aJnma6lbY5ofUPC.QKPkE5S/B6', 'user3', 'customer', '1640713801515-PROFILE3.png', '2021-12-28 17:22:12', '2021-12-28 17:50:01'),
(9, 'usertest@mail.com', '$2b$10$EFL2KhOqMEJ.cym3WwkXNO3GTkDWaTEtysXlJODhnESrMOJ.GVOoO', 'test test', 'customer', 'male-avatar.png', '2021-12-29 00:55:50', '2021-12-29 00:55:50'),
(10, 'userdemofinal@mail.com', '$2b$10$/eMIrrWDFkuVmjwApyeZVededBHvylzSAUJiwUayj41wbgbNlfocu', 'demo final', 'customer', '1640761079664-CostaRicaSingle-Origin_12oz.jpg', '2021-12-29 06:57:26', '2021-12-29 06:57:59'),
(11, 'test33@mail.com', '$2b$10$S1KWfH8O/p6VJVFkny/idOS1xFBDmgap54ZFTTz/BzNiWkhYnxz6.', 'test 33', 'customer', 'male-avatar.png', '2022-01-09 16:29:11', '2022-01-09 16:29:11'),
(13, 'demoprakerja@mail.com', '$2b$10$UVRZqju8bsiZ8x4WQm3KFerqLOTchxSdUvb7T6OsGleu5abp1TMD.', 'demo update', 'customer', '1641521955243-images.jpg', '2022-01-07 02:18:04', '2022-01-07 02:19:15'),
(14, 'userdemo2@mail.com', '$2b$10$3ubl61fEROBmQlbJk.Cpj.Um32IiiyRh64MyYvQBw2YbFv5L7f5vi', 'user demo 2 update', 'customer', '1641526453504-images.jpg', '2022-01-07 03:33:10', '2022-01-07 03:34:13');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buyyer_id` (`buyyer_id`);

--
-- Indeks untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`buyyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
