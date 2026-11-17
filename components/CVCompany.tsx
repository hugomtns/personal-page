import type { Company } from '@/content/cvTimeline';
import TerminalDisclosure from './TerminalDisclosure';
import CVProduct from './CVProduct';
import MetaList from './MetaList';

export default function CVCompany({ company }: { company: Company }) {
  return (
    <TerminalDisclosure
      name={company.name}
      dates={company.dates}
      summary={company.tagline}
      action={company.links.map(link => (
        <a
          key={link.href}
          href={link.href}
          aria-label={`Link to ${link.label}`}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-cv__company-link"
        >
          Link
        </a>
      ))}
    >
      <div className="terminal-cv__company-panel">
        <MetaList
          className="terminal-cv__meta terminal-cv__company-details"
          items={[
            { label: 'My role', value: company.role },
            { label: 'About', value: company.about },
          ]}
        />
        <ol className="terminal-cv__products" aria-label={`${company.name} case studies`}>
          {[...company.products].reverse().map(product => (
            <li key={product.id}>
              <CVProduct product={product} />
            </li>
          ))}
        </ol>
      </div>
    </TerminalDisclosure>
  );
}
