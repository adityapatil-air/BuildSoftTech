import React from 'react';
import { ButtonLink, ConsultCta, EnquireLinks, Note, PageHero, Section, SectionHead, StatusBadge, Table } from '../components/ui';

// "Become an author" books, managed by the admin under Site settings > Author books.
const Books = ({ settings }) => {
  const c = settings.contact;
  const books = (settings.authorBooks || []).filter((b) => String(b.title || '').trim());
  const open = books.filter((b) => b.status !== 'sold');
  const rows = [...open, ...books.filter((b) => b.status === 'sold')];

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
        <SectionHead
          eyebrow="Books"
          title={open.length ? 'Books taking authors' : 'No books open right now'}
          text={open.length ? 'Places are limited per book and are given in the order requests are confirmed.' : 'New books open regularly. Call or email us and we will tell you when the next one starts.'}
        />
        {rows.length > 0 && (
          <div className="mt-8">
            <Table
              minWidth={860}
              head={['#', 'Book title', 'Author type', 'Details', 'Price', 'Status', 'Enquire']}
              rows={rows.map((b, i) => {
                const sold = b.status === 'sold';
                return [
                  <span key="n" className="text-muted-foreground">{i + 1}</span>,
                  <strong key="t" className="font-semibold text-foreground">{b.title}</strong>,
                  <span key="r" className="whitespace-nowrap">{b.role || '—'}</span>,
                  <span key="d" className="whitespace-pre-line text-muted-foreground">{b.details || '—'}</span>,
                  <span key="p" className="whitespace-nowrap font-display font-semibold text-primary">{String(b.price || '').trim() || 'On request'}</span>,
                  <StatusBadge key="s" sold={sold} openLabel="Open" soldLabel="Sold out" />,
                  sold ? <span key="e" className="text-xs text-muted-foreground">—</span> : <EnquireLinks key="e" contact={c} about={b.title} />,
                ];
              })}
            />
          </div>
        )}

        <Note className="mt-10">
          Authors write and submit their own original content. The price covers editing, plagiarism check, typesetting, ISBN and publication. Contact us for the full terms of each book before you pay.
        </Note>
      </Section>

      <ConsultCta contact={c} title="Want to publish your own book?" text="We also publish textbooks, reference books and thesis-to-book projects with ISBN." />
    </div>
  );
};

export default Books;
