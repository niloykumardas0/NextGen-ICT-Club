import { config } from 'dotenv';
config();

import '@/ai/flows/ai-draft-announcements.ts';
import '@/ai/flows/ai-generate-quiz-questions.ts';
import '@/ai/flows/smart-proctored-exam-flow.ts';