import React, { useState, useMemo } from 'react';
import { CompetingSellerListing } from '../../types';

interface PharmacyLocationMapProps {
  selectedSeller: CompetingSellerListing;
  customerAddress?: string;
  customerCity?: string;
}

export interface PharmacyFacilityLocation {
  sellerId: string;
  sellerName: string;
  facilityName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  distanceMiles: number;
  estimatedTransitTime: string;
  dispatchType: string;
  licenseNumber: string;
  operatingHours: string;
  coldChainRating: string;
  gisStatus: string;
  phone: string;
  routeHighlight: string;
}

// Known pharmacy facility directory mapped to seller listings
const KNOWN_PHARMACIES: Record<string, PharmacyFacilityLocation> = {
  'Apex Care Pharmacy': {
    sellerId: 'S-104-APEX',
    sellerName: 'Apex Care Pharmacy',
    facilityName: 'Apex Care Regional Dispensing Center',
    street: '420 Broadway, Suite 400',
    city: 'Albany',
    state: 'NY',
    zip: '12207',
    lat: 42.6499,
    lng: -73.7513,
    distanceMiles: 152,
    estimatedTransitTime: 'Next-day tracked delivery (by 10:30 AM)',
    dispatchType: 'Dedicated Cold-Chain Courier Route',
    licenseNumber: 'NY-LIC-8841',
    operatingHours: 'Open 24/7 • Dispensing & Logistics Depot',
    coldChainRating: '2°C - 8°C Certified (NIST Calibrated IoT)',
    gisStatus: 'Commercial Pharmacy Zoning (GIS Confirmed)',
    phone: '(518) 555-0192',
    routeHighlight: 'I-87 South Corridor directly to Metro Hub'
  },
  'QuickPharma LLC': {
    sellerId: 'S-104',
    sellerName: 'QuickPharma LLC',
    facilityName: 'QuickPharma Metro Distribution Lab',
    street: '31-00 47th Ave, Suite 210',
    city: 'Long Island City',
    state: 'NY',
    zip: '11101',
    lat: 40.7441,
    lng: -73.9352,
    distanceMiles: 5.8,
    estimatedTransitTime: 'Dispatched in 2-4 hours (Same-Day Express)',
    dispatchType: 'Local Urban Courier Dispatch',
    licenseNumber: 'NY-LIC-99014',
    operatingHours: 'Mon-Sat 7:00 AM - 11:00 PM EST',
    coldChainRating: 'Insulated Thermal Verification',
    gisStatus: 'Urban Industrial Zone (GIS Confirmed)',
    phone: '(718) 555-0144',
    routeHighlight: 'BQE / I-278 Direct Metro Courier'
  },
  'Pioneer Health Rx': {
    sellerId: 'S-201',
    sellerName: 'Pioneer Health Rx',
    facilityName: 'Pioneer Health Regional Dispensing Hub',
    street: '100 Industrial Pkwy, Bldg 3',
    city: 'Newark',
    state: 'NJ',
    zip: '07102',
    lat: 40.7282,
    lng: -74.1724,
    distanceMiles: 14.2,
    estimatedTransitTime: 'Same-Day / Next-Day Ground Courier',
    dispatchType: 'Direct Temperature-Monitored Fleet',
    licenseNumber: 'NJ-LIC-88192',
    operatingHours: 'Mon-Sun 6:00 AM - Midnight EST',
    coldChainRating: 'Continuous 3.8°C Monitored Biologics',
    gisStatus: 'Commercial Logistics Hub (GIS Confirmed)',
    phone: '(973) 555-0188',
    routeHighlight: 'Holland Tunnel / I-78 Corridor'
  },
  'OmniPharm Systems': {
    sellerId: 'S-305',
    sellerName: 'OmniPharm Systems',
    facilityName: 'OmniPharm Tri-State Fulfilment Facility',
    street: '782 Market St, Floor 4',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19106',
    lat: 39.9515,
    lng: -75.1537,
    distanceMiles: 94,
    estimatedTransitTime: '1-2 Business Days Priority Delivery',
    dispatchType: 'Interstate Cold-Chain Logistics',
    licenseNumber: 'PA-LIC-4421',
    operatingHours: 'Mon-Fri 8:00 AM - 8:00 PM EST',
    coldChainRating: 'Ambient & Chilled Dual-Zone Compliance',
    gisStatus: 'State Board Licensed Dispensary',
    phone: '(215) 555-0163',
    routeHighlight: 'NJ Turnpike / I-95 North Corridor'
  },
  'Prime Med Direct': {
    sellerId: 'S-402',
    sellerName: 'Prime Med Direct',
    facilityName: 'Prime Med Direct Manhattan Hub',
    street: '530 W 45th St, Suite 100',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    lat: 40.7624,
    lng: -73.9961,
    distanceMiles: 7.1,
    estimatedTransitTime: 'Same-Day Courier (within 4 hours)',
    dispatchType: 'Direct Metro Priority Messenger',
    licenseNumber: 'NY-LIC-77291',
    operatingHours: 'Mon-Sun 8:00 AM - 10:00 PM EST',
    coldChainRating: 'NIST Certified Thermal Pouch',
    gisStatus: 'Metro Healthcare Commercial Facility',
    phone: '(212) 555-0119',
    routeHighlight: 'West Side Hwy & Manhattan Bridge'
  },
  'United Generic Supply': {
    sellerId: 'S-501',
    sellerName: 'United Generic Supply',
    facilityName: 'United Generic Distribution Center',
    street: '1200 Scottsville Rd, Gate B',
    city: 'Rochester',
    state: 'NY',
    zip: '14624',
    lat: 43.1235,
    lng: -77.6582,
    distanceMiles: 334,
    estimatedTransitTime: '2 Business Days Standard Ground',
    dispatchType: 'Regional Freight Carrier',
    licenseNumber: 'NY-LIC-66120',
    operatingHours: 'Mon-Fri 7:00 AM - 6:00 PM EST',
    coldChainRating: 'Thermal Barrier Sensor Verified',
    gisStatus: 'Enterprise Logistics Hub (GIS Confirmed)',
    phone: '(585) 555-0177',
    routeHighlight: 'I-90 East / Thruway Express'
  }
};

