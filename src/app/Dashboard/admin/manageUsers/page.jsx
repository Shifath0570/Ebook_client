import React from 'react';
import UserTable from '@/app/components/dashboard/UserTable';
import { getUsers } from '@/lib/api/books';

const ManageUserPage = async () => {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-[#121212] text-white w-full px-4 sm:px-6 md:px-8 py-8 font-sans">
      <div className="w-full mx-auto max-w-[100%]">
        
        {/* Dashboard Title Header Block */}
        <div className="flex flex-row justify-between items-center mb-6 px-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
            Manage All Users
          </h2>
          <span className="text-xs text-zinc-400 font-medium bg-zinc-800/50 border border-zinc-800 px-3 py-1 rounded-full">
            Active Accounts: {users?.length || 0}
          </span>
        </div>

        {/* Responsive Outer Grid Container */}
        <div className="w-full bg-[#1c1c1e] border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            <table className="w-full min-w-[850px] text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-zinc-800/60 text-zinc-400 text-xs sm:text-sm font-medium tracking-wide bg-zinc-900/20">
                  <th className="py-5 px-4 sm:px-6 select-none">Account Name</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Email Address</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Current Role</th>
                  <th className="py-5 px-4 sm:px-6 text-right select-none">Management Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40">
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <UserTable 
                      key={user._id} 
                      user={user} 
                      index={index}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-sm text-zinc-500">
                      No matching user documents found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageUserPage;