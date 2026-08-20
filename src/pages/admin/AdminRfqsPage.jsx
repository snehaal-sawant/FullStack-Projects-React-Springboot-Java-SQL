import React, { useEffect, useState } from 'react';
import {
  getAdminRfqs,
  updateAdminRfqStatus,
  deleteAdminRfq
} from '../../services/api';
import {
  MessageSquare,
  Search,
  Eye,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  Mail,
  Phone,
  Anchor,
  Navigation,
  FileText
} from 'lucide-react';

export const AdminRfqsPage = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchRfqs = async () => {
    setLoading(true);
    setError('');
    const res = await getAdminRfqs();
    if (res && res.success && res.data) {
      setRfqs(res.data);
    } else {
      setError(res?.error || 'Failed to fetch RFQ inquiries.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRfqs();
  }, []);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleStatusChange = async (rfqId, newStatus) => {
    try {
      const res = await updateAdminRfqStatus(rfqId, newStatus);
      if (res && res.success) {
        showNotification(`RFQ status updated to "${newStatus}"`);
        fetchRfqs();
      } else {
        setError(res?.error || 'Failed to update status.');
      }
    } catch (err) {
      setError('Error updating RFQ status.');
    }
  };

  const handleOpenViewModal = (rfq) => {
    setSelectedRfq(rfq);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (rfq) => {
    setSelectedRfq(rfq);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRfq) return;
    setSubmitting(true);
    try {
      const res = await deleteAdminRfq(selectedRfq.id);
      if (res && res.success) {
        showNotification('RFQ inquiry deleted successfully!');
        setIsDeleteModalOpen(false);
        fetchRfqs();
      } else {
        setError(res?.error || 'Failed to delete RFQ inquiry.');
      }
    } catch (err) {
      setError('An error occurred while deleting RFQ.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRfqs = rfqs.filter((r) => {
    const matchSearch =
      (r.referenceNumber && r.referenceNumber.toLowerCase().includes(search.toLowerCase())) ||
      (r.name && r.name.toLowerCase().includes(search.toLowerCase())) ||
      (r.email && r.email.toLowerCase().includes(search.toLowerCase())) ||
      (r.company && r.company.toLowerCase().includes(search.toLowerCase())) ||
      (r.vesselName && r.vesselName.toLowerCase().includes(search.toLowerCase()));

    const matchStatus = !statusFilter || r.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            <span>Inquiries Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review customer quotation requests, vessel info, and requested items</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference #, customer name, email, company, vessel..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="">All Statuses</option>
          <option value="Received">Received</option>
          <option value="In Review">In Review</option>
          <option value="Quoted">Quoted</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* RFQ List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">Loading quotation requests...</p>
          </div>
        ) : filteredRfqs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Reference #</th>
                  <th className="px-4 py-3">Customer Information</th>
                  <th className="px-4 py-3">Vessel & Port</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRfqs.map((rfq) => (
                  <tr key={rfq.id || rfq.referenceNumber} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">
                      {rfq.referenceNumber}
                      <div className="text-[10px] text-slate-500 font-sans font-normal mt-0.5">
                        {rfq.createdAt ? new Date(rfq.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-100">{rfq.name || 'Anonymous Client'}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {rfq.email}
                      </div>
                      {rfq.company && (
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" /> {rfq.company}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-200">{rfq.vesselName ? `Vessel: ${rfq.vesselName}` : 'General Inquiry'}</div>
                      {rfq.deliveryPort && <div className="text-[10px] text-slate-400">Port: {rfq.deliveryPort}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-semibold">
                        {rfq.items ? `${rfq.items.length} items` : '0 items'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={rfq.status || 'Received'}
                        onChange={(e) => handleStatusChange(rfq.id, e.target.value)}
                        className={`py-1 px-2.5 rounded-lg text-xs font-semibold border bg-slate-950 focus:outline-none ${rfq.status === 'Received' ? 'text-amber-400 border-amber-500/30' :
                            rfq.status === 'Completed' ? 'text-emerald-400 border-emerald-500/30' :
                              rfq.status === 'Quoted' ? 'text-cyan-400 border-cyan-500/30' :
                                rfq.status === 'Cancelled' ? 'text-red-400 border-red-500/30' :
                                  'text-indigo-400 border-indigo-500/30'
                          }`}
                      >
                        <option value="Received">Received</option>
                        <option value="In Review">In Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenViewModal(rfq)}
                          title="View Full RFQ Details"
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(rfq)}
                          title="Delete RFQ"
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500">
            <p className="text-sm">No RFQ quotation requests found.</p>
          </div>
        )}
      </div>

      {/* View Complete RFQ Details Modal */}
      {isViewModalOpen && selectedRfq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 text-xs text-slate-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">RFQ Details — {selectedRfq.referenceNumber}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Submitted on: {selectedRfq.createdAt ? new Date(selectedRfq.createdAt).toLocaleString() : 'N/A'}</p>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Customer Name</span>
                <p className="text-slate-100 font-bold text-sm mt-0.5">{selectedRfq.name}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Company</span>
                <p className="text-slate-100 font-semibold mt-0.5">{selectedRfq.company || 'Not Specified'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Email Address</span>
                <p className="text-cyan-400 font-mono mt-0.5">{selectedRfq.email}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Phone</span>
                <p className="text-slate-200 font-mono mt-0.5">{selectedRfq.phone || 'N/A'}</p>
              </div>
            </div>

            {/* Vessel & Port Info */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Vessel Name</span>
                <p className="text-slate-200 font-semibold mt-0.5">{selectedRfq.vesselName || 'N/A'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">IMO Number</span>
                <p className="text-slate-200 font-mono mt-0.5">{selectedRfq.imoNumber || 'N/A'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Delivery Port</span>
                <p className="text-slate-200 font-semibold mt-0.5">{selectedRfq.deliveryPort || 'N/A'}</p>
              </div>
            </div>

            {/* Subject & Message */}
            {selectedRfq.message && (
              <div>
                <span className="text-slate-400 font-semibold">Message / Request Notes:</span>
                <p className="mt-1 bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200 whitespace-pre-wrap">
                  {selectedRfq.message}
                </p>
              </div>
            )}

            {/* Requested Items Table */}
            <div>
              <h4 className="font-bold text-slate-200 mb-2">Requested Products / Spare Parts:</h4>
              {selectedRfq.items && selectedRfq.items.length > 0 ? (
                <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Part Number</th>
                        <th className="p-2.5">Item Title</th>
                        <th className="p-2.5 text-right">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {selectedRfq.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-mono text-cyan-400">{item.partNumber || 'N/A'}</td>
                          <td className="p-2.5 text-slate-200 font-medium">{item.title}</td>
                          <td className="p-2.5 text-right font-bold text-white">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-xs italic">No specific items attached.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedRfq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete RFQ Request?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete inquiry <span className="text-slate-200 font-semibold">"{selectedRfq.referenceNumber}"</span> from <span className="text-slate-200 font-semibold">{selectedRfq.name}</span>?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
