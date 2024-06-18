pipeline {
    //agent any // You can specify the type of agent here, e.g., 'agent { docker { image "node:latest" } }' to use a Docker container with Node.js installed
    agent {
        label 'Windows_Node'
    }
    environment {
        CI = 'false'
    }

    stages {
        stage("Build") {
            steps {
                // Install dependencies
                sh 'npm i --legacy-peer-deps'
                sh 'npm run build'
                sh 'xcopy /s /e /y \\var\\lib\\jenkins\\workspace\\bpa-client-new\\build \\var\\lib\\jenkins\\workspace\\bpa-api-new\\public'
            }
        }
    }
}
