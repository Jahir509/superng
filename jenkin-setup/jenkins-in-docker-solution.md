# Fixing Docker Access from Jenkins Container

This guide explains how to fix permission issues when a Jenkins container needs to access the Docker socket.

## Problem

When running Jenkins in a Docker container and trying to use Docker commands in Jenkins pipelines, you may encounter errors like:

```
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock
```

## Solution: Ensure Jenkins User Has Access to the Docker Socket

### Step 1: Check Socket Permissions on the Host

```bash
ls -l /var/run/docker.sock
```

You should see something like:
```
srw-rw---- 1 root docker 0 Jun 24 18:20 /var/run/docker.sock
```

Make sure the group is `docker` and it has read-write permissions.

### Step 2: Check Docker Group ID on Host

```bash
getent group docker
```

Example output:
```
docker:x:121:
```

Note this Group ID (GID) - in this example, it's `121`.

### Step 3: Verify Jenkins User in Container

```bash
docker exec -it jenkins bash
id jenkins
```

You might see:
```
uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins),103(docker)
```

Notice that the docker GID inside the container (`103`) doesn't match the host's docker GID (`121`).

## Fix: Align the Docker Group ID

### Create a Custom Dockerfile

Create a `Dockerfile` in your Jenkins directory:

```dockerfile
FROM jenkins/jenkins:lts

USER root

# Match host Docker group GID (replace with your actual GID)
ARG DOCKER_GID=121

RUN groupadd -g ${DOCKER_GID} docker \
    && usermod -aG docker jenkins \
    && apt-get update && apt-get install -y docker.io \
    && apt-get clean

USER jenkins
```

### Update docker-compose.yml

```yaml
version: '3'

services:
  jenkins:
    build: .
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped

volumes:
  jenkins_home:
```

### Rebuild and Restart Jenkins

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Test Docker Access in Jenkins

In a Jenkins pipeline job, use:

```groovy
pipeline {
    agent any
    stages {
        stage('Test Docker') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
```

## Troubleshooting

If still having issues:

1. Verify the jenkins user is in the docker group inside the container:
   ```bash
   docker exec -it jenkins bash
   id jenkins
   ```

2. Test docker access directly:
   ```bash
   docker exec -it jenkins bash
   sudo -u jenkins docker ps
   ```

3. Check socket permissions again on host:
   ```bash
   ls -l /var/run/docker.sock
   ```

## Summary

The key is ensuring the docker group ID inside the Jenkins container matches the docker group ID on the host system, giving the jenkins user proper permissions to access the Docker socket.
