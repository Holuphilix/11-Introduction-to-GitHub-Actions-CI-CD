# Node.js CI/CD with GitHub Actions and AWS EC2

## 📌 Project Overview
This project demonstrates a **CI/CD pipeline** for deploying a **Node.js** application to an **AWS EC2 instance** using **GitHub Actions** and **PM2** for process management. The pipeline runs tests and deploys the application upon successful changes.

## 🚀 Features
- Express.js backend
- Automated testing (unit & integration tests)
- Continuous Deployment (CD) with GitHub Actions
- Hosted on AWS EC2
- Automated SSH-based deployment to AWS EC2
- Node.js application management with PM2
- Secure authentication using GitHub Secrets

## 📁 Project Structure
```plaintext
/home/ec2-user/app
│── index.js        // Entry point of the application
│── app.js          // Express application logic
│── app.test.js     // Jest tests for API endpoints
│── package.json    // Node.js dependencies
│── .github/workflows/deploy.yml  // GitHub Actions workflow
│── README.md       // Project documentation
```

## 🛠️ Setup & Installation

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **Git**
- **PM2** (for process management)
- An **AWS EC2** instance with Ubuntu

### 2️⃣ Clone the Repository
```bash
cd ~
git clone https://github.com/Holuphilix/Github-Actions-Node.git app
cd app
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Start the Application (Locally)
```bash
node index.js
```

Or using PM2:
```bash
pm install -g pm2
pm2 start index.js --name app
pm2 save
pm2 status
```

## 🏗️ GitHub Actions CI/CD Workflow

### ✅ **How It Works**
1. **Push to GitHub** → Triggers **GitHub Actions**
2. **GitHub Actions** → SSH into EC2 and pulls the latest code
3. **Dependencies Installed** → Runs `npm install`
4. **PM2 Restart** → Restarts the app using PM2

### 🔑 **GitHub Secrets Required**
Set up these secrets in your **GitHub Repository**:
| Secret Name            | Description                         |
|------------------------|-------------------------------------|
| `EC2_SSH_PRIVATE_KEY`  | Private key for SSH access         |
| `EC2_HOST`             | AWS EC2 instance public IP address |

### 📝 **Deployment Workflow YAML** (`.github/workflows/Deploy.yml`)
```yaml
name: Deploy to EC2
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup SSH Key
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.EC2_SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.EC2_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no ubuntu@${{ secrets.EC2_HOST }} << 'EOF'
          cd /home/ubuntu/app
          git pull origin main
          npm install
          pm2 restart app || pm2 start index.js --name app
          pm2 save
          pm2 status
          EOF
```

## 📡 **Deploying Manually**
If you need to deploy manually, SSH into your EC2 instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
cd /home/ubuntu/app
git pull origin main
npm install
pm2 restart app || pm2 start index.js --name app
pm2 save
pm2 status
```

## 🧪 Running Tests
To run unit tests:
```bash
npm test
```

To run integration tests:
```bash
npm run test:integration
```

## 🔗 API Endpoints
| Method | Endpoint   | Description  |
|--------|-----------|--------------|
| GET    | `/`       | Home route   |
| GET    | `/testNode` | Test endpoint |


## 📌 Troubleshooting

### **🔴 Permission Denied (SSH)**
- Ensure your SSH key is correctly added to GitHub Secrets.
- Run the following on your local machine:
  ```bash
  ssh -i your-key.pem ubuntu@your-ec2-ip
  ```
- Check **file permissions**:
  ```bash
  chmod 600 your-key.pem
  ```

### **🔴 PM2 Process Not Found**
- Verify your application entry file:
  ```bash
  ls -lah /home/ubuntu/app
  ```
- Start the correct file manually:
  ```bash
  pm2 start index.js --name app
  ```

## 📜 License
This project is licensed under the **MIT License**.

## 🙌 Contributors
- **Holuphilix** ([@Holuphilix](https://github.com/Holuphilix))

🚀 **Happy Coding!**

