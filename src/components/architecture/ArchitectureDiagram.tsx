import React, { useState } from 'react';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  const layers = [
    {
      id: 1,
      title: '1. Client Layer',
      subtitle: 'Omnichannel consumer, clinical dispenser, and operational interfaces',
      color: '#00423d',
      items: [
        'Customer Web App (Next.js / React 19 SPA)',
        'Customer Mobile App (React Native iOS/Android)',
        'Pharmacy / Vendor Portal (Fulfillment & Rx Workbench)',
        'Admin Portal (Moderation & Catalog Guardrails)',
        'Super Admin Portal (KYC & Executive Telemetry)',
        '3rd Party API Clients (EHR, Health Plans, Wholesalers)'
      ]
    },
    {
      id: 2,
      title: '2. Edge & Ingress Layer',
      subtitle: 'Global routing, WAF protection, and low-latency API gateway mesh',
      color: '#006b5a',
      items: [
        'Global Anycast DNS (Route 53 / Cloudflare)',
        'CDN & Static Edge Caching (Cloudflare / CloudFront)',
        'Web Application Firewall (WAF) & OWASP Core Rules',
        'Ingress Controller (NGINX / AWS ALB)',
        'API Gateway (Kong / Envoy): JWT Validation, Tenant Resolution, Rate Limiting'
      ]
    },
    {
      id: 3,
      title: '3. Identity & Access Management (IAM)',
      subtitle: 'Multi-tenant RBAC, OAuth 2.0, and HIPAA compliance enforcement',
      color: '#0f5b54',
      items: [
        'Multi-Tenant Hierarchy: User → Tenant → Role → Granular Permissions',
        'Tenant Configuration, Subscription Tiers & Commission Models',
        'Cryptographic Token Engine (OIDC / JWT with Tenant Claim)',
        'Tenant Data Isolation: Strictly enforced schema & connection scoping'
      ]
    },
    {
      id: 4,
      title: '4. Application Layer (Modular Monolith / Services)',
      subtitle: 'Core healthcare domain engines and fulfillment state machines',
      color: '#00423d',
      items: [
        'User & Provider Management Service',
        'Medicine & Formulation Catalog Service (RxNorm / FDA NDC)',
        'Order & Fulfillment Engine (State Machine: Rx Review → Pack → Dispatch)',
        'Pricing & Anomaly Guardrail Service (FR-CORE-05 Algorithmic Median Check)',
        'Vendor & Pharmacy Management (DEA Verification & Cold-Chain Auditing)',
        'Payment & Escrow Service (Stripe Connect, HSA/FSA, Automated Settlements)',
        'Notifications & Alerts Service (SMS, Email, Push)',
        'Compliance & Audit Trail Ledger (Tamper-Proof Audit Logging)'
      ]
    },
    {
      id: 5,
      title: '5. Core Healthcare Business Data Flows',
      subtitle: 'End-to-end automated pipelines with programmatic checkpoints',
      color: '#006b5a',
      items: [
        'Flow A: Medicine Search → Canonical Matching → Real-Time Price Comparison',
        'Flow B: Consumer Checkout → Rx Document Submission → DEA Verification',
        'Flow C: Licensed Pharmacist Review → Digital Acceptance → Label Printing',
        'Flow D: Bulk Catalog Ingestion → Schema Normalization → Quarantine Guardrail'
      ]
    },
    {
      id: 6,
      title: '6. Database & Storage Architecture',
      subtitle: 'Hybrid multi-tenant topology with dedicated schema isolation',
      color: '#0f5b54',
      items: [
        'Platform-Level Shared DB (PostgreSQL): Tenants, Global Accounts, Billing',
        'Tenant-Level Isolated Schemas (PostgreSQL): Orders, Rx Records, Local Stock',
        'High-Throughput In-Memory Cache (Redis): Session, Price Indices, Rate Limiting',
        'Search & Anomaly Engine (OpenSearch): Full-text NDC and formulation lookup',
        'HIPAA Compliant Document Store (S3 / GCS with SSE-KMS): Encrypted Rx PDFs'
      ]
    },
    {
      id: 7,
      title: '7. External Clinical & Infrastructure Integrations',
      subtitle: 'Third-party clinical registries, logistics, and verification APIs',
      color: '#00423d',
      items: [
        'Payment Gateways: Stripe Connect, First Data, HSA/FSA Eligible Cards',
        'Clinical Registries: FDA Structured Product Labeling (SPL), NLM RxNorm, DEA Database',
        'Logistics & Couriers: USPS Priority Web Tools API, FedEx HealthCare, Local Couriers',
        'Communication: Twilio SMS, SendGrid Clinical Notification Engine',
        'Identity & GIS: State Pharmacy Board Automated OCR & Commercial GIS Zoning'
      ]
    },
    {
      id: 8,
      title: '8. Security, Observability & Deployment',
      subtitle: 'Zero-trust infrastructure running on Kubernetes with 99.98% SLA',
      color: '#006b5a',
      items: [
        'Container Orchestration: Kubernetes (EKS / GKE) with Horizontal Pod Autoscaling',
        'Security & Compliance: TLS 1.3 in-transit, AES-256 at-rest, SOC-2 & HIPAA Compliant',
        'Observability: OpenTelemetry Tracing, Prometheus Metrics & Grafana Dashboards',
        'Centralized Logging: ELK Stack with automated PagerDuty incident routing'
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">hub</span>
            SYSTEM ARCHITECTURE & CLOUD TOPOLOGY
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] tracking-tight">
            Multi-Tenant Healthcare Platform Architecture
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Comprehensive 8-tier reference architecture for GenericMed: Edge ingress, multi-tenant isolation, prescription compliance, and real-time pricing guardrails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-[#eff4ff] text-[#00423d] border border-[#dce9ff] rounded-xl text-xs font-semibold font-mono">
            TOPOLOGY: PROD-HYBRID-MESH
          </span>
        </div>
      </div>

      {/* Visual Architectural Map */}
      <div className="space-y-4">
        {layers.map((layer) => {
          const isExpanded = selectedLayer === layer.id;

          return (
            <div
              key={layer.id}
              onClick={() => setSelectedLayer(isExpanded ? null : layer.id)}
              className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden hover:border-[#00423d] transition-all cursor-pointer"
            >
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.id}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
                      {layer.title}
                    </h3>
                    <p className="text-xs text-[#6f7977]">{layer.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-xs font-semibold text-[#006b5a] bg-[#eff4ff] px-2.5 py-1 rounded-lg">
                    {layer.items.length} Subsystems
                  </span>
                  <span className="material-symbols-outlined text-[#6f7977] transition-transform duration-200">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {/* Subsystems List */}
              <div className="px-5 pb-5 pt-2 border-t border-[#eff4ff] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {layer.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#f8f9ff] rounded-xl border border-[#bfc9c6]/30 text-xs text-[#3f4947] flex items-start gap-2"
                  >
                    <span className="material-symbols-outlined text-sm text-[#006b5a] mt-0.5">check_circle</span>
                    <span className="font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
