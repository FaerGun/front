#!/bin/bash

# Скрипт для установки Node.js на сервере
# Выполните этот скрипт на сервере для установки Node.js и npm

# Определяем тип ОС
if [ -f /etc/debian_version ]; then
    # Debian/Ubuntu
    echo "Установка Node.js для Debian/Ubuntu..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
elif [ -f /etc/redhat-release ]; then
    # CentOS/RHEL
    echo "Установка Node.js для CentOS/RHEL..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
else
    # Другие системы - устанавливаем через NVM
    echo "Установка NVM и Node.js..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 18
    nvm use 18
    nvm alias default 18
fi

# Проверка установки
echo "Проверка установки Node.js и npm:"
node -v
npm -v

# Настройка конфигурации для избежания проблем с правами
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'

# Добавление пути в .bashrc или .zshrc
if [ -f ~/.bashrc ]; then
    echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
    source ~/.bashrc
fi

if [ -f ~/.zshrc ]; then
    echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
    source ~/.zshrc
fi

echo "Установка завершена! Node.js и npm готовы к использованию." 