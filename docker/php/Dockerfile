#FROM php:8.4-fpm
FROM docker.arvancloud.ir/library/php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    pkg-config \
    libssl-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libxslt1-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libmagickwand-dev

RUN docker-php-ext-install \
    bcmath \
    mysqli \
    pdo_mysql \
    soap \
    intl \
    xsl \
    zip

RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg

RUN docker-php-ext-install gd

# MongoDB PHP Extension
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

RUN pecl install imagick \
    && docker-php-ext-enable imagick

#COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY --from=docker.arvancloud.ir/library/composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY docker/php/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]