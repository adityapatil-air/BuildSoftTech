import React from 'react';
import { Link } from 'react-router-dom';
import { Cta, Faq, PageBanner } from '../components/shared';
import { FAQS } from '../data/content';

const FaqPage = () => (
  <div>
    <PageBanner eyebrow="Help" title="Frequently Asked Questions" intro="Straight answers about what we do — and what we never promise." />
    <div className="page-body site-container">
      <Faq items={FAQS} />
    </div>
    <Cta title="Still have a question?" text="Write to us or send a WhatsApp message and we will get back to you within 2–3 business days." actions={<><Link to="/contact" className="button button-primary">Contact Us</Link><Link to="/enquire" className="button button-outline">Register / Enquire</Link></>} />
  </div>
);

export default FaqPage;
