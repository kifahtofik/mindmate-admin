// import React from 'react';
// import { 
//   Box, Typography, Card, Grid, Stack, Chip, 
//   LinearProgress, Paper, Avatar
// } from "@mui/material";
// import { 
//   LineChart, Line, BarChart, Bar, XAxis, YAxis, 
//   CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, AreaChart, Area 
// } from 'recharts';
// import { 
//   Users, Activity, AlertTriangle, TrendingUp, 
//   Heart, MessageCircle, Shield, Zap, ArrowUpRight
// } from 'lucide-react';


// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Paper sx={{ p: 1.5, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: 2 }}>
//         <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontWeight: 600 }}>{label}</Typography>
//         <Typography variant="body2" sx={{ fontWeight: 800, color: payload[0].color }}>
//           {payload[0].value} {payload[0].name}
//         </Typography>
//       </Paper>
//     );
//   }
//   return null;
// };

// export function Dashboard() {
//   return (
//     <Box sx={{ 
//       p: { xs: 2, md: 5 }, 
//       bgcolor: '#f8fafc', 
//       minHeight: '100vh', 
//       fontFamily: '"Inter", sans-serif' 
//     }}>
    
//       {/* HEADER SECTION */}
//       <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 5 }}>
//         <Box>
//           <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
//             Mind Mate Dashboard
//           </Typography>
//         </Box>
//       </Stack>

//       <Grid container spacing={4}>
        
//         {/* STAT CARDS SECTION */}
//         {[
//           { title: 'Total Users', value: '2,847', color: '#3b82f6', icon: <Users />, trend: '+12.5%' },
//           { title: 'Active Now', value: '1,234', color: '#8b5cf6', icon: <Activity />, trend: '+3.2%' },
//           { title: 'Avg. Session', value: '8.4m', color: '#10b981', icon: <TrendingUp />, trend: '+0.4m' },
//           { title: 'Care Score', value: '98%', color: '#f59e0b', icon: <Heart />, trend: 'Stable' }
//         ].map((stat, i) => (
//           // LOGIC: Only show the first card (index 0)
//           i === 0 && (
//             <Grid item xs={12} sm={6} md={3} key={i}>
//               <Card sx={{ 
//                 p: 3, borderRadius: 5, border: '1px solid rgba(255,255,255,0.8)', 
//                 boxShadow: '0 10px 30px -5px rgba(0,0,0,0.04)',
//                 transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' }
//               }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <Box sx={{ 
//                     p: 1.5, borderRadius: 3, 
//                     background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}30 100%)`,
//                     color: stat.color 
//                   }}>
//                     {React.cloneElement(stat.icon, { size: 24 })}
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>{stat.title}</Typography>
//                     <Stack direction="row" alignItems="baseline" spacing={1}>
//                       <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>{stat.value}</Typography>
//                       <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>{stat.trend}</Typography>
//                     </Stack>
//                   </Box>
//                 </Stack>
//               </Card>
//             </Grid>
//           )
//         ))}

//         {/* LOGIC: Wrapping everything else in "false &&" hides it without deleting code */}
//         {false && (
//           <>
//             {/* MAIN CHART SECTION */}
//             <Grid item xs={12} md={8}>
//               <Card sx={{ p: 4, borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: 'none' }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
//                   <Box>
//                     <Typography variant="h6" sx={{ fontWeight: 800 }}>Engagement Dynamics</Typography>
//                     <Typography variant="body2" color="textSecondary">Daily sessions vs exercise completions</Typography>
//                   </Box>
//                   <Chip label="Live Updates" size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 700, px: 1 }} icon={<Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />} />
//                 </Stack>
//                 <Box sx={{ height: 350 }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={mockEngagementData}>
//                       <defs>
//                         <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
//                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                       <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
//                       <ChartTooltip content={<CustomTooltip />} />
//                       <Area type="monotone" name="sessions" dataKey="sessions" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" />
//                       <Area type="monotone" name="exercises" dataKey="exercises" stroke="#10b981" strokeWidth={3} fill="none" strokeDasharray="5 5" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </Card>
//             </Grid>

//             {/* SAFETY ALERTS */}
//             <Grid item xs={12} md={4}>
//               <Box sx={{ height: '100%' }}>
//                 <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Shield size={20} color="#dc2626" /> Security & Safety
//                 </Typography>
//                 <Stack spacing={2}>
//                   {mockAlerts.map((alert) => (
//                     <Paper key={alert.id} sx={{ 
//                       p: 2.5, borderRadius: 4, bgcolor: alert.type === 'high' ? '#fff1f2' : '#fffbeb', 
//                       border: 'none', position: 'relative', overflow: 'hidden'
//                     }}>
//                       <Box sx={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', bgcolor: alert.type === 'high' ? '#fb7185' : '#fbbf24' }} />
//                       <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//                         <Chip label={alert.type} size="small" sx={{ 
//                           height: 20, fontSize: '0.65rem', fontWeight: 900, 
//                           bgcolor: alert.type === 'high' ? '#fb7185' : '#fbbf24', color: '#fff' 
//                         }} />
//                         <Typography variant="caption" sx={{ color: '#64748b' }}>{alert.time}</Typography>
//                       </Stack>
//                       <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>{alert.message}</Typography>
//                       <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                         Action required for <span style={{ fontWeight: 800, color: '#334155' }}>{alert.userId}</span> <ArrowUpRight size={12}/>
//                       </Typography>
//                     </Paper>
//                   ))}
                  
//                   <Card sx={{ p: 3, borderRadius: 5, bgcolor: '#1e293b', color: '#fff', mt: 'auto' }}>
//                     <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>System Uptime</Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>99.98%</Typography>
//                     <LinearProgress variant="determinate" value={99.9} sx={{ 
//                       height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)',
//                       '& .MuiLinearProgress-bar': { bgcolor: '#10b981' }
//                     }} />
//                   </Card>
//                 </Stack>
//               </Box>
//             </Grid>
//           </>
//         )}

//       </Grid>
//     </Box>
//   );
// }

// export default Dashboard;