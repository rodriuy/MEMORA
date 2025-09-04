import { config } from 'dotenv';
config();

import '@/ai/flows/generate-emotional-tag.ts';
import '@/ai/flows/generate-story-title.ts';
import '@/ai/flows/transcribe-audio-to-text.ts';