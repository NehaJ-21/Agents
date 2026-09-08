import React from 'react';

export const NodeTopologyView: React.FC = () => {
  const nodes = [
    { name: 'us-east-1a (N. Virginia)', status: 'HEALTHY', latency: '12ms', cpu: '28%', tenants: 18 },
    { name: 'us-east-1b (N. Virginia)', status: 'HEALTHY', latency: '14ms', cpu: '34%', tenants: 24 },
    { name: 'us-west-2a (Oregon)', status: 'HEALTHY', latency: '38ms', cpu: '19%', tenants: 12 },
    { name: 'eu-central-1 (Frankfurt)', status: 'STANDBY', latency: '92ms', cpu: '8%', tenants: 2 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">lan</span>
            INFRASTRUCTURE / MULTI-TENANT NODE TOPOLOGY
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
            Multi-Tenant Node Topology & Health
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Real-time telemetry across Kubernetes clusters, tenant shard isolation, and database connection pooling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node) => (
          <div key={node.name} className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c30]">{node.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#76f5d9] text-[#00423d] text-[10px] font-bold">
                {node.status}
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] space-y-1 text-xs">
              <div className="flex justify-between text-[#6f7977]">
                <span>Edge Latency:</span>
                <span className="font-mono font-bold text-[#0b1c30]">{node.latency}</span>
              </div>
              <div className="flex justify-between text-[#6f7977]">
                <span>Cluster CPU Load:</span>
                <span className="font-mono font-bold text-[#006b5a]">{node.cpu}</span>
              </div>
              <div className="flex justify-between text-[#6f7977]">
                <span>Active Pharmacy Tenants:</span>
                <span className="font-mono font-bold text-[#0b1c30]">{node.tenants}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
