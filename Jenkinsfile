pipeline {
    agent any

    environment {
        IMAGE_NAME = "demo_node_app"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Docker') {
            steps {
                sh 'docker version'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Dockerfile is inside docker-testapp-main/
                sh "docker build -t ${IMAGE_NAME}:latest ./docker-testapp-main"
            }
        }

        stage('Deploy with Docker Compose') {
            when {
                branch 'master'
            }
            steps {
                // compose.yml is inside docker-testapp-main/
                sh '''
                  docker compose -f ./docker-testapp-main/compose.yml down || true
                  docker compose -f ./docker-testapp-main/compose.yml up -d --build
                '''
            }
        }

        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }
}