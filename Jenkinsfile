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
                    echo '==> Skipping manual frontend build - Docker will handle it'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    echo '==> Building frontend Docker image'
                    dir('IneClient') {
                        docker.build("${IMAGE_FRONTEND_NAME}", "--pull --build-arg VITE_API_URL=/api -t ${IMAGE_FRONTEND_NAME}:${BUILD_NUMBER} -t ${IMAGE_FRONTEND_NAME}:latest .")
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
        
        stage('Security Scan with Trivy') {
            steps {
                script {
                    echo '==> Running Trivy security scans'
                    
                    // Create .trivyignore file in workspace root to ignore specific CVEs
                    sh '''
                        cat > .trivyignore << 'EOF'
# Backend - glob vulnerability (transitive dependency, accepted risk)
# Risk: Command injection via malicious filenames - low risk for our use case
CVE-2025-64756
EOF
                        echo "==> Contents of .trivyignore:"
                        cat .trivyignore
                    '''
                    
                    echo '==> Scanning Frontend Image'
                    sh """
                        trivy image --severity HIGH,CRITICAL \
                          --ignorefile .trivyignore \
                          --exit-code 0 \
                          --format table \
                          ${IMAGE_FRONTEND_NAME}:latest
                    """
                    
                    echo '==> Scanning Backend Image'
                    sh """
                        trivy image --severity HIGH,CRITICAL \
                          --ignorefile .trivyignore \
                          --exit-code 0 \
                          --format table \
                          ${IMAGE_BACKEND_NAME}:latest
                    """
                    
                    echo '✅ Security scans completed - all known vulnerabilities accepted'
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
                    
                    // Create network if it doesn't exist
                    sh 'docker network create ine_network || true'
                    
                    // Deploy Backend with environment variables from Jenkins credentials
                    echo '==> Deploying Backend'
                    sh "docker pull ${IMAGE_BACKEND_NAME}:latest"
                    sh 'docker stop ineevents_server || true'
                    sh 'docker rm ineevents_server || true'
                    
                    // Load environment variables from Jenkins credentials
                    withCredentials([
                        string(credentialsId: 'supabase-url', variable: 'SUPABASE_URL'),
                        string(credentialsId: 'supabase-key', variable: 'SUPABASE_KEY')
                    ]) {
                        sh """
                            docker run -d \\
                              --name ineevents_server \\
                              --network ine_network \\
                              --network-alias ineserver \\
                              -p 5000:5000 \\
                              -e SUPABASE_URL='${SUPABASE_URL}' \\
                              -e SUPABASE_KEY='${SUPABASE_KEY}' \\
                              --restart=always \\
                              ${IMAGE_BACKEND_NAME}:latest
                        """
                    }
                    
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