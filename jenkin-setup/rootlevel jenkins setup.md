````markdown
# Jenkins Container Setup Guide

This guide explains how to set up Jenkins in a Docker container for CI/CD, both **with Docker Compose** and **with plain Docker commands**.

---

## 1. Jenkins Setup **with Docker Compose** (Recommended)

### a. Create a Docker Compose file

Create a directory for Jenkins (optional):

```sh
mkdir -p /srv/jenkins
cd /srv/jenkins
```

Create a `docker-compose.yml` with:

```yaml
version: '3.9'

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
    restart: unless-stopped

volumes:
  jenkins_home:
```

### b. Start Jenkins

```sh
docker-compose up -d jenkins
```

---

## 2. Jenkins Setup **without Docker Compose** (Plain Docker)

You can run Jenkins directly with a single Docker command:

```sh
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

- This will create a named volume `jenkins_home` for persistent Jenkins data.

---

## 3. Access Jenkins

- Open your browser and go to: [http://localhost:8080](http://localhost:8080)
- For remote servers, use: `http://your-server-ip:8080`

---

## 4. Unlock Jenkins

Get the initial admin password with:

```sh
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy and paste this password into the Jenkins setup page.

---

## 5. Complete Jenkins Setup

- Install suggested plugins.
- Create your admin user.
- Jenkins is now ready for use!

---

**Tip:**  
You only need one Jenkins container per server. Use it to manage pipelines for all your projects.
````