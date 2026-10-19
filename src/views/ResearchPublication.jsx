import React from 'react';
import { ButtonLink, Chips, CheckList, CtaBand, FeatureCards, Note, PageHero, Panel, Section, SectionHead, StepCards, TextLink } from '../components/ui';
import { IJEPA } from '../data/site';
import { PUBLICATION_PROCESS, PUBLICATION_SUPPORT, RESEARCH_AREAS, WHO_CAN_SUBMIT, WHY_IJEPA } from '../data/content';

const ResearchPublication = () => (
  <div>
    <PageHero
      eyebrow="Journal Publication"
      title="IJEPA — International Journal of Engineering Practices and Applications"
      intro="BuildSoftTech provides professional research publication support through IJEPA, a platform for researchers, academicians, faculty members, research scholars and students to disseminate original research across engineering, technology and interdisciplinary domains."
      actions={<>
        <ButtonLink href={IJEPA.url} variant="accent">Open the IJEPA portal ↗</ButtonLink>
        <ButtonLink href={IJEPA.submitUrl} variant="outline-light">Submit your paper</ButtonLink>
      </>}
    />

    <Section>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHead title="Publication support through IJEPA" text="IJEPA is published by BuildSoftTech. The journal runs its own editorial workflow, peer review, issues and author guidelines on its website; through our dedicated journal platform, BuildSoftTech supports authors with:" />
          <div className="mt-8"><CheckList items={PUBLICATION_SUPPORT} cols={2} /></div>
        </div>
        <Panel className="self-start">
          <h3 className="font-display text-2xl font-semibold tracking-tight">IJEPA at a glance</h3>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            {[['ISSN', IJEPA.issn], ['Access', 'Open access'], ['Review', 'Peer reviewed'], ['Frequency', 'Monthly']].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-card p-3">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-primary">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <TextLink href={IJEPA.guidelinesUrl}>Author guidelines ↗</TextLink>
            <TextLink href={IJEPA.issuesUrl}>Journal issues ↗</TextLink>
          </div>
        </Panel>
      </div>
    </Section>

    <Section tone="secondary">
      <SectionHead title="How publication works" />
      <div className="mt-10"><StepCards items={PUBLICATION_PROCESS.map((t) => ({ title: t }))} cols={4} /></div>
    </Section>

    <Section>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Research areas covered</h2>
          <p className="mt-2 text-sm text-muted-foreground">IJEPA welcomes suitable research contributions from areas including:</p>
          <div className="mt-5"><Chips items={[...RESEARCH_AREAS.map((a) => a.title), 'Other related engineering and technology domains']} /></div>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Who can submit?</h2>
          <p className="mt-2 text-sm text-muted-foreground">IJEPA publication services are suitable for:</p>
          <div className="mt-5"><Chips items={WHO_CAN_SUBMIT} /></div>
        </div>
      </div>
    </Section>

    <Section tone="secondary">
      <SectionHead title="Why publish through IJEPA?" />
      <div className="mt-10"><FeatureCards items={WHY_IJEPA} /></div>
      <Note tone="warn" className="mt-10">
        <strong className="font-semibold">Publication ethics statement.</strong> At BuildSoftTech and IJEPA, we encourage original, ethical and responsible research publication. Authors are responsible for the originality, accuracy and integrity of their submitted work. Manuscripts should not contain plagiarism, fabricated data, manipulated results, duplicate publication or inappropriate authorship. Publication is subject to the journal's editorial and peer-review process. BuildSoftTech/IJEPA does not guarantee acceptance of any manuscript.
      </Note>
      <p className="mt-6 text-sm text-muted-foreground">
        First-time author? Our <TextLink href="/services/research-collaboration">research collaboration program</TextLink> and <TextLink href="/services/research-support">research support services</TextLink> help from topic selection to submission.
      </p>
    </Section>

    <CtaBand
      title="Ready to publish with IJEPA?"
      text="Submit your manuscript on the IJEPA portal, or ask us for formatting and submission guidance first."
      actions={<><ButtonLink href={IJEPA.submitUrl} variant="accent">Submit your paper ↗</ButtonLink><ButtonLink href="/contact" variant="outline-light">Ask for publication support</ButtonLink></>}
    />
  </div>
);

export default ResearchPublication;
