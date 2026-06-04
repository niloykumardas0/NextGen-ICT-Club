'use server';
/**
 * @fileOverview A Genkit flow for drafting announcements and notices based on a brief prompt.
 *
 * - aiDraftAnnouncements - A function that handles the announcement drafting process.
 * - AIDraftAnnouncementsInput - The input type for the aiDraftAnnouncements function.
 * - AIDraftAnnouncementsOutput - The return type for the aiDraftAnnouncements function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIDraftAnnouncementsInputSchema = z.object({
  briefPrompt: z
    .string()
    .describe(
      'A brief prompt or topic for the announcement. E.g., "Olympiad registration deadline extended to Friday."'
    ),
});
export type AIDraftAnnouncementsInput = z.infer<
  typeof AIDraftAnnouncementsInputSchema
>;

const AIDraftAnnouncementsOutputSchema = z.object({
  title: z.string().describe('A suggested title for the announcement or notice.'),
  content: z
    .string()
    .describe('The drafted content of the announcement or notice.'),
  audience: z
    .array(z.string())
    .describe(
      'An array of strings indicating the target audience for this announcement. Examples: ["Participants", "Members", "Ambassadors", "All"].'
    ),
});
export type AIDraftAnnouncementsOutput = z.infer<
  typeof AIDraftAnnouncementsOutputSchema
>;

export async function aiDraftAnnouncements(
  input: AIDraftAnnouncementsInput
): Promise<AIDraftAnnouncementsOutput> {
  return aiDraftAnnouncementsFlow(input);
}

const draftAnnouncementsPrompt = ai.definePrompt({
  name: 'draftAnnouncementsPrompt',
  input: { schema: AIDraftAnnouncementsInputSchema },
  output: { schema: AIDraftAnnouncementsOutputSchema },
  prompt: `You are an AI assistant tasked with drafting professional and clear announcements or notices for the NextGen ICT Club's Olympiad platform.

Based on the following brief prompt, generate a suitable title, the full content of the announcement, and identify the primary target audience(s).

Brief Prompt: {{{briefPrompt}}}

Ensure the language is formal, concise, and engaging.
`,
});

const aiDraftAnnouncementsFlow = ai.defineFlow(
  {
    name: 'aiDraftAnnouncementsFlow',
    inputSchema: AIDraftAnnouncementsInputSchema,
    outputSchema: AIDraftAnnouncementsOutputSchema,
  },
  async (input) => {
    const { output } = await draftAnnouncementsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate announcement content.');
    }
    return output;
  }
);
