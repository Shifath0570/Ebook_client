'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserDeleteAlert } from './UserDeleteAlert';

const UserTable = ({ user, index }) => {
  const { _id, name, email, role: initialRole } = user;
  const [currentRole, setCurrentRole] = useState(initialRole || 'user');
  const [isUpdating, setIsUpdating] = useState(false);

  // Dynamic color matching style matching image reference badges
  const getRoleBadgeStyles = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case 'admin':
        return 'bg-amber-950/40 text-amber-500 border-amber-800/30';
      case 'writer':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30';
      default: // Normal standard subscriber user tier
        return 'bg-zinc-800 text-zinc-300 border-zinc-700/50';
    }
  };

  // Asynchronous operational handler for mutating role privileges 
  const handleRoleChange = async (e) => {
    const selectedRole = e.target.value;
    setCurrentRole(selectedRole);
    setIsUpdating(true);

    try {
      await fetch(`/api/users/update-role/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole })
      });
    } catch (err) {
      console.error("Failed synchronization request update on target scope role:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAccountTermination = () => {
    if (confirm(`CRITICAL WARNING: Terminate and delete user account profile "${name || email}"? This cannot be undone.`)) {
      console.log(`Executing deletion workflow sequence for client ID target: ${_id}`);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="hover:bg-zinc-800/30 transition-colors group border-b border-zinc-800/20"
    >
      {/* Column 1: Profile Block / Name */}
      <td className="py-4 px-4 sm:px-6 font-medium text-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-xs text-zinc-400 group-hover:border-zinc-600 transition-colors shrink-0">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="truncate max-w-[180px] sm:max-w-xs block font-semibold text-zinc-200" title={name}>
            {name || 'Unnamed Profile'}
          </span>
        </div>
      </td>

      {/* Column 2: User Email Details */}
      <td className="py-4 px-4 sm:px-6 text-zinc-400 text-sm truncate max-w-[200px]" title={email}>
        {email}
      </td>

      {/* Column 3: Privilege Authorization Badging */}
      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
        <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border tracking-wide uppercase min-w-[85px] text-center shadow-sm ${getRoleBadgeStyles(currentRole)}`}>
          {isUpdating ? 'Saving...' : currentRole}
        </span>
      </td>

      {/* Column 4: Interactive Administrative Tool Actions Layout */}
      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-3">
          
          {/* Privilege Mutation Controller dropdown menu */}
          <div className="relative inline-block">
            <select
              value={currentRole}
              onChange={handleRoleChange}
              disabled={isUpdating}
              className="bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 text-xs font-medium rounded-md px-2.5 py-1.5 border border-zinc-700/50 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all cursor-pointer disabled:opacity-50"
            >
              <option value="user">User</option>
              <option value="writer">Writer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Account Eviction Destructive Switch */}
          {/* <button
            onClick={handleAccountTermination}
            className="text-xs font-medium bg-rose-950/20 hover:bg-rose-950/50 text-rose-400 border border-rose-900/30 px-2.5 py-1.5 rounded-md transition-all active:scale-95"
            title="Permanently remove user"
          >
            Delete
          </button> */}
          <UserDeleteAlert userId={user._id}></UserDeleteAlert>

        </div>
      </td>
    </motion.tr>
  );
};

export default UserTable;