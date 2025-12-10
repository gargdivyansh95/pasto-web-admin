import * as z from "zod";

export const VerifyRestaurantSchema = z.object({
  fssai: z.object({
    isValid: z.boolean(),
    reason: z.string().optional().or(z.literal(""))
  }).refine((d) => d.isValid || d.reason.trim().length > 0, {
    message: "Reason is required when document is invalid",
    path: ["reason"]
  }),

  businessRegistration: z.object({
    isValid: z.boolean(),
    reason: z.string().optional().or(z.literal(""))
  }).refine((d) => d.isValid || d.reason.trim().length > 0, {
    message: "Reason is required when document is invalid",
    path: ["reason"]
  }),

  gst: z.object({
    isValid: z.boolean(),
    reason: z.string().optional().or(z.literal(""))
  }).refine((d) => d.isValid || d.reason.trim().length > 0, {
    message: "Reason is required when document is invalid",
    path: ["reason"]
  }),
});

export default VerifyRestaurantSchema;