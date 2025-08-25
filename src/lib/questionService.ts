import casual from '../data/casual.json';
import medium from '../data/medium.json';
import spicy from '../data/spicy.json';
import extreme from '../data/extreme.json';

export type QuestionType = 'truth' | 'dare';
export type IntensityLevel = 'casual' | 'medium' | 'spicy' | 'extreme';

interface QuestionsData {
  truth: string[];
  dare: string[];
}

const questions: Record<IntensityLevel, QuestionsData> = {
  casual,
  medium,
  spicy,
  extreme
};

export function getRandomQuestion(type: QuestionType, intensity: IntensityLevel): string {
  const questionList = questions[intensity][type];
  const randomIndex = Math.floor(Math.random() * questionList.length);
  return questionList[randomIndex];
}

export function getQuestionCount(intensity: IntensityLevel): { truth: number; dare: number } {
  return {
    truth: questions[intensity].truth.length,
    dare: questions[intensity].dare.length
  };
} 