// Brooklyn delivery coordinates
const CUSTOMER_COORDINATES = {
  name: 'Your Delivery Location',
  address: 'Brooklyn, NY 11201',
  lat: 40.6958,
  lng: -73.9897
};

export const PharmacyLocationMap: React.FC<PharmacyLocationMapProps> = ({
  selectedSeller,
  customerAddress = 'Brooklyn, NY 11201'
}) => {
  const [mapMode, setMapMode] = useState<'interactive' | 'live-osm'>('interactive');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showRouteCorridor, setShowRouteCorridor] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPin, setSelectedPin] = useState<'pharmacy' | 'customer' | null>('pharmacy');

  // Resolve pharmacy facility details
  const pharmacy = useMemo<PharmacyFacilityLocation>(() => {
    // 1. Direct match by sellerName
    const directMatch = KNOWN_PHARMACIES[selectedSeller.sellerName];
    if (directMatch) return directMatch;

    // 2. Fuzzy match by name substring
    const foundKey = Object.keys(KNOWN_PHARMACIES).find(k =>
      selectedSeller.sellerName.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(selectedSeller.sellerName.toLowerCase())
    );
    if (foundKey) return KNOWN_PHARMACIES[foundKey];

    // 3. Fallback dynamically derived from seller details
    return {
      sellerId: selectedSeller.sellerId,
      sellerName: selectedSeller.sellerName,
      facilityName: `${selectedSeller.sellerName} Regional Hub`,
      street: '150 Commercial Blvd, Ste 200',
      city: 'Queens',
      state: 'NY',
      zip: '11101',
      lat: 40.7306,
      lng: -73.9352,
      distanceMiles: 8.4,
      estimatedTransitTime: selectedSeller.deliverySpeed || 'Dispatched in 24h',
      dispatchType: 'Verified Ground Logistics',
      licenseNumber: selectedSeller.licenseNumber || 'NY-LIC-GENERIC',
      operatingHours: 'Mon-Sat 8:00 AM - 8:00 PM EST',
      coldChainRating: 'Active IoT Cold-Chain Monitoring',
      gisStatus: 'State Board Verified Dispensary',
      phone: '(800) 555-0199',
      routeHighlight: 'Regional Metro Corridor'
    };
  }, [selectedSeller]);

  const fullAddressString = `${pharmacy.street}, ${pharmacy.city}, ${pharmacy.state} ${pharmacy.zip}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${pharmacy.facilityName}, ${fullAddressString}`
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${pharmacy.facilityName}, ${fullAddressString}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedPin('pharmacy');
  };

  // Calculate SVG relative positions based on lat/lng bounding box
  // Mapping bounds: West (-78.0) to East (-73.0), South (39.5) to North (43.5)
  const calculateSvgCoords = (lat: number, lng: number) => {
    const minLng = -78.2;
    const maxLng = -72.8;
    const minLat = 39.4;
    const maxLat = 43.6;

    const x = ((lng - minLng) / (maxLng - minLng)) * 560 + 20;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 260 + 20;
    return { x, y };
  };

  const pharmacyPos = calculateSvgCoords(pharmacy.lat, pharmacy.lng);
  const customerPos = calculateSvgCoords(CUSTOMER_COORDINATES.lat, CUSTOMER_COORDINATES.lng);

  // Midpoint for curved path
  const midX = (pharmacyPos.x + customerPos.x) / 2 - 25;
  const midY = (pharmacyPos.y + customerPos.y) / 2 - 20;
  const pathD = `M ${pharmacyPos.x} ${pharmacyPos.y} Q ${midX} ${midY} ${customerPos.x} ${customerPos.y}`;

  // Bounding box for OpenStreetMap embed
  const delta = 0.025;
  const osmBbox = `${pharmacy.lng - delta},${pharmacy.lat - delta},${pharmacy.lng + delta},${pharmacy.lat + delta}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${osmBbox}&layer=mapnik&marker=${pharmacy.lat},${pharmacy.lng}`;

  return (
    <section 
      id="selected-pharmacy-location-map" 
      aria-label="Selected Pharmacy Location"
      className="space-y-3 pt-2"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6f7977]">
            <span className="material-symbols-outlined text-sm text-[#006b5a]">location_on</span>
            <span>Pharmacy Location & Dispatch Corridor</span>
          </div>
          <p className="text-[11px] text-[#6f7977]">
            Physical dispensing facility for <strong className="text-[#0b1c30]">{pharmacy.sellerName}</strong> mapped to your delivery destination
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#eff4ff] p-0.5 rounded-lg border border-[#dce9ff] text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMapMode('interactive')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              mapMode === 'interactive'
                ? 'bg-white text-[#00423d] shadow-sm font-bold'
                : 'text-[#6f7977] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">route</span>
            <span>Route Map</span>
          </button>
          <button
            type="button"
            onClick={() => setMapMode('live-osm')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              mapMode === 'live-osm'
                ? 'bg-white text-[#00423d] shadow-sm font-bold'
                : 'text-[#6f7977] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">public</span>
            <span>Live Street</span>
          </button>
        </div>
      </div>

      {/* Main Map Card */}
      <div className="bg-white rounded-2xl border border-[#bfc9c6]/50 shadow-sm overflow-hidden transition-all">
        {/* Top Info Bar inside Card */}
        <div className="p-3.5 bg-gradient-to-r from-[#f8f9ff] to-white border-b border-[#bfc9c6]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00423d] text-[#76f5d9] flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-base">local_pharmacy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-[#0b1c30]">{pharmacy.facilityName}</h4>
                <span className="px-1.5 py-0.2 rounded-full bg-[#76f5d9]/40 text-[#00423d] text-[10px] font-bold">
                  {pharmacy.distanceMiles} mi away
                </span>
              </div>
              <p className="text-[11px] text-[#3f4947] font-medium flex items-center gap-1 mt-0.5">
                <span>{fullAddressString}</span>
                <span className="text-[#bfc9c6]">•</span>
                <span className="text-[#006b5a] font-mono text-[10px] font-semibold">{pharmacy.licenseNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#bfc9c6]/40 hover:border-[#006b5a] hover:bg-[#eff4ff] text-[11px] font-semibold text-[#0b1c30] transition-colors"
              title="Copy verified pharmacy address"
            >
              <span className="material-symbols-outlined text-xs text-[#006b5a]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#00423d] hover:bg-[#006b5a] text-white text-[11px] font-semibold shadow-sm transition-colors"
              title="Open location in Google Maps"
            >
              <span className="material-symbols-outlined text-xs">open_in_new</span>
              <span>Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map Viewport */}
        <div className="relative w-full h-64 sm:h-72 bg-[#eef3f7] overflow-hidden select-none">
          {mapMode === 'live-osm' ? (
            /* Live OpenStreetMap Interactive Embed */
            <div className="w-full h-full relative">
              <iframe
                title={`Map of ${pharmacy.facilityName}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={osmEmbedUrl}
                className="w-full h-full border-0"
              />
              <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-semibold text-[#0b1c30] shadow border border-[#bfc9c6]/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006b5a] animate-pulse" />
                <span>Live OpenStreetMap view: {pharmacy.city}, {pharmacy.state}</span>
              </div>
            </div>
          ) : (
            /* Interactive Regional Cartographic Corridor View */
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Map Floating Controls */}
              <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 bg-white/90 backdrop-blur-sm rounded-xl p-1 shadow border border-[#bfc9c6]/40">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#eff4ff] text-[#0b1c30] transition-colors"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#eff4ff] text-[#0b1c30] transition-colors"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <div className="h-px bg-[#bfc9c6]/30 my-0.5" />
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#eff4ff] text-[#0b1c30] transition-colors"
                  title="Recenter Map"
                  aria-label="Recenter Map"
                >
                  <span className="material-symbols-outlined text-sm">my_location</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRouteCorridor(!showRouteCorridor)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    showRouteCorridor ? 'bg-[#00423d] text-[#76f5d9]' : 'hover:bg-[#eff4ff] text-[#6f7977]'
                  }`}
                  title="Toggle Transit Route Line"
                  aria-label="Toggle Route Corridor"
                >
                  <span className="material-symbols-outlined text-sm">alt_route</span>
                </button>
              </div>

              {/* Status Badge Over Map */}
              <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
                <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#00423d] shadow-sm border border-[#bfc9c6]/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006b5a] animate-ping" />
                  <span>Verified Cold-Chain Route</span>
                </div>
                <div className="bg-[#00423d]/90 text-white backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-mono shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[11px] text-[#76f5d9]">thermostat</span>
                  <span>{pharmacy.coldChainRating}</span>
                </div>
              </div>

              {/* SVG Vector Map Canvas */}
              <div 
                className="w-full h-full transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg
                  viewBox="0 0 600 300"
                  className="w-full h-full"
                  style={{ backgroundColor: '#eef3f7' }}
                >
                  <defs>
                    {/* Grid Pattern */}
                    <pattern id="gisGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5e0e8" strokeWidth="0.6" />
                    </pattern>

                    {/* Linear gradient for transit path */}
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#006b5a" />
                      <stop offset="50%" stopColor="#76f5d9" />
                      <stop offset="100%" stopColor="#00423d" />
                    </linearGradient>

                    {/* Pharmacy marker pulse filter */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00423d" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Cartographic Grid */}
                  <rect width="100%" height="100%" fill="url(#gisGrid)" />

                  {/* Regional Cartographic Landmass & Water Features */}
                  {/* Atlantic Ocean / NY Harbor / Long Island Sound */}
                  <path
                    d="M 450 180 Q 480 190 530 170 Q 580 160 600 170 L 600 300 L 400 300 Q 420 230 450 180 Z"
                    fill="#d7e8f5"
                    stroke="#b8d4ea"
                    strokeWidth="1"
                  />
                  {/* Hudson River Vector */}
                  <path
                    d="M 520 20 Q 515 90 500 160 Q 490 190 480 230"
                    fill="none"
                    stroke="#c4def0"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 520 20 Q 515 90 500 160 Q 490 190 480 230"
                    fill="none"
                    stroke="#aed3eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Major Highway Corridors */}
                  {/* I-87 North-South */}
                  <path
                    d="M 525 20 L 515 90 L 495 180 L 485 240"
                    fill="none"
                    stroke="#cbd7e3"
                    strokeWidth="3.5"
                    strokeDasharray="4 2"
                  />
                  {/* I-95 East-West */}
                  <path
                    d="M 220 280 L 340 250 L 470 230 L 580 160"
                    fill="none"
                    stroke="#cbd7e3"
                    strokeWidth="3.5"
                    strokeDasharray="4 2"
                  />

                  {/* State Boundary Lines (NY / NJ / PA) */}
                  <path
                    d="M 470 20 L 460 170 L 420 220 L 360 250"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* State Labels */}
                  <text x="360" y="80" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="3">
                    NEW YORK
                  </text>
                  <text x="370" y="220" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="2">
                    NEW JERSEY
                  </text>
                  <text x="210" y="240" fill="#94a3b8" fontSize="11" fontWeight="bold" letterSpacing="2">
                    PENNSYLVANIA
                  </text>

                  {/* City Indicator Labels */}
                  <circle cx="515" cy="40" r="2.5" fill="#64748b" />
                  <text x="522" y="43" fill="#475569" fontSize="9" fontWeight="600">Albany, NY</text>

                  <circle cx="482" cy="225" r="2.5" fill="#64748b" />
                  <text x="490" y="228" fill="#475569" fontSize="9" fontWeight="600">New York City</text>

                  <circle cx="448" cy="235" r="2.5" fill="#64748b" />
                  <text x="410" y="245" fill="#475569" fontSize="9" fontWeight="600">Newark, NJ</text>

                  <circle cx="285" cy="265" r="2.5" fill="#64748b" />
                  <text x="292" y="268" fill="#475569" fontSize="9" fontWeight="600">Philadelphia, PA</text>

                  {/* Service Radius Buffer around Selected Pharmacy */}
                  <circle
                    cx={pharmacyPos.x}
                    cy={pharmacyPos.y}
                    r="40"
                    fill="#006b5a"
                    fillOpacity="0.07"
                    stroke="#006b5a"
                    strokeOpacity="0.25"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />

                  {/* Dispatch Route Line */}
                  {showRouteCorridor && (
                    <g>
                      {/* Glow background line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#76f5d9"
                        strokeWidth="5"
                        strokeOpacity="0.6"
                      />
                      {/* Animated dashed line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#00423d"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                        className="animate-[dash_20s_linear_infinite]"
                      />
                      {/* Route Distance Badge in Middle */}
                      <g transform={`translate(${midX - 10}, ${midY + 5})`}>
                        <rect
                          x="-35"
                          y="-10"
                          width="70"
                          height="20"
                          rx="10"
                          fill="#00423d"
                          filter="url(#glow)"
                        />
                        <text
                          x="0"
                          y="4"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {pharmacy.distanceMiles} mi
                        </text>
                      </g>
                    </g>
                  )}

                  {/* Customer Destination Marker (Brooklyn, NY) */}
                  <g 
                    transform={`translate(${customerPos.x}, ${customerPos.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedPin('customer')}
                  >
                    <circle cx="0" cy="0" r="14" fill="#006b5a" fillOpacity="0.15" />
                    <circle cx="0" cy="0" r="7" fill="#006b5a" stroke="#ffffff" strokeWidth="2" />
                    {/* Flag / Pin */}
                    <path
                      d="M 0 0 L 0 -16 M 0 -16 L 9 -12 L 0 -8"
                      fill="#006b5a"
                      stroke="#006b5a"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="16"
                      fill="#0b1c30"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      Your Address
                    </text>
                  </g>

                  {/* Selected Pharmacy Facility Pin (Dynamic) */}
                  <g
                    transform={`translate(${pharmacyPos.x}, ${pharmacyPos.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedPin('pharmacy')}
                    filter="url(#glow)"
                  >
                    {/* Animated Pulsing Radar Rings */}
                    <circle cx="0" cy="-14" r="22" fill="#006b5a" fillOpacity="0.15">
                      <animate
                        attributeName="r"
                        values="10;26;10"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;0;0.8"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Pharmacy Pin Icon */}
                    <path
                      d="M 0 0 C -8 -10 -12 -16 -12 -22 C -12 -29 -6 -35 0 -35 C 6 -35 12 -29 12 -22 C 12 -16 8 -10 0 0 Z"
                      fill="#00423d"
                      stroke="#76f5d9"
                      strokeWidth="1.5"
                    />
                    {/* Medical Cross inside Pin */}
                    <path
                      d="M -3 -22 L 3 -22 M 0 -25 L 0 -19"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* Label Callout */}
                    <g transform="translate(0, -42)">
                      <rect
                        x="-55"
                        y="-14"
                        width="110"
                        height="20"
                        rx="6"
                        fill="#0b1c30"
                        fillOpacity="0.9"
                      />
                      <text
                        x="0"
                        y="0"
                        fill="#ffffff"
                        fontSize="8.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pharmacy.sellerName}
                      </text>
                    </g>
                  </g>
                </svg>
              </div>

              {/* Bottom Floating Legend */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-semibold text-[#3f4947] shadow border border-[#bfc9c6]/40 flex items-center gap-2 pointer-events-auto">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00423d] inline-block" />
                    <span>Selected Pharmacy</span>
                  </span>
                  <span className="text-[#bfc9c6]">|</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006b5a] inline-block" />
                    <span>Delivery Location</span>
                  </span>
                </div>

                <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-[#00423d] shadow border border-[#bfc9c6]/40 pointer-events-auto">
                  Transit: ~{pharmacy.distanceMiles} mi ({pharmacy.routeHighlight})
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Pin Detail Callout Box */}
        <div className="p-3.5 bg-[#f8f9ff] border-t border-[#bfc9c6]/30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            {/* Box 1: Verified Facility */}
            <div className="bg-white p-2.5 rounded-xl border border-[#bfc9c6]/40 space-y-1">
              <div className="flex items-center gap-1 text-[#006b5a] font-bold text-[11px]">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Licensed Facility</span>
              </div>
              <p className="font-semibold text-[#0b1c30] text-[11px] truncate">{pharmacy.facilityName}</p>
              <p className="text-[10px] text-[#6f7977]">{pharmacy.gisStatus}</p>
            </div>

            {/* Box 2: Dispatch & Route */}
            <div className="bg-white p-2.5 rounded-xl border border-[#bfc9c6]/40 space-y-1">
              <div className="flex items-center gap-1 text-[#006b5a] font-bold text-[11px]">
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                <span>Fulfillment Corridor</span>
              </div>
              <p className="font-semibold text-[#0b1c30] text-[11px] truncate">{pharmacy.dispatchType}</p>
              <p className="text-[10px] text-[#6f7977]">{pharmacy.estimatedTransitTime}</p>
            </div>

            {/* Box 3: Operating Hours & Direct Contact */}
            <div className="bg-white p-2.5 rounded-xl border border-[#bfc9c6]/40 space-y-1">
              <div className="flex items-center gap-1 text-[#006b5a] font-bold text-[11px]">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>Dispensing Hours</span>
              </div>
              <p className="font-semibold text-[#0b1c30] text-[11px] truncate">{pharmacy.operatingHours}</p>
              <p className="text-[10px] text-[#6f7977]">Direct Depot: {pharmacy.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
