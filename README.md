# Test task for brickdev

## 1. Ansible playbook
Два варианта запуска playbook:

- Сетевой запуск

Перед запуском задать в файле inventory ip-адрес целевого узла (ansible_host) и пароль пользователя узла (ansible_ssh_pass).

```
ansible-playbook -i ./inventory ./play.yml --ask-become-pass  
```

- Локальный запуск (нужен установленный Ansible на хосте, где запускается playbook)

Перед запуском расскоментировать строку connection: local в play.yml.

```
ansible-playbook -i "localhost," ./play.yml --ask-become-pass  
```

Ansible playbook выполняет на хосте следующие действия:

- создает нового пользователя brickdev с паролем pass 
- разрешает на хосте авторизацию через ssh по ключу
- запрещает логин по ssh от пользователя root 
- копирует предоставленный публичный ключ для пользователя brickdev

## 2. Web приложение на NodeJS
### Приложение
Требуется написать простое веб-приложение на NodeJS, которое слушает входящие соединения на порту 8000 и предоставляет HTTP API, в котором реализовано 3 метода:

GET /hostname - при запросе на этот метод приложение отдает имя хоста, на котором запущено приложение

GET /author - возвращает значение переменной окружения $AUTHOR, в которой задано имя или никнейм человека, выполняющего это задание

GET /id - возвращает значение переменной окружения $UUID, содержащее любую произвольную строку-идентификатор в формате uuid

Запуск приложения (локально через NodeJS):

```
node ./app.js
```

Команды для получения hostname, auuthor, id:

```
curl http://localhost:8000/hostname
curl http://localhost:8000/author
curl http://localhost:8000/id
```

### Dockerfile

Упаковка приложения в Docker

```
docker build -t brick-app .
```

Запуск контейнера Docker

```
docker run -d --name brick -p 8000:8000 brick-app
```

### Docker compose

Запуск трех реплик через compose

```
docker compose up --build -d --scale brick-app=3
```

После запуска реплик указанные выше команды можно запускать на портах 8000-8002.

Запрос

```
curl http://localhost:800X/id
```
будет возвращать номер реплики.



