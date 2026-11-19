import { redirect } from 'next/navigation';
import { PageHero, PaperCard, Section } from '../../components/ui';

export const metadata = {
  title: 'Verify a Certificate',
  description: 'Check that a BuildSoftTech course or internship certificate is genuine using its certificate number.',
};

export default function VerifyCertificatePage({ searchParams }) {
  const no = String(searchParams?.no || '').trim().toUpperCase();
  if (no) redirect(`/certificates/${encodeURIComponent(no)}`);
  return (
    <div>
      <PageHero crumbs={[{ label: 'Verify a certificate' }]} eyebrow="Certificates" title="Verify a certificate" intro="Every BuildSoftTech certificate carries a unique number, for example BST-C-2026-0001. Enter it below to confirm it was issued by us." />
      <Section className="max-w-2xl">
        <PaperCard as="form" action="/certificates" method="get" className="p-6 sm:p-8">
          <div className="form-group">
            <label htmlFor="cert-no">Certificate number</label>
            <input className="form-input" id="cert-no" name="no" required placeholder="BST-C-2026-0001" autoCapitalize="characters" spellCheck={false} />
          </div>
          <button className="button button-primary" type="submit">Verify</button>
        </PaperCard>
      </Section>
    </div>
  );
}
