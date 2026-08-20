import React, { useEffect, useState } from 'react';
import {
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService
} from '../../services/api';
import {
  Wrench,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    image: '',
    icon: 'Wrench',
    featuresJson: '',
  });

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    const res = await getAdminServices();
    if (res && res.success && res.data) {
      setServices(res.data);
    } else {
      setError(res?.error || 'Failed to fetch marine services.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({
      id: '',
      title: '',
      shortDescription: '',
      fullDescription: '',
      image: 'https://www.sanvimaritime.com/images/Service/SM1.jpg',
      icon: 'Wrench',
      featuresJson: '["24/7 Technical Assistance","Certified Engineer Crew"]',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (srv) => {
    setModalMode('edit');
    setSelectedService(srv);
    setFormData({
      id: srv.id || '',
      title: srv.title || '',
      shortDescription: srv.shortDescription || '',
      fullDescription: srv.fullDescription || '',
      image: srv.image || '',
      icon: srv.icon || 'Wrench',
      featuresJson: srv.featuresJson || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (srv) => {
    setSelectedService(srv);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (srv) => {
    setSelectedService(srv);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      let res;
      if (modalMode === 'add') {
        res = await createAdminService(formData);
      } else {
        res = await updateAdminService(selectedService.id, formData);
      }

      if (res && res.success) {
        showNotification(`Service ${modalMode === 'add' ? 'created' : 'updated'} successfully!`);
        setIsModalOpen(false);
        fetchServices();
      } else {
        setError(res?.error || 'Failed to save service.');
      }
    } catch (err) {
      setError('An error occurred while saving service.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedService) return;
    setSubmitting(true);
    try {
      const res = await deleteAdminService(selectedService.id);
      if (res && res.success) {
        showNotification('Service deleted successfully!');
        setIsDeleteModalOpen(false);
        fetchServices();
      } else {
        setError(res?.error || 'Failed to delete service.');
      }
    } catch (err) {
      setError('An error occurred while deleting service.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>Marine Services Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage technical overhauling, workshop, and supply services</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
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

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service title or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">Loading marine services...</p>
          </div>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((srv) => (
            <div key={srv.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
              <img
                src={srv.image || 'https://www.sanvimaritime.com/images/Service/SM1.jpg'}
                alt={srv.title}
                className="w-full h-40 object-cover bg-slate-950 border-b border-slate-800"
                onError={(e) => { e.target.src = 'https://www.sanvimaritime.com/images/Service/SM1.jpg'; }}
              />
              <div className="p-5 space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{srv.id}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Icon: {srv.icon || 'Wrench'}</span>
                </div>
                <h3 className="font-bold text-sm text-white line-clamp-1">{srv.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{srv.shortDescription}</p>
              </div>

              <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenViewModal(srv)}
                  className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(srv)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(srv)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500">
            <p className="text-sm">No marine services found.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl p-6 text-xs text-slate-300 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {modalMode === 'add' ? 'Add New Service' : 'Edit Marine Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3 overflow-y-auto flex-1 pr-1">
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Engine Overhaul & Technical Service"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Icon</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Wrench / Settings / PackageCheck"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://www.sanvimaritime.com/images/Service/SM1.jpg"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Short Summary Description</label>
                <textarea
                  rows="2"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief summary displayed on cards..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Full Description</label>
                <textarea
                  rows="4"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed service capabilities and description..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Key Features JSON</label>
                <textarea
                  rows="2"
                  value={formData.featuresJson}
                  onChange={(e) => setFormData({ ...formData, featuresJson: e.target.value })}
                  placeholder='["Global Delivery", "24/7 Emergency Support"]'
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 text-xs text-slate-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">{selectedService.title}</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-44 object-cover rounded-xl border border-slate-800"
            />
            <p className="text-slate-200">{selectedService.fullDescription}</p>
            {selectedService.featuresJson && (
              <div>
                <p className="font-semibold text-slate-400 mb-1">Service Features:</p>
                <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-cyan-300 font-mono text-[11px]">
                  {selectedService.featuresJson}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Service?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete <span className="text-slate-200 font-semibold">"{selectedService.title}"</span>?
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
