'use client';

import { useId, useRef, useState } from 'react';
import type { Project } from '@/content/projects';
import { AccordionPanel } from './Accordion';
import ProjectDetail from './ProjectDetail';
import { TerminalDisclosureLink, TerminalDisclosureTrigger } from './TerminalDisclosure';

export default function ProjectGarden({ projects }: { projects: Project[] }) {
  const listId = useId();
  const [openId, setOpenId] = useState<string | null>(null);
  const openTrigger = useRef<HTMLButtonElement>(null);

  function closeProject(panelId: string) {
    const trigger = openTrigger.current;
    if (trigger?.getAttribute('aria-controls') !== panelId) return;
    trigger.focus();
    setOpenId(null);
  }

  return (
    <ul className="terminal-projects__list">
      {projects.map(project => {
        const open = openId === project.id;
        const panelId = `${listId}-${project.id}`;
        return (
          <li key={project.id}>
            <TerminalDisclosureTrigger
              name={project.name}
              summary={project.tagline}
              action={project.url ? <TerminalDisclosureLink href={project.url} label={project.name} /> : undefined}
              open={open}
              aria-expanded={open}
              aria-controls={panelId}
              buttonRef={open ? openTrigger : undefined}
              onClick={() => setOpenId(id => id === project.id ? null : project.id)}
            />
            <AccordionPanel open={open} id={panelId}>
              <ProjectDetail project={project} onClose={() => closeProject(panelId)} />
            </AccordionPanel>
          </li>
        );
      })}
    </ul>
  );
}
