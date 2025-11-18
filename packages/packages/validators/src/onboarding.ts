import { z } from "zod";

export const onboardingSchema = z.object({
  orgName: z
    .string()
    .min(3, "Organization name be at least 3 characters")
    .max(50, "Organization name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Only letters, numbers, spaces, hyphens and underscore allowed"
    ),

  orgType: z
    .enum(["agency", "startup", "enterprise", "freelancer", "other"] as const)
    .refine((val) => val, { message: "Please select an organization" }),

  teamSize: z
    .enum(["1", "2-5", "6-10", "11-50", "50+"] as const)
    .refine((val) => val, { message: "please slect a team size " }),

  useCase: z
    .enum(["scheduling", "analytics", "collaborations", "all"] as const)
    .refine((val) => val, { message: "Please select your primary use" }),

    
});



export type OnboardingFormData = z.infer<typeof onboardingSchema>

export const step1Schema = onboardingSchema.pick({orgName: true});
export const step2Schema = onboardingSchema.pick({ orgType: true });
export const step3Schema = onboardingSchema.pick({ teamSize: true });
export const step4Schema = onboardingSchema.pick({ useCase: true });

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>