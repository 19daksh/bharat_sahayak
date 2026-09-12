/** Shared option lists used by the profile form, filters and the eligibility engine. */

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

export const OCCUPATIONS = [
  "student",
  "farmer",
  "daily-wage-worker",
  "self-employed",
  "street-vendor",
  "salaried",
  "homemaker",
  "unemployed",
  "senior-citizen",
  "other",
] as const;

export const EDUCATION_LEVELS = [
  "no-formal",
  "primary",
  "class-10",
  "class-12",
  "diploma",
  "undergraduate",
  "postgraduate",
] as const;

export const GENDERS = ["female", "male", "other"] as const;

export const AREA_TYPES = ["rural", "urban"] as const;

export const CATEGORIES = [
  "education",
  "employment",
  "agriculture",
  "health",
  "women-child",
  "housing",
  "social-support",
] as const;

export const APPLICATION_STAGES = [
  "discovered",
  "eligibility_checked",
  "documents_prepared",
  "preparing",
  "submitted",
  "verification",
  "decision",
] as const;

export type ApplicationStage = (typeof APPLICATION_STAGES)[number];

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOAD_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
