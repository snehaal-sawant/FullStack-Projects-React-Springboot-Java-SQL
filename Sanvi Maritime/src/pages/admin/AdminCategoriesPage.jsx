import React, { useEffect, useState } from 'react';
import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory
} from '../../services/api';
import {
  FolderTree,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    icon: 'Engine',
    image: '',
    description: '',
  });

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    const res = await getAdminCategories();
    if (res && res.success && res.data) {
      setCategories(res.data);
    } else {
      setError(res?.error || 'Failed to fetch categories.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({
      id: '',
      name: '',
      slug: '',
      icon: 'Engine',
      image: 'https://www.sanvimaritime.com/images/Product/SM1.jpg',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat) => {
    setModalMode('edit');
    setSelectedCategory(cat);
    setFormData({
      id: cat.id || '',
      name: cat.name || '',
      slug: cat.slug || '',
      icon: cat.icon || 'Engine',
      image: cat.image || '',
      description: cat.description || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (cat) => {
    setSelectedCategory(cat);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      let res;
      if (modalMode === 'add') {
        res = await createAdminCategory(formData);
      } else {
        res = await updateAdminCategory(selectedCategory.id, formData);
      }

      if (res && res.success) {
        showNotification(`Category ${modalMode === 'add' ? 'created' : 'updated'} successfully!`);
        setIsModalOpen(false);
        fetchCategories();
      } else {
        setError(res?.error || 'Failed to save category.');
      }
    } catch (err) {
      setError('An error occurred while saving category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;
    setSubmitting(true);
    try {
      const res = await deleteAdminCategory(selectedCategory.id);
      if (res && res.success) {
        showNotification('Category deleted successfully!');
        setIsDeleteModalOpen(false);
        fetchCategories();
      } else {
        setError(res?.error || 'Failed to delete category.');
      }
    } catch (err) {
      setError('An error occurred while deleting category.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-cyan-400" />
            <span>Category Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Organize ship equipment and spare parts categories</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
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
            placeholder="Search category name or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">Loading categories...</p>
          </div>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={cat.image || 'https://www.sanvimaritime.com/images/Product/SM1.jpg'}
                  alt={cat.name}
                  className="w-14 h-14 object-cover rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0"
                  onError={(e) => { e.target.src = 'https://www.sanvimaritime.com/images/Product/SM1.jpg'; }}
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-sm text-white truncate">{cat.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono">ID: {cat.id}</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{cat.description || 'No description'}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Slug: /{cat.slug}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(cat)}
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
            <p className="text-sm">No categories found.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 text-xs text-slate-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {modalMode === 'add' ? 'Add New Category' : 'Edit Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-slate-300">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Main Engine & Spare Parts"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Category ID / Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value, id: e.target.value })}
                    placeholder="e.g. main-engine"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-300">Icon Name</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Engine / Zap / Wind"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://www.sanvimaritime.com/images/Product/SM1.jpg"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-300">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Category overview and components listed under it..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Category?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete <span className="text-slate-200 font-semibold">"{selectedCategory.name}"</span>?
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
