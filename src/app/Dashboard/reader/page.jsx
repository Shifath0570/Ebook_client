// import { getUserSession } from "@/lib/core/session";

// const ReaderPage =async () => {

//     const user = await getUserSession()


//     return (
//         <div>
//             <h2>WelCome Back {user?.role} {user?.name}</h2>
//         </div>
//     );
// };

// export default ReaderPage;


import { getUserSession } from "@/lib/core/session";
import React from 'react';
import { Card, Chip } from '@heroui/react';

const ReaderPage = async () => {
  const user = await getUserSession();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 bg-black">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        <Card className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl">
          
          {/* Using v3 Card.Content compound component instead of CardBody */}
          <Card.Content className="text-center space-y-6 p-0 flex flex-col items-center">
            
            {/* Role Badge */}
            <div className="flex justify-center">
              <Chip 
                variant="soft" 
                color="success" 
                size="sm"
                className="bg-emerald-500/10 text-emerald-400 font-medium px-3 border border-emerald-500/20"
              >
                ✦ {user?.role || 'Reader'} Realm
              </Chip>
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100">
                Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{user?.name || 'Explorer'}</span>
              </h1>
              <p className="text-zinc-400 max-w-sm mx-auto text-sm sm:text-base font-medium">
                Your library is updated. Ready to turn the next page in your collection?
              </p>
            </div>

            {/* Accent Divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

            {/* Quick Action button */}
            <div className="pt-2">
              <button 
                className="font-semibold text-sm rounded-xl px-5 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
              >
                Open Library
              </button>
            </div>

          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ReaderPage;