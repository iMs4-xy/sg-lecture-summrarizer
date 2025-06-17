# sg-lecture-summrarizer

# Transform recorded lectures into structured summaries for NUS, NTU, and SMU students. Upload lectures, earn money when others view them, and access course-specific summaries with subscription access.

# Features
🎥 Upload lecture recordings from Singapore universities (NUS, NTU, SMU)

📝 AI-powered summarization into Google Docs format

💰 Monetization system where uploaders earn from viewer watch time

🔍 Filter lectures by university, degree, and course

🕒 Singapore-timezone optimized processing

🔒 PDPA-compliant data handling

## Technology Stack
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express

AI Processing: Google Speech-to-Text (SG-optimized), OpenAI GPT-4 Turbo

Database: PostgreSQL

Cloud: AWS Singapore (ap-southeast-1)

Payments: Stripe Connect Singapore

Video Processing: FFmpeg

## Getting Started

Prerequisites:

Node.js v18+

Python 3.8+ (for video processing)

FFmpeg installed

Singapore-based API keys:

Google Cloud (Speech-to-Text)

OpenAI (GPT-4 access)

Stripe Singapore account

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/sg-lecture-summarizer.git
cd sg-lecture-summarizer
```

3. Install dependencies:
```
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```
3. Set up environment variables:
```
cp ../config/sg-example.env .env
```
4. Update .env with your Singapore-specific credentials:
```
OPENAI_API_KEY=your_openai_key_here
GOOGLE_APPLICATION_CREDENTIALS=path/to/google-credentials.json
STRIPE_SECRET_KEY=your_stripe_secret_key_here
AWS_REGION=ap-southeast-1
```
## Running Locally

1. Start the backend:
```
cd backend
node server.js
```
2. Start the frontend:
```
cd frontend
npm start
```
The application will be available at http://localhost:3000

### University Course Data

The system includes starter course databases for Singapore universities:

| University  | Sample Courses | Data Location |
| ------------- | ------------- |  ------------- |
| NUS  | CS1010, EC2101, MA1521  | ```backend/university-data/nus-courses.json``` |
| NTU  | SC1003, MH1810, AB1201  | ```backend/university-data/ntu-courses.json``` |   
| SMU  | IS101, ECON101, ACCT101  | ```backend/university-data/smu-courses.json``` |

To add more courses, edit the respective JSON files with the format:
```
{
  "code": "COURSE_CODE",
  "name": "Course Name",
  "faculty": "Faculty Name",
  "level": "Year 1/2/3/4",
  "key_topics": ["Topic 1", "Topic 2", "Topic 3"]
}
```
### Monetisation System

The platform uses a fair revenue-sharing model:

1. Subscription revenue: SGD 9.99/month
2. 20% allocated to uploaders
3. Earnings calculated by:
```
Earnings = (Your Lecture Watch-Time / Total Platform Watch-Time) × 50% × Subscription Revenue
```
4. Weekly payouts via Stripe Connect to Singapore bank accounts

## Deployment to AWS Singapore

1. Install AWS CLI and configure for Singapore region (ap-southeast-1)
2. Build Docker image:
```
docker build -t lecture-summarizer -f deployment/Dockerfile .
```
3. Push to AWS ECR:
```
aws ecr create-repository --repository-name lecture-summarizer --region ap-southeast-1
docker tag lecture-summarizer:latest YOUR_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/lecture-summarizer:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/lecture-summarizer:latest
```
4. Deploy using CloudFormation:
```
aws cloudformation deploy --template-file deployment/cloudformation.yml --stack-name lecture-summarizer --region ap-southeast-1
```

## Compliance Features

The application includes Singapore-specific compliance measures:

Automatic PDPA data handling

Copyright detection stubs

Singapore timezone (SGT) support

Age verification hooks

Data localisation to AWS Singapore region

## Contributing

We welcome contributions from Singapore developers! Please follow these steps:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/your-feature)
5. Open a pull request

## License

This project is licensed under the Singapore MIT License - see the LICENSE.md file for details.

## Support

Email : xieyiding@gmail.com

### Made with ❤️ in Singapore for Singapore Students
