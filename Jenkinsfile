pipeline {
    agent any
    stages {
        stage('Build Backend Image'){
            steps {
                dir('frontend'){
                    sh 'docker build -t superng-backend .'
                }
            }
        }
        stage('Run Backend Container'){
            steps{
                sh 'docker stop superng-backend || true'
                sh 'docker rm superng-backend || true'
                sh 'docker run -d --name superng-backend -p 8000:8000 superng-backend'
            }
        }

        stage('Test Backend Container'){
            steps {
                sh 'docker ps -a'
            }
        }

        stage('Build Frontend Image'){
            steps {
                dir('frontend'){
                    sh 'docker build -t superng-frontend .'
                }
            }
        }

        stage('Run Frontend Container'){
            steps{
                sh 'docker stop superng-frontend || true'
                sh 'docker rm superng-frontend || true'
                sh 'docker run -d --name superng-frontend -p 4200:4200 superng-frontend'
            }
        }
        stage('Test Frontend Container'){
            steps {
                sh 'docker ps -a'
            }
        }
    }
}