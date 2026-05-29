export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "", 
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Aadhaar Card", 
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Aadhaar Card",
  "PAN Card",
  "Voter ID Card",
  "Driving License",
  "Passport",
  "ABHA (Ayushman Bharat) Card",
  "Bajaj Health EMI Card",
  "Student ID Card",
];

// 🇮🇳 Structured Indian Doctor Profiles with Degrees & Illnesses Treated
export const Doctors = [
  {
    image: "/assets/images/dr-sharma.png",
    name: "Dr. Hardik Sharma",
    degree: "MBBS, MD, DM (Cardiology)",
    specialty: "Cardiologist / Heart Specialist",
    treats: "Chest Pain, High Blood Pressure, Heart Attacks, Palpitations",
  },
  {
    image: "/assets/images/dr-green.png",
    name: "Dr. Alok Sharma",
    degree: "MBBS, MD (General Medicine)",
    specialty: "General Physician / Internal Medicine",
    treats: "Diabetes, High Fever, Typhoid, Malaria, Chronic Cough",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dr. Divya Iyer",
    degree: "MBBS, MD (Dermatology)",
    specialty: "Dermatologist / Skin & Hair Specialist",
    treats: "Acne, Severe Rashes, Skin Allergies, Hair Fall, Eczema",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Dr. K. S. Reddy",
    degree: "MBBS, MS, MCh (Neurology)",
    specialty: "Neurologist / Brain Specialist",
    treats: "Severe Migraines, Dizziness, Numbness, Seizures, Strokes",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Dr. Vikram Malhotra",
    degree: "MBBS, MS (Orthopedics)",
    specialty: "Orthopedic Surgeon / Bone Specialist",
    treats: "Joint Pain, Bone Fractures, Arthritis, Ligament Tears",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Dr. Pooja Joshi",
    degree: "MBBS, MD (Pediatrics)",
    specialty: "Pediatrician / Child Specialist",
    treats: "Childhood Viral Fevers, Vaccinations, Pediatric Asthma, Growth Concerns",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Dr. Amit Verma",
    degree: "MBBS, MS (Ophthalmology)",
    specialty: "Ophthalmologist / Eye Specialist",
    treats: "Blurry Vision, Eye Infections, Cataracts, Glaucoma",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Dr. Meera Nair",
    degree: "MBBS, MD (Psychiatry)",
    specialty: "Psychiatrist / Mental Health",
    treats: "Severe Anxiety, Depression, Sleep Disorders, Panic Attacks",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Dr. Rajesh Gupta",
    degree: "MBBS, MS (General Surgery)",
    specialty: "General Surgeon",
    treats: "Hernia, Appendicitis, Gallstones, Minor Surgical Tumors",
  }
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};