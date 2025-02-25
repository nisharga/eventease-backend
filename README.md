# EventEase Backend

Welcome to the EventEase Frontend repository! This project is designed to provide a seamless and engaging user interface for managing events with ease.

---

## Getting Started

.env

```bash
DATABASE_URL="postgresql://neondb_owner:3YjUd2iGybPO@ep-weathered-base-a5qm47qt.us-east-2.aws.neon.tech/neondb?sslmode=require"
PORT  = 5000

ACCESS_TOKEN_EXP_DATE  = 30d
SECRET_ACCESS_TOKEN = db3ac8c30ebbd0fafad37f0a4769bd0e02e994914af01c811fb6965f7b002a30
REFRESH_TOKEN = 826c42c248aadc3f0ea830aa9c316a1c55d8249c3bf511e97792d5ee4e5a6346f9d83c8e695cef4f1d7b3ccf3fa8a112b73b905aeef3ae7213325a2ab3fcf05d
REFRESH_TOKEN_EXP = 30d
RESET_PASS_TOKEN = 19121ce9ceb41e3b4028d1746487824b7b73d8ee6e3988d6b8c4770c91362a2f
RESET_PASSWORD_LINK = http://localhost:5000
RESET_PASS_EXP = 1d
NODE_ENV = development
JWT_TOKEN =  19121ce9ceb41e3b4028d1746487824b7b73d8ee6e3988d6b8c4770c91362a2f

# mail service
EMAIL_FROM ='support@EventEase.io'
APP_HOST = "smtp.gmail.com"
APP_PASS = "phir xoyw uruz tmnc"
APP_EMAIL = "kabirnisharga@gmail.com"
APP_NAME = "EventEase"
APP_PORT = 465


VERIFY_EMAIL_TOKEN = 19121ce9ceb41e3b4028d1746487824b7b73d8ee6e3988d6b8c4770c91362a2f
VERIFY_EMAIL_LINK = http://localhost:5000
VERIFY_EMAIL_EXP = 1d
API_SECRET = VDb-Yzn5sfpIHijeCrwos19VGfQ

# Frontend Link
USER_FRONTEND_URL = http://localhost:3000
USER_FRONTEND_PRODUCTION_URL = http://localhost:3000
```

Follow the steps below to set up the project on your local machine:

### Step 0: Clone the Repository

Clone the repository to your local system using the following command:

```bash
git clone https://github.com/nisharga/eventease-backend.git
```

### Step 1: Navigate to the Project Folder

Alternatively, you can open the folder manually or open it with VSCode.

```bash
cd eventease-backend
```

### Step 2: Install Dependencies

Install the required dependencies by running the following command:

```bash
npm i
```

### Step 3: Run the Project

Run the project using the following command:

```bash
npm run dev
```

This command will start the project.
