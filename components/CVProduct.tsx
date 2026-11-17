import type { Product } from '@/content/cvTimeline';
import TerminalDisclosure from './TerminalDisclosure';
import Screenshot from './Screenshot';
import MetaList from './MetaList';

export default function CVProduct({ product }: { product: Product }) {
  const leadership = product.audience === '';

  return (
    <TerminalDisclosure name={product.name} dates={product.year} summary={product.tagline}>
      <div className="terminal-cv__case">
        {product.image && (
          <Screenshot
            src={product.image}
            alt={product.name}
            className="terminal-cv__screenshot"
            sizes="(max-width: 767px) 100vw, 736px"
          />
        )}
        <MetaList
          className="terminal-cv__meta"
          items={[
            ...(!leadership ? [{ label: 'For', value: product.audience }] : []),
            { label: leadership ? 'Scope' : 'Problem', value: product.problem },
            { label: 'What I did', value: product.did },
            { label: 'Outcome', value: product.outcome },
          ]}
        />
      </div>
    </TerminalDisclosure>
  );
}
