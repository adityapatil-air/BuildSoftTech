import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { ButtonLink, CheckList, CourseCard, Eyebrow, H2, IconTile, PageHero, PaperCard, Section, SectionHead, StepCards } from '../components/ui';
import { COLORS, COURSES, DS_SYLLABUS, TRAINING_INCLUDES, TRAINING_MODES } from '../data/content';

const Training = ({ settings, batches, course }) => {
  const courses = settings.courses;
  return (
    <div>
      <PageHero
        crumbs={[{ label: 'Training' }]}
        eyebrow="Software training"
        title="Job-ready software training programs"
        intro="Learn from experienced trainers through live classes, real projects and personal mentoring. Choose the mode and schedule that fits you."
        actions={<><ButtonLink href="#enquiry" variant="accent">Book a free demo class</ButtonLink><ButtonLink href="#courses" variant="outline-light">See all courses</ButtonLink></>}
      />

      <Section>
        <SectionHead eyebrow="Training modes" title="Learn your way" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TRAINING_MODES.map((m) => (
            <PaperCard key={m.title} className="p-5">
              <IconTile name={m.icon} />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </PaperCard>
          ))}
        </div>
      </Section>

      <Section id="courses" tone="secondary">
        <SectionHead eyebrow="Course catalogue" title={`${courses.length} programs, one goal: get you job-ready`} text="EMI and instalment options available on most courses." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <CourseCard
              key={`${c.title}-${i}`}
              course={c}
              color={COLORS[i % COLORS.length]}
              icon={c.icon || COURSES[i]?.icon || 'code'}
              href={`/training?course=${encodeURIComponent(c.title)}#enquiry`}
            />
          ))}
        </div>
      </Section>

      {batches}

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <H2 className="mt-2">More than classes</H2>
            <div className="mt-6"><CheckList items={TRAINING_INCLUDES} /></div>
          </div>
          <div>
            <Eyebrow>Sample syllabus</Eyebrow>
            <H2 className="mt-2">Data Science in 10 modules</H2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {DS_SYLLABUS.map((m, i) => (
                <li key={m} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground">
                  <span className="font-display text-base font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="enquiry" tone="secondary">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Enquire now</Eyebrow>
            <H2 className="mt-2">Book a free demo class</H2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">Tell us what you want to learn. A counsellor will call you within 24 hours with batch dates and fees.</p>
            <div className="mt-6"><CheckList items={['No-obligation demo session', 'Instalment options', 'Weekend and evening batches']} /></div>
          </div>
          <EnquiryForm key={course || 'none'} variant="demo" options={courses.map((c) => c.title)} defaultTopic={course} />
        </div>
      </Section>
    </div>
  );
};

export default Training;
