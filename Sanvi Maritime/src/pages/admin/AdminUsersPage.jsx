import React, { useEffect, useState } from 'react';
import { getAdminUsers, deleteAdminUser } from '../../services/api';
import {
  Users,
  Search,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Shield,
  Building2,
  Mail,
  Phone
} from 'lucide-react';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    const res = await getAdminUsers();
    if (res && res.success && res.data) {
      setUsers(res.data);
    } else {
      setError(res?.error || 'Failed to fetch registered user accounts.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    setSubmitting(true);
    try {
      const res = await deleteAdminUser(selectedUser.id);
      if (res && res.success) {
        showNotification('User account deleted successfully!');
        setIsDeleteModalOpen(false);
        fetchUsers();
      } else {
        setError(res?.error || 'Failed to delete user account.');
      }
    } catch (err) {
      setError('An error occurred while deleting user.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
    (u.company && u.company.toLowerCase().includes(search.toLowerCase())) ||
    (u.role && u.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Registered User Accounts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage system administrators and client accounts safely</p>
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

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name, email, company, or role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">Loading user accounts...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Full Name & Email</th>
                  <th className="px-4 py-3">Company & Contact</th>
                  <th className="px-4 py-3">Assigned Role</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-cyan-400 font-semibold">#{user.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-100">{user.name || 'N/A'}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-500" /> {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-slate-200">{user.company || 'Individual Client'}</div>
                      {user.phone && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-500" /> {user.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.role === 'ROLE_ADMIN' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                        'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {user.role !== 'ROLE_ADMIN' ? (
                        <button
                          onClick={() => handleOpenDeleteModal(user)}
                          title="Delete User Account"
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-600 italic">Protected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500">
            <p className="text-sm">No registered user accounts found.</p>
          </div>
        )}
      </div>

      {/* Delete User Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete User Account?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete user <span className="text-slate-200 font-semibold">"{selectedUser.email}"</span>?
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
