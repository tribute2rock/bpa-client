pipeline {
    agent any // You can specify the type of agent here, e.g., 'agent { docker { image "node:latest" } }' to use a Docker container with Node.js installed

    environment {
        CI = 'false'
    }

    stages {
        stage("Build") {
            steps {
                // Install dependencies
                bat 'npm run build'
            }
        }
    }
}
