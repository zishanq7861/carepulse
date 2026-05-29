# CarePulse — Advanced Healthcare Management Platform 🩺

CarePulse is a modern, production-ready healthcare management system designed to streamline patient onboarding, registration, and appointment scheduling. Built with Next.js and Appwrite, it bridges the gap between patient usability and institutional administrative workflows.

---

## 🚀 Key Features

- **User Authentication & Profiles**: Secure patient onboarding utilizing Appwrite Auth, featuring robust international phone verification mapping.
- **Dynamic Multi-Step Registration**: Patient onboarding forms collecting medical history, identification documents, insurance details, and primary physician preferences.
- **Real-Time Appointment Scheduling**: Patients can seamlessly book, request, or modify clinic appointments.
- **Admin Dashboard Portal**: A centralized console for medical staff to review, schedule, confirm, or cancel upcoming appointments with real-time status metrics.
- **Secure File Storage**: Document upload handling (e.g., identity verification cards) directly managed and served through encrypted Appwrite Storage Buckets.
- **Responsive Fluid UI/UX**: A deep midnight-themed aesthetic designed with Tailwind CSS and Shadcn/ui primitives.

---

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 (App Router, Server Actions)
- **Programming Language**: TypeScript
- **Styling & UI Components**: Tailwind CSS, Shadcn/ui
- **Form Management & Validation**: React Hook Form, Zod
- **Backend-as-a-Service**: Appwrite (Auth, Databases, Storage SDK)
- **Phone Input Validation**: React Phone Number Input

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API Layouts)
│   ├── admin/            # Admin Dashboard Portal
│   ├── patients/         # Patient Registration & Dynamic Onboarding Routes
│   ├── globals.css       # Global Style Definitions & Tailwind Layers
│   └── layout.tsx        # Application Root Layout Configuration
├── components/           # Reusable UI & Functional Components
│   ├── forms/            # Form Logic Components (PatientForm, RegisterForm)
│   └── ui/               # Core Shadcn UI primitives
├── lib/                  # Backend & Utility Layer
│   ├── actions/          # Next.js Server Actions (patient.actions.ts)
│   ├── appwrite.config.ts# Appwrite SDK Initialization Clients
│   └── validation.ts     # Centralized Zod Form Validation Rules

⚙️ Getting Started & Installation
Follow these steps to set up the project locally on your machine.

1. Clone the Repository
git clone [https://github.com/zishanq7861/carepulse.git]
cd carepulse
2. Install Dependencies
npm install
3. Setup Environment Variables
Create a .env.local file in the root directory and populate it with your Appwrite configuration details:


NEXT_PUBLIC_APPWRITE_ENDPOINT=[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID=your_patient_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_storage_bucket_id

4. Run the Development Server
npm run dev

Open http://localhost:3000 with your browser to see the live system.