"use client";

import React from 'react';
import { Card, Avatar } from "@heroui/react";
import { motion } from "framer-motion";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  // Derive structural text initials cleanly
  const initials = user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "FB";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Banner Decorative Layer */}
        <div className="h-32 w-full bg-gradient-to-r from-violet-600 via-indigo-700 to-indigo-950 relative" />

        {/* Profile Details Area */}
        <Card.Content className="px-6 pb-8 pt-0 relative flex flex-col items-center text-center">
          
          {/* HeroUI v3 Compound Avatar Configuration */}
          <div className="-mt-16 mb-4">
            <Avatar className="w-28 h-28 ring-4 ring-slate-950 rounded-full bg-slate-800 text-xl font-bold">
              {user.avatarUrl && (
                <Avatar.Image src={user.avatarUrl} alt={user.name} />
              )}
              <Avatar.Fallback delayMs={400}>{initials}</Avatar.Fallback>
            </Avatar>
          </div>

          {/* User Copy Context */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{user.name}</h2>
            <p className="text-sm text-slate-400 font-mono">{user.email}</p>
          </div>

          {/* Dynamic Role Badge */}
          <div className="mt-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              user.role === "author" 
                ? "bg-violet-500/10 text-violet-400 border-violet-500/20" 
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            }`}>
              {user.role}
            </span>
          </div>

          {/* Bio Description Element */}
          <p className="mt-6 text-sm text-slate-300 max-w-md leading-relaxed border-t border-slate-800/60 pt-6">
            {user.bio}
          </p>

          {/* Meta Information Footer Items */}
          <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800/60 text-left max-w-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Account Tier</span>
              <span className="text-xs text-slate-300 font-medium mt-0.5 block capitalize">Verified {user.role}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Joined Fable</span>
              <span className="text-xs text-slate-300 font-medium mt-0.5 block">
                {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recently"}
              </span>
            </div>
          </div>

        </Card.Content>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;