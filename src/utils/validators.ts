import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Invalid email address");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");
export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits");
export const requiredString = z.string().min(1, "This field is required");

// Validation functions
export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const validatePassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success;
};

export const validatePhone = (phone: string): boolean => {
  return phoneSchema.safeParse(phone).success;
};

// File validation
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (
  file: File,
  acceptedTypes: string[]
): boolean => {
  return acceptedTypes.some((type) => file.type.includes(type));
};

// Form validation helpers
export const createValidationSchema = (
  fields: Record<string, z.ZodTypeAny>
) => {
  return z.object(fields);
};

// Custom error messages
export const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Cannot exceed ${length} characters`,
  invalid: "Invalid value",
};
