
# Setup Guide

Follow these steps to set up the project on your local machine.

### 1. Clone the Project

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Copy `.env.example` to `.env`

The project uses environment variables for configuration. Copy the example `.env.example` file to `.env`.

```bash
cp .env.example .env
```

### 3. Run Docker and Migration

#### Step 1: Start MongoDB with Docker

```bash
cd quiz-server/docker
docker-compose -f mongodb.yaml up -d
```

#### Step 2: Run Migrations

```bash
npm run migration:init
```

### 4. Start the Application

Start the application by running:

```bash
npm start
```
- Start the Node.js server 