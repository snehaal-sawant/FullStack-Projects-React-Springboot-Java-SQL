import { fetchApi } from './api';

export const inquiryService = {
  submitRfq: async (rfqPayload) => {
    if (!rfqPayload.email || !rfqPayload.name) {
      return { success: false, error: 'Name and email are required fields' };
    }

    const payload = {
      name: rfqPayload.name,
      company: rfqPayload.company || '',
      email: rfqPayload.email,
      phone: rfqPayload.phone || '',
      vesselName: rfqPayload.vesselName || '',
      imoNumber: rfqPayload.imoNumber || '',
      deliveryPort: rfqPayload.deliveryPort || '',
      urgency: rfqPayload.urgency || 'Standard',
      subject: rfqPayload.subject || 'RFQ Quotation Request',
      message: rfqPayload.message || '',
      notes: rfqPayload.notes || '',
      items: Array.isArray(rfqPayload.items)
        ? rfqPayload.items.map(item => ({
            productId: item.id || item.productId || '',
            partNumber: item.partNumber || '',
            title: item.title || '',
            quantity: item.quantity || 1,
          }))
        : [],
    };

    const response = await fetchApi('/rfq', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (response.success && response.data) {
      return {
        success: true,
        data: {
          message: response.data.message || 'Quotation request submitted successfully.',
          referenceNumber: response.data.referenceNumber,
        },
      };
    }

    return response;
  },

  getSubmittedRfqs: async (email) => {
    if (!email) {
      return { success: true, data: [] };
    }
    return await fetchApi(`/rfq/my-rfqs?email=${encodeURIComponent(email)}`);
  },
};
