import React, { useState } from 'react';
import { SELLER_APPLICANTS_LIST, MOCK_FACILITY_PHOTOS } from '../../data/mockData';
import { SellerApplicant } from '../../types';

export const SellerVerification: React.FC = () => {
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>(SELLER_APPLICANTS_LIST[0].id);
  const [activeTab, setActiveTab] = useState<'pending' | 'investigation' | 'approved' | 'rejected'>('pending');
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [activeDocModal, setActiveDocModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<string[]>([
    'Automated OCR cross-matched NY State Registry with 100% confidence score.',
    'GIS satellite mapping verified commercial pharmacy zoning at 420 Broadway, Albany NY.',
    'IoT temperature sensor readings confirm continuous 3.8°C cold-chain compliance for biologics/insulin.'
  ]);
  const [newNote, setNewNote] = useState('');
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);
  const [approvedSellers, setApprovedSellers] = useState<string[]>([]);

  const currentApplicant = SELLER_APPLICANTS_LIST.find((a) => a.id === selectedApplicantId) || SELLER_APPLICANTS_LIST[0];
  const isApproved = approvedSellers.includes(currentApplicant.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([`[${new Date().toLocaleTimeString()}] ${newNote.trim()}`, ...notes]);
    setNewNote('');
  };

  const handleApprove = () => {
    setApprovedSellers([...approvedSellers, currentApplicant.id]);
    setActionFeedback({
      type: 'success',
      message: `Successfully approved ${currentApplicant.name}! Digital credentials issued and catalog publishing activated.`
    });
    setTimeout(() => setActionFeedback(null), 6000);
  };

  const handleRequestDocs = () => {
    setActionFeedback({
      type: 'warning',
      message: `Statutory Request for Information (RFI) transmitted to ${currentApplicant.name}. Status updated to Action Required.`
    });
    setTimeout(() => setActionFeedback(null), 6000);
  };

  const handleReject = () => {
    setActionFeedback({
      type: 'error',
      message: `Applicant ${currentApplicant.name} rejected under DEA 21 CFR § 1301.71 compliance regulations.`
    });
    setTimeout(() => setActionFeedback(null), 6000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#bfc9c6]/30 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006b5a] mb-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            COMPLIANCE OPERATIONS / KYC GOVERNANCE ENGINE / FR-SELL-01/02/03
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] tracking-tight">
            Seller Verification & KYC Inspection
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4947] mt-1">
            Statutory credentialing, DEA registration validation, OCR state license verification, and cold-chain facility auditing.
          </p>
        </div>

        {/* Top Status Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-[#eff4ff] text-[#00423d] border border-[#dce9ff] rounded-xl text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
            <span>Active Case: <strong>{currentApplicant.id}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between animate-in fade-in slide-in-from-top-2 ${
            actionFeedback.type === 'success'
              ? 'bg-[#eff4ff] border-[#76f5d9] text-[#00423d]'
              : actionFeedback.type === 'warning'
              ? 'bg-[#fff8e1] border-[#ffe082] text-[#e65100]'
              : 'bg-[#ffdad6] border-[#ffb4ab] text-[#93000a]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <span className="material-symbols-outlined">
              {actionFeedback.type === 'success' ? 'check_circle' : actionFeedback.type === 'warning' ? 'error' : 'cancel'}
            </span>
            <span>{actionFeedback.message}</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="text-xs font-bold hover:opacity-75">
            Dismiss
          </button>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'pending'
              ? 'bg-[#00423d] text-white shadow-sm'
              : 'bg-white text-[#3f4947] border border-[#bfc9c6]/40 hover:bg-[#eff4ff]'
          }`}
        >
          Pending Inspection (7)
        </button>
        <button
          onClick={() => setActiveTab('investigation')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'investigation'
              ? 'bg-[#00423d] text-white shadow-sm'
              : 'bg-white text-[#3f4947] border border-[#bfc9c6]/40 hover:bg-[#eff4ff]'
          }`}
        >
          Under Investigation (2)
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'approved'
              ? 'bg-[#00423d] text-white shadow-sm'
              : 'bg-white text-[#3f4947] border border-[#bfc9c6]/40 hover:bg-[#eff4ff]'
          }`}
        >
          Approved Sellers ({42 + approvedSellers.length})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'rejected'
              ? 'bg-[#00423d] text-white shadow-sm'
              : 'bg-white text-[#3f4947] border border-[#bfc9c6]/40 hover:bg-[#eff4ff]'
          }`}
        >
          Rejected / Revoked (5)
        </button>
      </div>

      {/* Main Split Grid: Left Queue, Right Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Priority Applicant Queue */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
              Priority Verification Queue
            </h3>
            <span className="text-[11px] text-[#006b5a] font-semibold">Ordered by SLA Risk</span>
          </div>

          <div className="space-y-2.5">
            {SELLER_APPLICANTS_LIST.map((applicant) => {
              const selected = applicant.id === selectedApplicantId;
              const currentlyApproved = approvedSellers.includes(applicant.id);

              return (
                <div
                  key={applicant.id}
                  onClick={() => setSelectedApplicantId(applicant.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selected
                      ? 'bg-white border-[#00423d] ring-2 ring-[#00423d]/20 shadow-md'
                      : 'bg-white border-[#bfc9c6]/40 hover:border-[#006b5a] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#0b1c30]">{applicant.name}</span>
                        {currentlyApproved && (
                          <span className="material-symbols-outlined text-sm text-[#006b5a]">check_circle</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6f7977] font-mono mt-0.5">
                        {applicant.licenseNumber} • {applicant.stateCode}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentlyApproved
                          ? 'bg-[#76f5d9] text-[#00423d]'
                          : applicant.status === 'Action Required'
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : 'bg-[#eff4ff] text-[#006b5a]'
                      }`}
                    >
                      {currentlyApproved ? 'Approved' : applicant.status}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#eff4ff] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1 text-[#3f4947]">
                      <span className="material-symbols-outlined text-sm text-[#006b5a]">verified</span>
                      <span>Trust: <strong className="text-[#0b1c30]">{applicant.trustIndex}/100</strong></span>
                    </div>
                    <span className="text-[#6f7977]">{applicant.submittedTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Inspection Dossier */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dossier Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#bfc9c6]/30">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#006b5a] text-xs font-mono font-bold">
                    {currentApplicant.id}
                  </span>
                  <span className="text-xs font-semibold text-[#6f7977]">
                    {currentApplicant.type}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] mt-1">
                  {currentApplicant.name}
                </h2>
                <p className="text-xs text-[#6f7977] mt-0.5">
                  Registered Entity: <strong className="text-[#0b1c30]">{currentApplicant.registeredEntity}</strong> • License #{currentApplicant.licenseNumber}
                </p>
              </div>

              {/* Trust Index Radial Gauge Display */}
              <div className="flex items-center gap-3 bg-[#f8f9ff] p-3 rounded-xl border border-[#bfc9c6]/30">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#eff4ff]"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#006b5a]"
                      strokeDasharray={`${currentApplicant.trustIndex}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-sm font-extrabold text-[#0b1c30]">{currentApplicant.trustIndex}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[11px] text-[#6f7977] uppercase font-bold">Trust Score</span>
                  <span className="text-xs font-bold text-[#006b5a]">{currentApplicant.trustTier}</span>
                </div>
              </div>
            </div>

            {/* Credential Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#eff4ff]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] block">
                  DEA Registration
                </span>
                <span className="text-sm font-mono font-bold text-[#0b1c30] mt-1 block">
                  {currentApplicant.deaNumber}
                </span>
                <span className="text-[11px] font-semibold text-[#006b5a] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {currentApplicant.deaStatus}
                </span>
              </div>

              <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#eff4ff]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] block">
                  Pharmacist-in-Charge (PIC)
                </span>
                <span className="text-sm font-bold text-[#0b1c30] mt-1 block truncate">
                  {currentApplicant.pharmacistInCharge.name}
                </span>
                <span className="text-[11px] text-[#6f7977] block">
                  {currentApplicant.pharmacistInCharge.license}
                </span>
              </div>

              <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#eff4ff]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] block">
                  Facility Cold-Chain
                </span>
                <span className="text-xs font-bold text-[#006b5a] mt-1 block">
                  {currentApplicant.facility.coldChain}
                </span>
                <span className="text-[11px] text-[#6f7977] block">
                  {currentApplicant.facility.verifiedPhotos} Geotagged Inspections
                </span>
              </div>
            </div>

            {/* Automated Risk & Sanctions Clearance */}
            <div className="p-4 rounded-xl bg-[#eff4ff]/60 border border-[#dce9ff] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#00423d]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">shield</span>
                  Automated Statutory Risk & Sanctions Clearance
                </span>
                <span className="text-[#006b5a]">Cleared 100%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[#6f7977] text-[11px] block">FDA & OIG Sanctions:</span>
                  <span className="font-semibold text-[#0b1c30]">{currentApplicant.riskClearance.fdaSanctions}</span>
                </div>
                <div>
                  <span className="text-[#6f7977] text-[11px] block">Address Zoning:</span>
                  <span className="font-semibold text-[#0b1c30]">{currentApplicant.riskClearance.addressValidation}</span>
                </div>
                <div>
                  <span className="text-[#6f7977] text-[11px] block">Price Anomaly Index:</span>
                  <span className="font-semibold text-[#006b5a]">{currentApplicant.riskClearance.priceAnomalyIndex} (Low Risk)</span>
                </div>
              </div>
            </div>

            {/* Document Verification Portfolio */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
                Document Verification Portfolio & OCR Records
              </h3>

              <div className="space-y-2.5">
                {/* State License Document */}
                <div className="p-3.5 rounded-xl border border-[#bfc9c6]/40 bg-white hover:border-[#006b5a] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1c30]">
                        State Board of Pharmacy Dispensing License
                      </h4>
                      <p className="text-[11px] text-[#6f7977]">
                        {currentApplicant.documents.stateLicense.name} • {currentApplicant.documents.stateLicense.size}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-semibold text-[#006b5a]">
                        <span className="bg-[#76f5d9]/60 px-1.5 py-0.2 rounded text-[#00423d]">
                          {currentApplicant.documents.stateLicense.ocrMatch}% OCR Match
                        </span>
                        <span>Expires: {currentApplicant.documents.stateLicense.expires}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveDocModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-[#bfc9c6] hover:border-[#00423d] hover:bg-[#eff4ff] text-xs font-semibold text-[#00423d] flex items-center gap-1 self-start sm:self-center"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>View OCR PDF</span>
                  </button>
                </div>

                {/* PIC License Record */}
                <div className="p-3.5 rounded-xl border border-[#bfc9c6]/40 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-xl">medical_services</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1c30]">
                        Pharmacist-in-Charge Credentials & Controlled Substances Auth
                      </h4>
                      <p className="text-[11px] text-[#6f7977]">
                        {currentApplicant.documents.picLicense.degree} • {currentApplicant.documents.picLicense.controlledAuth}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006b5a] bg-[#eff4ff] px-2.5 py-1 rounded-lg">
                    API Cleared
                  </span>
                </div>

                {/* Commercial Liability & Malpractice Insurance */}
                <div className="p-3.5 rounded-xl border border-[#bfc9c6]/40 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#eff4ff] text-[#006b5a] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-xl">policy</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b1c30]">
                        Commercial General Liability & Pharmacy Malpractice
                      </h4>
                      <p className="text-[11px] text-[#6f7977]">
                        {currentApplicant.documents.insurance.title} • {currentApplicant.documents.insurance.coverage}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006b5a] bg-[#eff4ff] px-2.5 py-1 rounded-lg">
                    Active Thru Dec 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Storage & Physical Premises Real Photos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
                  Storage & Physical Premises Geotagged Audits
                </h3>
                <span className="text-[11px] text-[#006b5a] font-semibold">4 Verified High-Res Photos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_FACILITY_PHOTOS.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setActivePhotoModal(photo.url)}
                    className="group relative rounded-xl overflow-hidden border border-[#bfc9c6]/40 cursor-pointer shadow-sm hover:shadow-md transition-all"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#006b5a] text-white w-max mb-1">
                        {photo.badge}
                      </span>
                      <p className="text-xs font-semibold leading-tight">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Audit Log & Internal Notes */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
                Compliance Audit Log & Internal Inspector Notes
              </h3>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record an inspection note or statutory compliance remark..."
                  className="flex-1 px-3 py-2 bg-[#f8f9ff] rounded-xl border border-[#bfc9c6]/60 text-xs text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b5a]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00423d] text-white rounded-xl text-xs font-semibold hover:bg-[#006b5a] transition-colors"
                >
                  Add Note
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {notes.map((note, index) => (
                  <div key={index} className="p-2.5 bg-[#f8f9ff] rounded-lg border border-[#eff4ff] text-xs text-[#3f4947] flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#006b5a] mt-0.5">comment</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Adjudication Action Controls */}
            <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#00423d] block">
                  Compliance Officer Adjudication (FR-SELL-03)
                </span>
                <p className="text-[11px] text-[#6f7977]">
                  Final approval enables automated catalog ingestion and live order routing for this seller.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleReject}
                  className="px-3.5 py-2 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] text-xs font-semibold transition-colors"
                >
                  Reject Seller
                </button>
                <button
                  onClick={handleRequestDocs}
                  className="px-3.5 py-2 rounded-xl border border-[#bfc9c6] bg-white text-[#3f4947] hover:bg-[#f8f9ff] text-xs font-semibold transition-colors"
                >
                  Request Docs (RFI)
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 rounded-xl bg-[#00423d] text-white hover:bg-[#006b5a] text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>{isApproved ? 'Approved & Certified' : 'Approve & Enable Catalog'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OCR PDF Modal Simulation */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">State Board License Verification</h3>
                <p className="text-xs text-[#6f7977] font-mono">NY_State_Board_License_ApexCare_2026.pdf</p>
              </div>
              <button
                onClick={() => setActiveDocModal(false)}
                className="w-8 h-8 rounded-full bg-[#f8f9ff] text-[#3f4947] flex items-center justify-center hover:bg-[#eff4ff]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-4 bg-[#f8f9ff] rounded-xl border border-[#bfc9c6]/40 font-mono text-xs space-y-2">
              <div className="text-center font-bold text-sm text-[#00423d] border-b pb-2">
                STATE OF NEW YORK • DEPARTMENT OF EDUCATION • OFFICE OF THE PROFESSIONS
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>Entity: Apex Care Pharmaceuticals LLC</div>
                <div>License #: DL-NY-2024-8841</div>
                <div>Status: ACTIVE (GOOD STANDING)</div>
                <div>Issued: 01/15/2024</div>
                <div>Expires: 01/15/2027</div>
                <div>Classification: Community Retail Pharmacy</div>
              </div>
              <div className="pt-2 text-[11px] text-[#006b5a] font-bold">
                ✓ Cryptographic Watermark Verified: 0x8F9A102948CBA1
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveDocModal(false)}
                className="px-4 py-2 bg-[#00423d] text-white text-xs font-semibold rounded-xl"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activePhotoModal && (
        <div 
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full">
            <img
              src={activePhotoModal}
              alt="Enlarged inspection audit"
              className="w-full rounded-2xl max-h-[85vh] object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
