import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),

    firstName: z.string().min(2, "First name is required"),

    lastName: z.string().min(2, "Last name is required"),

    phone: z.string().min(2, "Phone number is required"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;

export const vehicleSchema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
  make: z.string().min(3, "Make is required"),
  model: z.string().min(3, "Model is required"),
  color: z.string().min(3, "Color  is required"),
  year: z.string().min(3, "Year is required"),
  vin: z.string().min(3, "Vin is required"),
  fuelType: z.string().min(3, "Fuel Type is required"),
  capacity: z.string().min(1, "Capacity is required"),
});

export type VehicleForm = z.infer<typeof vehicleSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
