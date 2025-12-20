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

        stage('SonarQube Analysis') {
            steps {
                script {
                    echo '==> Running SonarQube Analysis'
                    
                    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                        
                        // Analyze Backend
                        echo '==> Analyzing Backend Code'
                        dir('IneServer') {
                            sh """
                                docker run --rm \
                                  --network host \
                                  -v "\$(pwd):/usr/src" \
                                  sonarsource/sonar-scanner-cli \
                                  -Dsonar.host.url=http://localhost:9000 \
                                  -Dsonar.login=\${SONAR_TOKEN}
                            """
                        }
                        
                        // Analyze Frontend
                        echo '==> Analyzing Frontend Code'
                        dir('IneClient') {
                            sh """
                                docker run --rm \
                                  --network host \
                                  -v "\$(pwd):/usr/src" \
                                  sonarsource/sonar-scanner-cli \
                                  -Dsonar.host.url=http://localhost:9000 \
                                  -Dsonar.login=\${SONAR_TOKEN}
                            """
                        }
                    }
                    
                    echo '✅ SonarQube analysis completed'
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
                    
                    sh '''
                        cat > .trivyignore << 'EOF'
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
                    
                    echo '✅ Security scans completed'
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
        
        // Kubernetes Deployment Stage
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo '==> Deploying to Kubernetes'
                    
                    // Ensure ConfigMap and Secret exist
                    echo '==> Checking Kubernetes secrets and configmaps'
                    withCredentials([
                        string(credentialsId: 'supabase-url', variable: 'SUPABASE_URL'),
                        string(credentialsId: 'supabase-key', variable: 'SUPABASE_KEY')
                    ]) {
                        sh '''
                            # Check if ConfigMap exists, create if not
                            if ! kubectl get configmap ineevents-config &>/dev/null; then
                                echo "Creating ConfigMap from Jenkins credentials..."
                                kubectl create configmap ineevents-config \
                                  --from-literal=supabase-url="${SUPABASE_URL}"
                            else
                                echo "ConfigMap already exists"
                            fi
                            
                            # Check if Secret exists, create if not
                            if ! kubectl get secret ineevents-secrets &>/dev/null; then
                                echo "Creating Secret from Jenkins credentials..."
                                kubectl create secret generic ineevents-secrets \
                                  --from-literal=supabase-key="${SUPABASE_KEY}"
                            else
                                echo "Secret already exists"
                            fi
                        '''
                    }
                    
                    // Apply Kubernetes manifests
                    echo '==> Applying Kubernetes manifests'
                    sh '''
                        kubectl apply -f k8s/backend-deployment.yaml
                        kubectl apply -f k8s/backend-service.yaml
                        kubectl apply -f k8s/frontend-deployment.yaml
                        kubectl apply -f k8s/frontend-service.yaml
                    '''
                    
                    // Trigger rolling update to pull latest images
                    echo '==> Triggering rolling update'
                    sh '''
                        kubectl rollout restart deployment ineevents-backend
                        kubectl rollout restart deployment ineevents-frontend
                    '''
                    
                    // Wait for rollout to complete
                    echo '==> Waiting for deployments to be ready'
                    sh '''
                        kubectl rollout status deployment ineevents-backend --timeout=5m
                        kubectl rollout status deployment ineevents-frontend --timeout=5m
                    '''
                    
                    // Display deployment status
                    echo '==> Kubernetes Deployment Status'
                    sh '''
                        echo "=========================================="
                        echo "Pods:"
                        kubectl get pods -l app=ineevents-backend
                        kubectl get pods -l app=ineevents-frontend
                        echo ""
                        echo "Services:"
                        kubectl get services | grep ineevents
                        echo ""
                        echo "Application URLs:"
                        echo "Frontend: http://$(minikube ip):30080"
                        echo "=========================================="
                    '''
                    
                    echo '✅ Kubernetes deployment completed successfully'
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
            sh '''
                echo "=========================================="
                echo "Deployment Summary:"
                echo ""
                echo "Kubernetes Pods:"
                kubectl get pods | grep ineevents || echo "No K8s pods found"
                echo ""
                echo "Docker Containers:"
                docker ps | grep ineevents || echo "No Docker containers found"
                echo "=========================================="
            '''
        }
        failure {
            echo '❌ Pipeline failed!'
            echo 'Checking logs...'
            sh '''
                echo "Kubernetes Pod Logs:"
                kubectl logs -l app=ineevents-backend --tail=50 || true
                kubectl logs -l app=ineevents-frontend --tail=50 || true
                echo ""
                echo "Docker Container Logs:"
                docker logs ineevents_server --tail=50 || true
                docker logs ineevents_client --tail=50 || true
            '''
        }
    }
}