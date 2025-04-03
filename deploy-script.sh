#!/bin/bash

# Скрипт для автоматического деплоя фронтенда
# Разместите этот скрипт на сервере

# Перейти в директорию проекта
cd /home/n1x9s/front

# Сохранить текущую ветку
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Обновить репозиторий
git fetch origin rollback-directions

# Если не на нужной ветке, переключиться
if [ "$CURRENT_BRANCH" != "rollback-directions" ]; then
  git checkout rollback-directions
else
  git pull origin rollback-directions
fi

# Установить зависимости
npm ci

# Собрать проект
npm run build

# Логирование успешного деплоя
echo "Deployment completed successfully on $(date)" >> /var/log/deploy.log

# При необходимости перезапустите сервис
# systemctl restart your-service

exit 0 
