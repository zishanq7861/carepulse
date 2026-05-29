import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  // 🚀 SIMPLE FIXED VALIDATION: Accepts any standard mobile number string between 10 and 15 digits
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance/Health Card provider must be at least 2 characters")
    .max(100, "Insurance/Health Card provider must be at most 100 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy/Card number must be at least 2 characters")
    .max(50, "Policy/Card number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 10, 
      "ID must be at least 10 characters (e.g., PAN Card)"
    )
    .refine(
      (val) => !val || val.length <= 12, 
      "ID cannot exceed 12 characters (e.g., Card ID)"
    ),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

// 🚀 APPOINTMENT SCHEMAS
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.date(),
  reason: z.string().min(2, "Reason must be at least 2 characters long"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().min(2, "Cancellation reason must be at least 2 characters long"),
});

// 🚀 THE DYNAMIC SCHEME SELECTION FUNCTION
export function getAppointmentSchema(type: string) {
  switch (type) {
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return CreateAppointmentSchema;
  }
}