import CVCompany from './CVCompany';
import { companies } from '@/content/cvTimeline';

export default function CVTimeline() {
  return (
    <ol className="terminal-cv__companies">
      {[...companies].reverse().map(company => (
        <li key={company.id}>
          <CVCompany company={company} />
        </li>
      ))}
    </ol>
  );
}
