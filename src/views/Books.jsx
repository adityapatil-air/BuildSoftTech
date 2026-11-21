import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { ButtonLink, ConsultCta, IconTile, Note, PageHero, PaperCard, Section, SectionHead, waLink } from '../components/ui';
import { cn } from '../lib/utils';

// "Become an author" books, managed by the admin under Site settings > Author books.
const Books = ({ settings }) => {
  const c = settings.contact;
  const books = (settings.authorBooks || []).filter((b) => String(b.title || '').trim());
  const open = books.filter((b) => b.status !== 'sold');
  const sold = books.filter((b) => b.status === 'sold');
  const subject = (t) => encodeURIComponent(`Author enquiry: ${t}`);

  const card = (b, i) => {
    const isSold = b.status === 'sold';
    const price = String(b.price || '').trim();
    const wa = waLink(c.whatsapp, `Hello, I would like to become an author in "${b.title}".`);
    return (
      <PaperCard key={`${b.title}-${i}`} as="article" className={cn('flex flex-col', isSold && 'opacity-70')}>
        <div className="flex items-start justify-between gap-3">
          <IconTile name="book" />
          <span className={cn('rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider', isSold ? 'bg-secondary text-muted-foreground' : 'bg-accent text-accent-foreground')}>
            {isSold ? 'Sold out' : 'Open for authors'}
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{b.title}</h3>
        {b.role && <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">{b.role}</p>}
        {b.details && <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{b.details}</p>}
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Become an author</p>
          <p className={cn('mt-1 font-display font-semibold tracking-tight text-primary', price ? 'text-2xl' : 'text-lg')}>{price || 'Price on request'}</p>
          {!isSold && (
            <div className="mt-4 flex flex-wrap gap-2">
              {c.phoneDisplay && (
                <a href={`tel:${c.phoneLink}`} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {c.phoneDisplay}
                </a>
              )}
              {c.email && (
                <a href={`mailto:${c.email}?subject=${subject(b.title)}`} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email us
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      </PaperCard>
    );
  };

  return (
    <div>
      <PageHero
        crumbs={[{ label: 'Become an author' }]}
        eyebrow="Books with ISBN"
        title="Become an author in our upcoming books"
        intro="Write a chapter or co-author a book with ISBN. Pick a book below, check the price and contact us by phone, email or WhatsApp to reserve your place."
        actions={(
          <>
            {c.phoneDisplay && <ButtonLink href={`tel:${c.phoneLink}`} variant="accent">Call {c.phoneDisplay}</ButtonLink>}
            {c.email && <ButtonLink href={`mailto:${c.email}?subject=${encodeURIComponent('Become an author')}`} variant="outline-light">{c.email}</ButtonLink>}
          </>
        )}
      />

      <Section>
        <SectionHead eyebrow="Open now" title={open.length ? 'Books taking authors' : 'No books open right now'} text={open.length ? 'Places are limited per book and are given in the order requests are confirmed.' : 'New books open regularly. Call or email us and we will tell you when the next one starts.'} />
        {open.length > 0 && <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{open.map(card)}</div>}

        {sold.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Recently filled</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{sold.map(card)}</div>
          </div>
        )}

        <Note className="mt-12">
          Authors write and submit their own original content. The price covers editing, plagiarism check, typesetting, ISBN and publication. Contact us for the full terms of each book before you pay.
        </Note>
      </Section>

      <ConsultCta contact={c} title="Want to publish your own book?" text="We also publish textbooks, reference books and thesis-to-book projects with ISBN." />
    </div>
  );
};

export default Books;
