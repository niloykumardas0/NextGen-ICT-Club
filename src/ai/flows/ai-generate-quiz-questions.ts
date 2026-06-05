'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating quiz questions based on topic, difficulty, and question type.
 *
 * - aiGenerateQuizQuestions - An exported function to trigger the quiz question generation flow.
 * - AiGenerateQuizQuestionsInput - The input type for the aiGenerateQuizQuestions function.
 * - AiGenerateQuizQuestionsOutput - The return type for the aiGenerateQuizQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiGenerateQuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The specific subject or area for the quiz questions (e.g., "Data Structures", "Web Development").'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The desired difficulty level for the generated questions.'),
  numberOfQuestions: z.number().int().min(1).max(20).describe('The total number of quiz questions to be generated (between 1 and 20).'),
  questionType: z.enum(['Multiple Choice', 'True/False', 'Short Answer']).describe('The format of the questions (e.g., "Multiple Choice", "True/False", "Short Answer").'),
});
export type AiGenerateQuizQuestionsInput = z.infer<typeof AiGenerateQuizQuestionsInputSchema>;

const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The main text of the quiz question.'),
  questionType: z.enum(['Multiple Choice', 'True/False', 'Short Answer']).describe('The type of the quiz question, matching the input request.'),
  options: z.array(z.string()).optional().describe('An array of possible answer choices, applicable only for "Multiple Choice" questions. Should contain exactly 4 options.'),
  correctAnswer: z.string().describe('The exact correct answer to the question. For Multiple Choice, this should be the text of one of the provided options. For True/False, it must be "True" or "False". For Short Answer, it is the expected concise answer.'),
  explanation: z.string().describe('A brief explanation detailing why the correctAnswer is correct.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The assigned difficulty level of this specific question.'),
  topic: z.string().describe('The specific topic this question belongs to.'),
});

const AiGenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array containing the generated quiz questions.'),
});
export type AiGenerateQuizQuestionsOutput = z.infer<typeof AiGenerateQuizQuestionsOutputSchema>;

export async function aiGenerateQuizQuestions(input: AiGenerateQuizQuestionsInput): Promise<AiGenerateQuizQuestionsOutput> {
  return aiGenerateQuizQuestionsFlow(input);
}

const aiGenerateQuizQuestionsPrompt = ai.definePrompt({
  name: 'aiGenerateQuizQuestionsPrompt',
  input: { schema: AiGenerateQuizQuestionsInputSchema },
  output: { schema: AiGenerateQuizQuestionsOutputSchema },
  prompt: `You are an expert quiz question generator for an ICT Olympiad platform. Your goal is to create precise, clear, and relevant quiz questions based on the given specifications.

Generate exactly {{numberOfQuestions}} quiz questions.
Each question must be strictly related to the topic: "{{{topic}}}".
All questions must be of the difficulty level: "{{{difficulty}}}".
All questions must be of the type: "{{{questionType}}}".

If the questionType is 'Multiple Choice', provide exactly 4 distinct and plausible options, with only one being the correct answer.
If the questionType is 'True/False', the correctAnswer must be either "True" or "False".
If the questionType is 'Short Answer', provide a concise and direct expected correctAnswer.

Ensure questions are unique, well-formed, and test relevant knowledge for the specified topic and difficulty. Include a clear explanation for each correct answer.

Output the questions in the specified JSON format.`,
});

const aiGenerateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'aiGenerateQuizQuestionsFlow',
    inputSchema: AiGenerateQuizQuestionsInputSchema,
    outputSchema: AiGenerateQuizQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await aiGenerateQuizQuestionsPrompt(input);
    return output!;
  }
);
