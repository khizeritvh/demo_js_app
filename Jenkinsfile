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
                sh "docker build -t ${IMAGE_NAME}:latest ./docker-testapp-main"
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                  docker compose -f ./docker-testapp-main/compose.yml down || true
                  docker compose -f ./docker-testapp-main/compose.yml up -d --build
                '''
            }
        }
    }

    post {
        always {
            cleanWs()  // ← safe cleanup after pipeline finishes
        }
    }
}