# AI Chat Assistant - Frontend Engineer Assessment

A modern, production-ready AI chat application built with React and Express.js. This project demonstrates a complete frontend–backend integration with OpenAI’s GPT model, including conversation memory, real-time interactions, and a clean, responsive user interface.

## Features

### Core Requirements
- Prompt input with validation and character counting
- AI API integration with OpenAI GPT-3.5 Turbo
- Dynamic response display using chat-style message bubbles
- Comprehensive error handling with user-friendly feedback
- Loading states with visual indicators
- Fully responsive design for desktop and mobile devices

### Bonus Features
- Conversation history with full context memory
- Clear conversation button
- Auto-scroll to the latest message
- Enter-to-submit support (Shift + Enter for new line)
- Message differentiation between user and AI responses

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **AI Integration:** OpenAI API (GPT-3.5 Turbo)

## Quick Start

### Prerequisites
- Node.js 16+ and npm or yarn
- OpenAI API key (free trial available)

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-chat-assessment.git
cd ai-chat-assessment
```

2. Install Dependencies
Frontend:
```bash
npm install
```

Backend:
```bash
cd server
npm install
```

3. Environment Variables
Create a .env file inside the server directory and add:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Running the Application

Start the backend server:
```bash
cd server
npm start
```

Start the frontend development server:
```bash
npm run dev
```

Access the Application
Frontend: http://localhost:5173
Backend: http://localhost:3001
