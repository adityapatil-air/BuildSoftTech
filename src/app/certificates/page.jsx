import { redirect } from 'next/navigation';
import { PageHero } from '../../components/ui';

export const metadata = {
  title: 'Verify a Certificate',
  description: 'Check that a BuildSoftTech course or internship certificate is genuine using its certificate number.',
};

export default function VerifyCertificatePage({ searchParams }) {
  const no = String(searchParams?.no || '').trim().toUpperCase();
  if (no) redirect(`/certificates/${encodeURIComponent(no)}`);
  return (
    <div className="pub">
      <PageHero crumb="Verify a certificate" title="Verify a certificate" lead="Every BuildSoftTech certificate carries a unique number, for example BST-C-2026-0001. Enter it below to confirm it was issued by us." />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 620 }}>
          <form className="form" action="/certificates" method="get">
            <div className="form-group">
              <label htmlFor="cert-no">Certificate number</label>
              <input className="form-input" id="cert-no" name="no" required placeholder="BST-C-2026-0001" autoCapitalize="characters" spellCheck={false} />
            </div>
            <button className="btn btn-primary" type="submit">Verify</button>
          </form>
        </div>
      </section>
    </div>
  );
}
