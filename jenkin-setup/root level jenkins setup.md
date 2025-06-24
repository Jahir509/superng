# Jenkins Container Setup Guide

This guide explains how to set up Jenkins in a Docker container for CI/CD.

---

## 1. Create a Docker Compose Service for Jenkins

Add the following to your `docker-compose.yml` (or create a new one):

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

---

## 2. Start Jenkins

From the directory containing your `docker-compose.yml`, run:

```sh
docker-compose up -d jenkins
```

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
