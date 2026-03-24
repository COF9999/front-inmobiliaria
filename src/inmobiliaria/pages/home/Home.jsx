import React from 'react';
import { LayoutGrid, TrendingUp, Users, Wallet, CreditCard } from 'lucide-react';

export const Home = () => {
  return (
    <div className="container-primary-home view-animation">
        <DashboardTemplate/>
    </div>
  )
}



const DashboardTemplate = () => {
  return (
    // Agregamos flex flex-col y gap-y-12 para separar las filas uniformemente
    <div className="min-h-screen p-4 md:p-8 font-sans text-slate-700 flex flex-col gap-y-12">
      
      {/* Header (Sin cambios) */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <LayoutGrid size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">DashBoard</h1>
      </div>

      {/* FILA 1: 4 Etiquetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="VALUE 1" value="$45,285" icon={<Wallet size={20}/>} color="border-t-blue-500" />
        <StatCard title="VALUE 2" value="2,845" icon={<Users size={20}/>} color="border-t-emerald-500" />
        <StatCard title="VALUE 3" value="1,200" icon={<TrendingUp size={20}/>} color="border-t-orange-500" />
        <StatCard title="VALUE 4" value="$12,400" icon={<CreditCard size={20}/>} color="border-t-red-500" />
      </div>

      {/* FILA 2: 3 Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="TBL-1" id="mainChart" />
        <ChartContainer title="TBL-2" id="donutChart" />
        <ChartContainer title="TBL-3" id="barChart" />
      </div>

      {/* FILA 3: 2 Tablas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TableContainer title="TBL-4" />
        <TableContainer title="TBL-5" />
      </div>
    </div>
  );
};

/* Ajuste en StatCard para que el color dinámico funcione */
const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-sm p-5 flex justify-between items-center border border-slate-100 border-t-4 ${color}`}>
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
    <div className="text-slate-400 bg-slate-50 p-2 rounded-lg">{icon}</div>
  </div>
);

/* Componente: Contenedor de Gráfico */
const ChartContainer = ({ title, id }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
    <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
      <span className="w-1 h-4 bg-indigo-500 rounded-full"></span> {title}
    </h3>
    <div className="relative h-64 w-full flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
       <span className="text-xs text-slate-400 font-mono">Canvas ID: {id}</span>
       {/* Aquí insertarías <canvas id={id}></canvas> */}
    </div>
  </div>
);

/* Componente: Tabla */
const TableContainer = ({ title }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-5 border-b border-slate-50 bg-slate-50/50">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
    </div>
    <div className="p-5 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100">
            <th className="pb-3 font-medium px-2">Referencia</th>
            <th className="pb-3 font-medium">Estado</th>
            <th className="pb-3 font-medium text-right">Fecha</th>
          </tr>
        </thead>
        <tbody className="text-slate-600">
          {[1, 2, 3].map((item) => (
            <tr key={item} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <td className="py-4 px-2 font-medium text-indigo-600">#TRX-00{item}</td>
              <td className="py-4">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">EXITOSO</span>
              </td>
              <td className="py-4 text-right text-slate-400">22 Mar, 2024</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);