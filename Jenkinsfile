pipeline {
    agent any // You can specify the type of agent here, e.g., 'agent { docker { image "node:latest" } }' to use a Docker container with Node.js installed

    environment {
        CI = 'true'
    }

    stages {
        stage("Build") {
            steps {
                // Install dependencies
                bat 'npm i --legacy-peer-deps'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run test script
                sh './jenkins/scripts/test.sh'
            }
        }

        stage("Deliver") {
            steps {
                // Run delivery script
                sh './jenkins/scripts/deliver.sh'
                
                // Wait for user input
                input message: 'Finished using the project? (Click "Proceed" to continue)'

                // Run kill script
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
