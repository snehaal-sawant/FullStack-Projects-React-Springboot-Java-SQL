import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useRfq } from '../../context/RfqContext';
import { inquiryService } from '../../services/inquiryService';

export const RfqModal = () => {
  const { isModalOpen, closeQuoteModal, activeItemForQuote, basketItems, clearBasket, showToast } = useRfq();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    vesselName: '',
    imoNumber: '',
    deliveryPort: '',
    urgency: 'Standard (3-5 Days)',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  useEffect(() => {
    if (!isModalOpen) {
      setSuccessResult(null);
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        itemsRequested: activeItemForQuote 
          ? [{ id: activeItemForQuote.id, partNumber: activeItemForQuote.partNumber, title: activeItemForQuote.title, quantity: 1 }]
          : basketItems.map(item => ({ id: item.id, partNumber: item.partNumber, title: item.title, quantity: item.quantity }))
      };

      const res = await inquiryService.submitRfq(payload);
      setSuccessResult(res.data);
      if (!activeItemForQuote) {
        clearBasket();
      }
      showToast('Quotation request submitted successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to submit quote', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeQuoteModal}
      title={activeItemForQuote ? `Request Quote for Part: ${activeItemForQuote.partNumber || activeItemForQuote.title}` : "Request Official Quotation"}
      subtitle="Sanvi Maritime Technical Sales Team will provide pricing & port delivery details"
      maxWidth="max-w-2xl"
    >
      {successResult ? (
        <div className="py-8 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 font-heading">Quotation Request Received!</h4>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Reference ID: <strong className="text-maritime-blue font-mono bg-sky-50 px-2 py-1 rounded">{successResult.referenceNumber}</strong>
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our marine technical engineers in Kalyan (Mumbai) will review your vessel specs and email you an official quotation within 2 to 4 hours.
          </p>
          <Button onClick={closeQuoteModal} variant="primary" className="mt-4">
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Target Item summary badge */}
          {activeItemForQuote ? (
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-3">
              <img src={activeItemForQuote.image} alt={activeItemForQuote.title} className="w-12 h-12 object-cover rounded-lg border" />
              <div>
                <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-100 px-2 py-0.5 rounded">Part Request</span>
                <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{activeItemForQuote.title}</h5>
                <p className="text-[11px] text-slate-500 font-mono">PN: {activeItemForQuote.partNumber} | {activeItemForQuote.condition}</p>
              </div>
            </div>
          ) : basketItems.length > 0 ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Quote Basket ({basketItems.length} items)</span>
              <ul className="mt-2 space-y-1 text-xs text-slate-700 max-h-24 overflow-y-auto custom-scrollbar">
                {basketItems.map(item => (
                  <li key={item.id} className="flex justify-between border-b border-amber-100 pb-1">
                    <span className="font-medium line-clamp-1">{item.title}</span>
                    <span className="font-bold text-slate-900">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              required
              placeholder="e.g. Capt. James Wilson"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Company / Management"
              name="company"
              placeholder="e.g. Atlantic Shipping Corp"
              value={formData.company}
              onChange={handleChange}
            />
            <Input
              label="Work Email"
              type="email"
              name="email"
              required
              placeholder="spares@company.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone / WhatsApp"
              name="phone"
              placeholder="+1 555-0192"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Vessel Name"
              name="vesselName"
              placeholder="e.g. M/V Ocean Pioneer"
              value={formData.vesselName}
              onChange={handleChange}
            />
            <Input
              label="IMO Number / Port of Delivery"
              name="deliveryPort"
              placeholder="e.g. IMO 9823412 / Port of Fujairah"
              value={formData.deliveryPort}
              onChange={handleChange}
            />
          </div>

          <Select
            label="Delivery Urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            options={[
              'Emergency Afloat Delivery (< 24 Hours)',
              'Urgent Express Port Call (1-2 Days)',
              'Standard (3-5 Days)',
              'Stock Replenishment'
            ]}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Specific Part Requirements / Serial Numbers
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-maritime-blue focus:border-maritime-blue focus:outline-none"
              placeholder="Include engine serial numbers, plate drawings, or custom packaging instructions..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <Button type="button" variant="ghost" onClick={closeQuoteModal}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" isLoading={isSubmitting} icon={Send}>
              Submit RFQ
            </Button>
          </div>

        </form>
      )}
    </Modal>
  );
};
