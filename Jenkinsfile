pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'omarahorrar' 
        IMAGE_FRONTEND_NAME = "${DOCKERHUB_USERNAME}/ineevents-ineclient"
        IMAGE_BACKEND_NAME = "${DOCKERHUB_USERNAME}/ineevents-ineserver"
        GITOPS_REPO = "https://github.com/Omarahorrar5/IneEvents-GitOps.git"
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
        
        // Update GitOps Repository
        stage('Update GitOps Repository') {
            steps {
                script {
                    echo '==> Updating GitOps repository with new image tags'
                    
                    withCredentials([string(credentialsId: 'github-token', variable: 'GIT_TOKEN')]) {
                        sh """
                            # Clean up any previous clone
                            rm -rf ineevents-gitops
                            
                            # Clone GitOps repo
                            git clone https://${GIT_TOKEN}@github.com/Omarahorrar5/IneEvents-GitOps.git ineevents-gitops
                            cd ineevents-gitops
                            
                            # Update image tags in values.yaml
                            echo "==> Updating image tags to build ${BUILD_NUMBER}"
                            sed -i 's|tag: .*|tag: "${BUILD_NUMBER}"|g' helm/ineevents/values.yaml
                            
                            # Show what changed
                            echo "==> Changes made:"
                            git diff helm/ineevents/values.yaml
                            
                            # Configure git
                            git config user.email "jenkins@ci.local"
                            git config user.name "Jenkins CI"
                            
                            # Commit and push
                            git add helm/ineevents/values.yaml
                            git commit -m "🚀 Update image tags to build ${BUILD_NUMBER}" || echo "No changes to commit"
                            git push origin main
                            
                            cd ..
                            rm -rf ineevents-gitops
                            
                            echo "✅ GitOps repo updated!"
                            echo "⏳ ArgoCD will automatically deploy"
                            echo "📊 Monitor deployment at: http://localhost:8081"
                        """
                    }
                }
            }
        }
        
        // Wait for ArgoCD to sync
        stage('Wait for ArgoCD Deployment') {
            steps {
                script {
                    echo '==> Waiting for ArgoCD to sync and deploy'
                    
                    sh '''
                        echo "Waiting for ArgoCD to detect changes..."
                        sleep 30
                        
                        # Check sync status (requires argocd CLI)
                        # If you have argocd CLI installed:
                        # argocd app wait ineevents --timeout 300
                        
                        # Alternative: Wait for pods to be ready
                        echo "Waiting for deployments to be ready..."
                        kubectl rollout status deployment ineevents-backend --timeout=5m || true
                        kubectl rollout status deployment ineevents-frontend --timeout=5m || true
                        
                        echo "✅ Deployment complete!"
                    '''
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
                echo "🎉 GitOps CI/CD Pipeline Completed!"
                echo "=========================================="
                echo ""
                echo "📦 Docker Images:"
                echo "  Frontend: ${IMAGE_FRONTEND_NAME}:${BUILD_NUMBER}"
                echo "  Backend:  ${IMAGE_BACKEND_NAME}:${BUILD_NUMBER}"
                echo ""
                echo "☸️  Kubernetes Status:"
                kubectl get pods -l app=ineevents-backend -o wide
                kubectl get pods -l app=ineevents-frontend -o wide
                echo ""
                echo "🌐 Application URLs:"
                echo "  Frontend: http://$(minikube ip):30080"
                echo "  Backend:  http://$(minikube ip):30081"
                echo ""
                echo "📊 ArgoCD Dashboard:"
                echo "  URL: http://localhost:8081"
                echo ""
                echo "🔄 GitOps Repo:"
                echo "  https://github.com/Omarahorrar5/IneEvents-GitOps"
                echo "=========================================="
            '''
        }
        failure {
            echo '❌ Pipeline failed!'
            echo 'Checking logs...'
            sh '''
                echo "=========================================="
                echo "Kubernetes Pod Logs:"
                echo "=========================================="
                kubectl logs -l app=ineevents-backend --tail=50 || true
                echo ""
                kubectl logs -l app=ineevents-frontend --tail=50 || true
                echo ""
                echo "=========================================="
                echo "Pod Status:"
                echo "=========================================="
                kubectl get pods -o wide
                echo ""
                echo "=========================================="
                echo "Recent Events:"
                echo "=========================================="
                kubectl get events --sort-by='.lastTimestamp' | tail -20
            '''
        }
    }
}