-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Апр 18 2018 г., 16:30
-- Версия сервера: 5.7.21
-- Версия PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `db_home1`
--

-- --------------------------------------------------------

--
-- Структура таблицы `links`
--

CREATE TABLE `links` (
  `id` mediumint(8) NOT NULL,
  `name` varchar(25) NOT NULL,
  `link` varchar(256) NOT NULL,
  `order_id` mediumint(16) UNSIGNED NOT NULL,
  `type` smallint(8) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `list_providers`
--

CREATE TABLE `list_providers` (
  `id` mediumint(16) UNSIGNED NOT NULL,
  `provider_info` json NOT NULL,
  `name_list` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(32) UNSIGNED NOT NULL,
  `order` json NOT NULL,
  `name_order` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `providers`
--

CREATE TABLE `providers` (
  `id` mediumint(16) NOT NULL,
  `name` varchar(32) NOT NULL,
  `requisites` varchar(256) NOT NULL,
  `FIO` varchar(128) NOT NULL,
  `email` varchar(40) NOT NULL,
  `provider` varchar(128) NOT NULL,
  `brand` varchar(128) NOT NULL,
  `other` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` smallint(8) UNSIGNED NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(40) NOT NULL,
  `type` smallint(4) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `email`, `type`, `name`) VALUES
(1, 'kirillB', 'b5e3b4c9f25432019dc7100ddaee018e', 'shafr@gmail.com', 1, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` smallint(8) UNSIGNED NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`) VALUES
(1, 'hytt', 'd8578edf8458ce06fbc5bb76a58c5ca4'),
(2, 'hytt', 'd8578edf8458ce06fbc5bb76a58c5ca4'),
(3, '231', 'a384b6463fc216a5f8ecb6670f86456a'),
(4, 'kirill_shafranskiy', 'bd462d5d7e7d5f8416515c6b0f3ed640'),
(5, 'kirill_shafranskiy', 'bd462d5d7e7d5f8416515c6b0f3ed640'),
(6, 'kirill_shafranskiy', 'bd462d5d7e7d5f8416515c6b0f3ed640'),
(7, '23132', '4b52c4432016b039d50db27fe4c727b2'),
(8, 'kirillB', 'b5e3b4c9f25432019dc7100ddaee018e'),
(11, 'qwerty', 'd8578edf8458ce06fbc5bb76a58c5ca4');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_providers`
--
ALTER TABLE `list_providers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Unique_name_list` (`name_list`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Unique_name` (`name_order`);

--
-- Индексы таблицы `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `links`
--
ALTER TABLE `links`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `list_providers`
--
ALTER TABLE `list_providers`
  MODIFY `id` mediumint(16) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(32) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `providers`
--
ALTER TABLE `providers`
  MODIFY `id` mediumint(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` smallint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
