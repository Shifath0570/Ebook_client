"use client"
import React, { useState } from 'react';
import { Card, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const INITIAL_METRICS = {
  totalUsers: 124500,
  totalWriters: 8200,
  totalEbooksSold: 45320,
  totalRevenue: 679800,
};

const monthlySalesData = [
  { month: 'Jan', sales: 4200 },
  { month: 'Feb', sales: 5100 },
  { month: 'Mar', sales: 6800 },
  { month: 'Apr', sales: 7200 },
  { month: 'May', sales: 10400 },
  { month: 'Jun', sales: 11620 },
];

const genreData = [
  { name: 'Sci-Fi / Fantasy', value: 18128 },
  { name: 'Mystery / Thriller', value: 11330 },
  { name: 'Romance', value: 9064 },
  { name: 'Non-Fiction', value: 6798 },
];

const COLORS = ['#6366f1', '#a855f7', '#f59e0b', '#10b981'];

const AdminHomePage = () => {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  const cardConfig = [
    { title: 'Total Users', value: metrics.totalUsers.toLocaleString(), color: 'text-blue-400', change: '+12%' },
    { title: 'Total Writers', value: metrics.totalWriters.toLocaleString(), color: 'text-purple-400', change: '+5%' },
    { title: 'Total eBooks Sold', value: metrics.totalEbooksSold.toLocaleString(), color: 'text-amber-400', change: '+18%' },
    { title: 'Total Revenue', value: `$${metrics.totalRevenue.toLocaleString()}`, color: 'text-emerald-400', change: '+22%' },
  ];

  const handleRefresh = async () => {
    console.log('Syncing data framework...');
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 text-zinc-50 sm:p-10">
      <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fable Admin Console</h1>
          <p className="text-zinc-400">Real-time platform telemetry overview and commercial metrics.</p>
        </div>
        <Button onClick={handleRefresh} color="primary" variant="solid" className="font-medium">
          Refresh Analytics
        </Button>
      </header>

      {/* Analytics Summary Cards Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardConfig.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-md">
              <Card.Header className="flex flex-row items-center justify-between p-0 pb-2">
                <Card.Title className="text-sm font-medium text-zinc-400">{card.title}</Card.Title>
                <span className="rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                  {card.change}
                </span>
              </Card.Header>
              {/* FIXED: Changed Card.Body to HeroUI v3 specification Card.Content */}
              <Card.Content className="p-0 pt-4">
                <span className={`text-3xl font-bold tracking-tight ${card.color}`}>
                  {card.value}
                </span>
                <p className="mt-1 text-xs text-zinc-500">vs historical baseline target</p>
              </Card.Content>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Visual Analytics Segment - Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Sales Performance Bar Chart */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border border-zinc-800 bg-zinc-900/40 p-6 h-[400px]">
            <Card.Header className="p-0 mb-4 flex flex-col items-start gap-1">
              <Card.Title className="text-lg font-semibold text-zinc-200">Monthly Sales Velocity</Card.Title>
              <Card.Description className="text-xs text-zinc-400">Ebook unit volume distribution trajectories</Card.Description>
            </Card.Header>
            {/* FIXED: Wrapped custom tracking body inside valid Card.Content layout container */}
            <Card.Content className="w-full h-full pb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#f4f4f5' }}
                  />
                  <Bar dataKey="sales" name="Units Sold" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>
        </motion.div>

        {/* Ebooks By Genre Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border border-zinc-800 bg-zinc-900/40 p-6 h-[400px]">
            <Card.Header className="p-0 mb-2 flex flex-col items-start gap-1">
              <Card.Title className="text-lg font-semibold text-zinc-200">Market Shares by Genre</Card.Title>
              <Card.Description className="text-xs text-zinc-400">Total volume categorical categorization</Card.Description>
            </Card.Header>
            {/* FIXED: Wrapped chart viewport inside Card.Content container block layout split */}
            <Card.Content className="w-full h-full flex items-center justify-center pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#f4f4f5' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    iconType="circle" 
                    wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHomePage;