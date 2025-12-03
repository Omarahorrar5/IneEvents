pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'omarahorrar' 
        IMAGE_FRONTEND_NAME = "${DOCKERHUB_USERNAME}/ineevents-ineclient"
        IMAGE_BACKEND_NAME = "${DOCKERHUB_USERNAME}/ineevents-ineserver"
    }

    tools {
        nodejs 'node-18' 
    }

    stages {
        
        stage('Checkout') {
            steps {
                echo '==> Checking out code from GitHub'
                checkout scm  
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                script {
                    echo '==> Installing frontend dependencies'
                    dir('IneClient') { 
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Frontend Application') {
            steps {
                script {
                    echo '==> Building frontend application'
                    dir('IneClient') {
                        sh 'npm run build' 
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    echo '==> Building frontend Docker image'
                    dir('IneClient') {
                        docker.build("${IMAGE_FRONTEND_NAME}", "--pull -t ${IMAGE_FRONTEND_NAME}:${BUILD_NUMBER} -t ${IMAGE_FRONTEND_NAME}:latest .")
                    }
                }
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                script {
                    echo '==> Installing backend dependencies'
                    dir('IneServer') { 
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    echo '==> Building backend Docker image'
                    dir('IneServer') { 
                        docker.build("${IMAGE_BACKEND_NAME}", "--pull -t ${IMAGE_BACKEND_NAME}:${BUILD_NUMBER} -t ${IMAGE_BACKEND_NAME}:latest .")
                    }
                }
            }
        }
        
        stage('Push Docker Images to DockerHub') {
            steps {
                script {
                    echo '==> Logging into DockerHub and pushing images'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        '''
                        
                        echo "==> Pushing Frontend images"
                        sh "docker push ${IMAGE_FRONTEND_NAME}:latest"
                        sh "docker push ${IMAGE_FRONTEND_NAME}:${BUILD_NUMBER}"
                        
                        echo "==> Pushing Backend images"
                        sh "docker push ${IMAGE_BACKEND_NAME}:latest"
                        sh "docker push ${IMAGE_BACKEND_NAME}:${BUILD_NUMBER}"
                    }
                }
            }
        }
        
        stage('Deploy Application') {
            steps {
                script {
                    echo '==> Deploying application locally'
                    
                    // Create network if it doesn't exist, not mandatory in this case
                    // There no container-to-container communication here
                    // The browser calls the front and back + port forwarding
                    sh 'docker network create ine_network || true'
                    
                    // Deploy Backend
                    echo '==> Deploying Backend'
                    sh "docker pull ${IMAGE_BACKEND_NAME}:latest"
                    sh 'docker stop ineevents_server || true'
                    sh 'docker rm ineevents_server || true'
                    
                    sh """
                        docker run -d \\
                          --name ineevents_server \\
                          --network ine_network \\
                          -p 5000:5000 \\
                          --env-file ./IneServer/.env \\
                          --restart=always \\
                          ${IMAGE_BACKEND_NAME}:latest
                    """
                    
                    // Deploy Frontend
                    echo '==> Deploying Frontend'
                    sh "docker pull ${IMAGE_FRONTEND_NAME}:latest"
                    sh 'docker stop ineevents_client || true'
                    sh 'docker rm ineevents_client || true'
                    
                    sh """
                        docker run -d \\
                          --name ineevents_client \\
                          --network ine_network \\
                          -p 5173:80 \\
                          --restart=always \\
                          ${IMAGE_FRONTEND_NAME}:latest
                    """
                    
                    echo '==> Deployment completed'
                    echo 'Frontend available at: http://localhost:5173'
                    echo 'Backend available at: http://localhost:5000'
                }
            }
        }
    }
    
    post {
        always {
            echo '==> Cleaning up workspace'
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully!'
            echo 'Services are running:'
            sh 'docker ps | grep ineevents'
        }
        failure {
            echo '❌ Pipeline failed!'
            echo 'Checking container logs...'
            sh 'docker logs ineevents_server || true'
            sh 'docker logs ineevents_client || true'
        }
    }
}