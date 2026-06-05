'use server';
/**
 * @fileOverview A Genkit flow for monitoring participant focus and detecting navigation away from the exam tab during an ICT Olympiad.
 *
 * - smartProctoredExam - A function that initiates the proctoring process based on client-side data.
 * - SmartProctoredExamInput - The input type for the smartProctoredExam function.
 * - SmartProctoredExamOutput - The return type for the smartProctoredExam function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartProctoredExamInputSchema = z.object({
  screenshotDataUri: z
    .string()
    .optional()
    .describe(
      "An optional screenshot of the user's screen, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  tabFocused: z
    .boolean()
    .describe('True if the exam tab is currently focused, false otherwise.'),
  windowFocused: z
    .boolean()
    .describe('True if the exam window is currently focused, false otherwise.'),
  activityLog: z
    .string()
    .optional()
    .describe(
      'An optional log of user activity (e.g., mouse movements, key presses) within the exam tab.'
    ),
});
export type SmartProctoredExamInput = z.infer<
  typeof SmartProctoredExamInputSchema
>;

const SmartProctoredExamOutputSchema = z.object({
  isFocused: z
    .boolean()
    .describe(
      'True if the participant appears to be focused on the exam, false otherwise.'
    ),
  reason: z
    .string()
    .describe(
      'A brief explanation of the assessment (e.g., "User is focused", "Tab lost focus").'
    ),
  warningLevel: z
    .enum(['NONE', 'LOW', 'MEDIUM', 'HIGH'])
    .describe(
      'The severity of the detected deviation from exam focus (NONE, LOW, MEDIUM, HIGH).'
    ),
});
export type SmartProctoredExamOutput = z.infer<
  typeof SmartProctoredExamOutputSchema
>;

export async function smartProctoredExam(
  input: SmartProctoredExamInput
): Promise<SmartProctoredExamOutput> {
  return smartProctoredExamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartProctoredExamPrompt',
  input: {schema: SmartProctoredExamInputSchema},
  output: {schema: SmartProctoredExamOutputSchema},
  prompt: `You are an intelligent proctoring agent for an online ICT Olympiad exam. Your task is to analyze the provided information about a participant's activity and determine if they are focused on the exam and adhering to proctoring rules.\n\nConsider the following information:\n- Is the exam tab focused: {{{tabFocused}}}\n- Is the exam window focused: {{{windowFocused}}}\n{{#if activityLog}}\n- User activity log within the exam tab: {{{activityLog}}}\n{{/if}}\n\n{{#if screenshotDataUri}}\nAnalyze this screenshot: {{media url=screenshotDataUri}}\n{{/if}}\n\nBased on the above, assess the participant's focus and determine if they have navigated away from the exam tab or are showing signs of distraction.\n\nInstructions:\n1. If 'tabFocused' is false OR 'windowFocused' is false, the user has likely navigated away. Set 'isFocused' to false, provide a clear reason, and set 'warningLevel' to HIGH.\n2. If both 'tabFocused' and 'windowFocused' are true, but the screenshot (if provided) shows content unrelated to the exam, or the activity log indicates suspicious behavior (e.g., very low activity for a long time, or specific patterns of activity suggesting external interaction), set 'isFocused' to false, provide a reason, and set 'warningLevel' to MEDIUM or HIGH depending on severity.\n3. If all indicators suggest the user is focused on the exam, set 'isFocused' to true, provide a positive reason, and set 'warningLevel' to NONE.\n\nProvide your response in JSON format according to the output schema.`,
});

const smartProctoredExamFlow = ai.defineFlow(
  {
    name: 'smartProctoredExamFlow',
    inputSchema: SmartProctoredExamInputSchema,
    outputSchema: SmartProctoredExamOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    if (!output) {
      throw new Error('Failed to get proctoring assessment from AI.');
    }
    return output;
  }
);
