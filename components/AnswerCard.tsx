import type { QuizAnswer } from '@/content/compatibilityQuiz';

type Props = {
  answer: QuizAnswer;
  onCommit: () => void;
};

export default function AnswerCard({ answer, onCommit }: Props) {
  return (
    <button type="button" onClick={onCommit} className="terminal-quiz__card">
      <span className="terminal-quiz__card-prompt" aria-hidden="true">&gt;</span>
      <span className="terminal-quiz__answer">{answer.text}</span>
    </button>
  );
}
