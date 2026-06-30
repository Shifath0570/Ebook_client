
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { Card, Chip } from '@heroui/react';

const DashboardWriterPage = async () => {
  const user = await getUserSession();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 bg-black">
      {/* Cinematic ambient aura background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl">

          {/* Correct HeroUI v3 layout composition */}
          <Card.Content className="text-center space-y-6 p-0 flex flex-col items-center">

            {/* Status Indicator */}
            <div className="flex justify-center">
              <Chip
                variant="soft"
                color="secondary"
                size="sm"
                className="bg-violet-500/10 text-violet-400 font-semibold px-3 border border-violet-500/20"
              >
                ✦ {user?.role || 'Writer'} Console
              </Chip>
            </div>

            {/* Main Welcome Message */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100">
                Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-300 to-fuchsia-400">{user?.name || 'Author'}</span>
              </h1>
              <p className="text-zinc-400 max-w-sm mx-auto text-sm sm:text-base font-medium">
                The manuscript is loaded. Your workspace is synchronized and ready for creation.
              </p>
            </div>

            {/* Horizontal Separation */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

            {/* Navigation Prompt */}
            <div className="pt-2">
              <button
                className="font-bold text-sm rounded-xl px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-indigo-600/10 transition-all"
              >
                Open Studio
              </button>
            </div>

          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default DashboardWriterPage;