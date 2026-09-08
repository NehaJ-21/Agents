import React, { useState } from 'react';
import { PHARMACY_ORDERS } from '../../data/mockData';
import { PharmacyOrder } from '../../types';

export const OrderFulfillment: React.FC = () => {
  const [orders, setOrders] = useState<PharmacyOrder[]>(PHARMACY_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('GM-88412');
  const [activeStage, setActiveStage] = useState<'needs-rx' | 'ready-to-pack' | 'in-transit' | 'settled'>('needs-rx');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [verificationProtocol, setVerificationProtocol] = useState({
    patientIdentity: true,
    legalValidity: true,
    dosageParity: true,
    providerStatus: true
  });
  const [actionAlert, setActionAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleVerifyAndAccept = () => {
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'Ready to Pack', stage: 'ready-to-pack' } : o));
    setActionAlert({
      type: 'success',
      message: `Prescription for order #${selectedOrder.id} verified by licensed pharmacist! Order moved to Ready to Pack.`
    });
    setTimeout(() => setActionAlert(null), 5000);
  };

  const handleReject = () => {
    setActionAlert({
      type: 'error',
      message: `Order #${selectedOrder.id} prescription rejected. Statutory notice dispatched to patient ${selectedOrder.customerName}.`
    });
    setTimeout(() => setActionAlert(null), 5000);
  };

  const handlePrintLabel = () => {
    setActionAlert({
      type: 'success',
      message: `USPS Priority shipping label generated for #${selectedOrder.id}. Courier barcode printed.`
    });
    setTimeout(() => setActionAlert(null), 4000);
  };

  const filteredOrders = orders.filter(o => o.stage === activeStage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Pharmacy Header & Telemetry Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#00423d] text-[#76f5d9] flex items-center justify-center font-bold text-xl">
              <span className="material-symbols-outlined text-2xl">local_pharmacy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
                  Apex Care Pharmacy
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006b5a] text-xs font-bold border border-[#dce9ff]">
                  Store #NY-104 • Licensed Retailer
                </span>
              </div>
              <p className="text-xs text-[#6f7977] mt-0.5 font-mono">
                DEA: BP9082121 • NABP: 449102 • NPI: 1948201948 • 420 Broadway, Albany NY
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 divide-x divide-[#bfc9c6]/30 text-xs">
            <div className="pr-4">
              <span className="text-[#6f7977] block text-[11px]">Payout Balance</span>
              <span className="font-mono font-bold text-[#00423d] text-base">$14,840.50</span>
              <span className="text-[10px] text-[#006b5a] block">Settles Friday</span>
            </div>
            <div className="px-4">
              <span className="text-[#6f7977] block text-[11px]">SLA On-Time Dispatch</span>
              <span className="font-mono font-bold text-[#006b5a] text-base">98.2%</span>
              <span className="text-[10px] text-[#6f7977] block">Target: ≥95%</span>
            </div>
            <div className="pl-4">
              <span className="text-[#6f7977] block text-[11px]">Store Rating</span>
              <span className="font-bold text-[#0b1c30] text-base flex items-center gap-1">
                4.9 <span className="text-amber-500">★</span>
              </span>
              <span className="text-[10px] text-[#6f7977] block">1,240 Reviews</span>
            </div>
          </div>
        </div>

        {/* Pipeline Stages Navigation Pills */}
        <div className="flex items-center gap-2 border-t border-[#eff4ff] pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveStage('needs-rx')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeStage === 'needs-rx'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'bg-[#f8f9ff] text-[#3f4947] hover:bg-[#eff4ff]'
            }`}
          >
            <span>Needs Prescription Review</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeStage === 'needs-rx' ? 'bg-[#ba1a1a] text-white' : 'bg-[#ffdad6] text-[#93000a]'}`}>
              4
            </span>
          </button>

          <button
            onClick={() => setActiveStage('ready-to-pack')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeStage === 'ready-to-pack'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'bg-[#f8f9ff] text-[#3f4947] hover:bg-[#eff4ff]'
            }`}
          >
            <span>Ready to Pack & Ship</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#eff4ff] text-[#006b5a]">
              12
            </span>
          </button>

          <button
            onClick={() => setActiveStage('in-transit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeStage === 'in-transit'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'bg-[#f8f9ff] text-[#3f4947] hover:bg-[#eff4ff]'
            }`}
          >
            <span>In Transit / Dispatched</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#eff4ff] text-[#006b5a]">
              38
            </span>
          </button>

          <button
            onClick={() => setActiveStage('settled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeStage === 'settled'
                ? 'bg-[#00423d] text-white shadow-sm'
                : 'bg-[#f8f9ff] text-[#3f4947] hover:bg-[#eff4ff]'
            }`}
          >
            <span>Delivered & Settled</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#eff4ff] text-[#006b5a]">
              310
            </span>
          </button>
        </div>
      </div>

      {/* Action Notification */}
      {actionAlert && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2 ${
            actionAlert.type === 'success'
              ? 'bg-[#eff4ff] text-[#00423d] border border-[#76f5d9]'
              : 'bg-[#ffdad6] text-[#93000a] border border-[#ffb4ab]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">
              {actionAlert.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{actionAlert.message}</span>
          </div>
          <button onClick={() => setActionAlert(null)} className="text-xs font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main 3-Column Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (3 cols): Orders Queue */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
              Fulfillment Queue
            </h3>
            <span className="text-[11px] text-[#006b5a] font-semibold">{filteredOrders.length} Orders</span>
          </div>

          <div className="space-y-2.5">
            {filteredOrders.map((order) => {
              const isSelected = order.id === selectedOrderId;

              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#00423d] ring-2 ring-[#00423d]/20 shadow-md'
                      : 'bg-white border-[#bfc9c6]/40 hover:border-[#006b5a] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#006b5a]">#{order.id}</span>
                      <h4 className="text-xs font-bold text-[#0b1c30] mt-0.5">{order.medicine}</h4>
                      <p className="text-[11px] text-[#6f7977]">{order.strength} • {order.packageCount.split(' ')[0]} tabs</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00423d]">${order.price.toFixed(2)}</span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#eff4ff] flex items-center justify-between text-[11px]">
                    <span className="text-[#3f4947] font-medium">{order.customerName}</span>
                    <span className="text-[#6f7977]">{order.timeAgo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column (6 cols): Scanned Prescription Canvas View */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
            {/* Header with zoom & rotate controls */}
            <div className="p-4 bg-[#f8f9ff] border-b border-[#bfc9c6]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#006b5a]">document_scanner</span>
                <div>
                  <h3 className="text-xs font-bold text-[#0b1c30]">Scanned Prescription Canvas</h3>
                  <p className="text-[10px] text-[#6f7977] font-mono">{selectedOrder.rxDoc.filename} (300 DPI)</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
                  className="w-7 h-7 rounded-lg border border-[#bfc9c6] bg-white text-[#3f4947] flex items-center justify-center hover:bg-[#eff4ff]"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-sm">zoom_out</span>
                </button>
                <span className="text-[11px] font-mono px-1 text-[#3f4947]">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                  className="w-7 h-7 rounded-lg border border-[#bfc9c6] bg-white text-[#3f4947] flex items-center justify-center hover:bg-[#eff4ff]"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                </button>
                <button
                  onClick={() => setRotation((rotation + 90) % 360)}
                  className="w-7 h-7 rounded-lg border border-[#bfc9c6] bg-white text-[#3f4947] flex items-center justify-center hover:bg-[#eff4ff]"
                  title="Rotate 90°"
                >
                  <span className="material-symbols-outlined text-sm">rotate_right</span>
                </button>
              </div>
            </div>

            {/* Simulated High-Res Scanned Rx Pad Paper */}
            <div className="p-6 bg-[#eff4ff]/30 min-h-[380px] flex items-center justify-center overflow-hidden">
              <div
                style={{
                  transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease'
                }}
                className="w-full max-w-md bg-white border border-[#bfc9c6]/60 rounded-xl p-6 shadow-md font-serif text-[#0b1c30] space-y-4 select-none"
              >
                {/* Clinic Letterhead */}
                <div className="text-center border-b pb-3 border-dashed border-[#bfc9c6]">
                  <h2 className="font-bold text-sm text-[#00423d] uppercase tracking-wider font-sans">
                    {selectedOrder.rxDoc.clinic}
                  </h2>
                  <p className="text-[10px] text-[#6f7977] font-sans">
                    {selectedOrder.rxDoc.clinicAddress} • {selectedOrder.rxDoc.clinicTel}
                  </p>
                  <p className="text-[11px] font-bold text-[#0b1c30] font-sans mt-1">
                    {selectedOrder.rxDoc.doctorName}
                  </p>
                  <p className="text-[10px] text-[#6f7977] font-sans">
                    LIC: {selectedOrder.rxDoc.doctorLicense} • DEA: {selectedOrder.rxDoc.dea} • NPI: {selectedOrder.rxDoc.npi}
                  </p>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-2 text-xs font-sans border-b pb-2 border-dashed border-[#bfc9c6]">
                  <div>
                    <span className="text-[#6f7977] text-[10px]">PATIENT NAME:</span>
                    <p className="font-bold text-[#0b1c30]">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <span className="text-[#6f7977] text-[10px]">DATE PRESCRIBED:</span>
                    <p className="font-mono text-[#0b1c30]">{selectedOrder.rxDoc.prescribedDate}</p>
                  </div>
                </div>

                {/* The Rx Symbol & Drug Order */}
                <div className="space-y-2 py-2">
                  <span className="text-3xl font-extrabold text-[#00423d] leading-none block font-serif">℞</span>
                  <div className="pl-4 space-y-1">
                    <p className="font-bold text-sm tracking-tight text-[#0b1c30] font-sans">
                      {selectedOrder.medicine} {selectedOrder.strength}
                    </p>
                    <p className="text-xs italic text-[#3f4947]">
                      Sig: {selectedOrder.rxDoc.sig}
                    </p>
                    <div className="flex items-center justify-between text-xs font-sans pt-2">
                      <span><strong>Dispense:</strong> {selectedOrder.rxDoc.dispense}</span>
                      <span><strong>Refills:</strong> {selectedOrder.rxDoc.refills} Remaining</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Signature Block */}
                <div className="border-t pt-3 border-dashed border-[#bfc9c6] flex items-end justify-between">
                  <div className="text-[9px] font-sans text-[#6f7977]">
                    SECURITY TAMPER-PROOF WATERMARK: RX-VERIFIED-SEC-9921
                  </div>
                  <div className="text-right">
                    <span className="font-['Brush_Script_MT',cursive] text-lg text-[#00423d] block">
                      Sarah Jenkins, MD
                    </span>
                    <div className="w-32 border-b border-[#0b1c30] mt-0.5"></div>
                    <span className="text-[9px] font-sans text-[#6f7977]">Prescriber Signature</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pharmacist Statutory Protocol Checklist */}
            <div className="p-4 bg-white border-t border-[#bfc9c6]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00423d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">fact_check</span>
                  FR-FUL-01 Pharmacist Verification Protocol
                </span>
                <span className="text-[11px] text-[#006b5a] font-semibold">4 of 4 Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verificationProtocol.patientIdentity}
                    onChange={(e) => setVerificationProtocol({ ...verificationProtocol, patientIdentity: e.target.checked })}
                    className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <span>Patient Identity & DOB Match</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verificationProtocol.legalValidity}
                    onChange={(e) => setVerificationProtocol({ ...verificationProtocol, legalValidity: e.target.checked })}
                    className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <span>Legal Validity (&lt;1 yr valid)</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verificationProtocol.dosageParity}
                    onChange={(e) => setVerificationProtocol({ ...verificationProtocol, dosageParity: e.target.checked })}
                    className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <span>Dosage & Quantity Parity</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-[#f8f9ff] border border-[#eff4ff] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verificationProtocol.providerStatus}
                    onChange={(e) => setVerificationProtocol({ ...verificationProtocol, providerStatus: e.target.checked })}
                    className="rounded text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <span>NPI & Active DEA Status</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleReject}
                  className="px-3.5 py-2 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ffdad6] text-xs font-semibold transition-colors"
                >
                  Reject Prescription
                </button>
                <button
                  onClick={handleVerifyAndAccept}
                  className="px-4 py-2 rounded-xl bg-[#00423d] text-white hover:bg-[#006b5a] text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                  <span>Verify Prescription & Accept Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (3 cols): Packaging & Dispatch Station */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
              Packaging & Dispatch Station
            </h3>

            {/* Step 1: Shipping Label */}
            <div className="p-3.5 rounded-xl border border-[#bfc9c6]/40 bg-[#f8f9ff] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0b1c30]">
                <span>Step 1: Shipping Label</span>
                <span className="px-1.5 py-0.2 rounded bg-[#76f5d9] text-[#00423d] text-[10px]">USPS Tracked</span>
              </div>
              <p className="text-[11px] text-[#6f7977]">
                Destination: {selectedOrder.customerAddress}
              </p>
              <button
                onClick={handlePrintLabel}
                className="w-full py-2 bg-white border border-[#bfc9c6] hover:border-[#00423d] text-xs font-semibold rounded-lg text-[#00423d] flex items-center justify-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print Thermal Label</span>
              </button>
            </div>

            {/* Step 2: Medicine Bag Barcode */}
            <div className="p-3.5 rounded-xl border border-[#bfc9c6]/40 bg-[#f8f9ff] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0b1c30]">
                <span>Step 2: Bag Security Seal</span>
                <span className="text-[10px] font-mono text-[#006b5a]">SEAL-88412-NY</span>
              </div>
              {/* Simulated Barcode */}
              <div className="bg-white p-2 rounded border border-[#bfc9c6]/30 flex flex-col items-center">
                <div className="w-full h-8 flex justify-center items-center gap-[2px]">
                  {[4, 2, 6, 1, 5, 2, 7, 3, 2, 6, 4, 1, 5, 2, 7, 3, 4, 2, 5].map((h, i) => (
                    <div key={i} className="bg-black w-[3px]" style={{ height: `${h * 4 + 10}px` }}></div>
                  ))}
                </div>
                <span className="text-[9px] font-mono mt-1 text-[#6f7977]">SEAL-88412-NY-P99</span>
              </div>
            </div>

            {/* Step 3: Courier Handover */}
            <div className="p-3.5 rounded-xl border border-[#dce9ff] bg-[#eff4ff] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#00423d]">
                <span>Step 3: Courier Handover</span>
                <span className="text-[10px] text-[#006b5a]">Next Pickup: 11:30 AM</span>
              </div>
              <p className="text-[11px] text-[#3f4947]">
                USPS Priority Mail scheduled daily courier sweep.
              </p>
              <button
                onClick={() => {
                  setActionAlert({
                    type: 'success',
                    message: `Order #${selectedOrder.id} marked as Staged for Courier Handover.`
                  });
                }}
                className="w-full py-2 bg-[#00423d] text-white hover:bg-[#006b5a] text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                <span>Stage for Driver Pickup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
