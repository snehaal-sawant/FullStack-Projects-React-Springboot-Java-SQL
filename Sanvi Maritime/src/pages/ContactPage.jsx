import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { faqsData } from '../data/companyData';
import { useData } from '../context/DataContext';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Accordion } from '../components/common/Accordion';
import { inquiryService } from '../services/inquiryService';
import { useRfq } from '../context/RfqContext';

export const ContactPage = () => {
  const { companyInfo } = useData();
  const { showToast } = useRfq();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await inquiryService.submitRfq(formData);
      setSubmittedRef(res.data.referenceNumber);
      showToast('Contact message sent successfully!', 'success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      showToast(err.message || 'Failed to submit form', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 border-b border-navy-800 text-center space-y-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-2">
            CONTACT SANVI MARITIME
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mt-2">
            Our technical sales engineering team in Kalyan (Thane, Mumbai) is available 6 days a week to answer spare parts inquiries and port delivery logistics.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info Cards + Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Details Card */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-2xl border border-navy-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold font-heading text-white border-b border-navy-800 pb-3">
                Headquarters Info
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-0.5">Office Address:</h5>
                    <p className="text-slate-300 leading-relaxed">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-0.5">Hotline / WhatsApp:</h5>
                    <a href={`tel:${companyInfo.phone}`} className="text-slate-300 hover:text-amber-400 block font-semibold">
                      {companyInfo.phone}
                    </a>
                    <a href={`tel:${companyInfo.phoneSecondary}`} className="text-slate-300 hover:text-amber-400 block">
                      {companyInfo.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-0.5">Email Addresses:</h5>
                    <a href={`mailto:${companyInfo.email}`} className="text-slate-300 hover:text-amber-400 block">
                      {companyInfo.email}
                    </a>
                    <a href={`mailto:${companyInfo.emailSales}`} className="text-slate-300 hover:text-amber-400 block">
                      {companyInfo.emailSales}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-0.5">Working Hours:</h5>
                    <p className="text-slate-300">{companyInfo.workingHours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800 text-xs text-amber-300">
                ⚡ Emergency Afloat Repair Hotline available 24/7 for active vessels at port.
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-200 text-xs text-sky-900 space-y-2">
              <h4 className="font-bold text-navy-950 font-heading text-sm">Strategic Mumbai Port Proximity</h4>
              <p className="text-slate-600 leading-relaxed">
                Located in Kalyan (Thane, Mumbai), our central warehouse offers immediate dispatches to JNPT (Nhava Sheva) Port, Mumbai Port Trust, and express air shipments via Chhatrapati Shivaji Maharaj International Airport (BOM).
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              <div>
                <h3 className="text-2xl font-bold text-navy-950 font-heading">
                  Send Us a Message or RFQ
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below and our marine engineering team will get back to you within 2 hours.
                </p>
              </div>

              {submittedRef ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-600">
                    Reference Number: <strong className="font-mono text-navy-900">{submittedRef}</strong>
                  </p>
                  <Button onClick={() => setSubmittedRef(null)} variant="primary" size="sm">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <Input
                      label="Company Name"
                      name="company"
                      placeholder="e.g. Fleet Management Inc."
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Input
                      label="Phone / WhatsApp"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <Select
                    label="Inquiry Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    options={[
                      'General Inquiry',
                      'Main Engine Spare Parts RFQ',
                      'Auxiliary Generator Spares',
                      'Air Compressor / Purifier Spares',
                      'Alang Yard Reconditioned Stock',
                      'Onboard Afloat Repair Service'
                    ]}
                  />

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Message / Part Numbers Required *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-maritime-blue focus:border-maritime-blue focus:outline-none"
                      placeholder="Specify part numbers, quantity, vessel name, or delivery port details..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full sm:w-auto"
                    isLoading={isSubmitting}
                    icon={Send}
                  >
                    Submit Message
                  </Button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordions Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-maritime-blue uppercase tracking-wider">Help & Information</span>
          <h2 className="text-2xl font-bold text-navy-950 font-heading">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>
        <Accordion items={faqsData} />
      </section>

    </div>
  );
};
