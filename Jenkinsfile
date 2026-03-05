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

        stage('Build Docker image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Test Docker'){
            steps {
                sh 'docker version'
            }
        }

        stage('Deploy with Docker Compose') {
            when {
                branch 'master'   // or 'main' if your default branch is main
            }
            steps {
                sh '''
                  docker compose down || true
                  docker compose up -d --build
                '''
            }
        }
    }
}