export type PortalMode = 'super-admin' | 'vendor' | 'customer' | 'architecture';

export type AdminView = 
  | 'overview-and-kpis'
  | 'seller-verification-and-kyc'
  | 'catalog-and-price-anomalies'
  | 'disputes-and-support'
  | 'audit-trail'
  | 'multi-tenant-config';

export type VendorView = 
  | 'order-fulfillment-and-rx'
  | 'inventory-and-pricing'
  | 'inventory-and-bulk-upload'
  | 'payouts-and-settlement';

export type CustomerView = 
  | 'search-and-compare'
  | 'medicine-detail'
  | 'cart-and-checkout'
  | 'order-tracking'
  | 'my-prescriptions';

export interface SellerApplicant {
  id: string;
  name: string;
  registeredEntity: string;
  state: string;
  stateCode: string;
  licenseNumber: string;
  type: string;
  status: 'Pending Inspection' | 'In Review' | 'Action Required' | 'Approved' | 'Rejected';
  queuePos: number;
  submittedTime: string;
  trustIndex: number;
  trustTier: string;
  deaNumber: string;
  deaStatus: string;
  pharmacistInCharge: {
    name: string;
    license: string;
    degree: string;
    nabpId: string;
    status: string;
  };
  facility: {
    address: string;
    coldChain: string;
    verifiedPhotos: number;
  };
  riskClearance: {
    fdaSanctions: string;
    addressValidation: string;
    priceAnomalyIndex: number;
  };
  documents: {
    stateLicense: {
      name: string;
      size: string;
      issued: string;
      expires: string;
      ocrMatch: number;
      registryMatch: string;
    };
    picLicense: {
      degree: string;
      controlledAuth: string;
      status: string;
    };
    insurance: {
      title: string;
      coverage: string;
      underwriter: string;
      endorsement: string;
      status: string;
    };
  };
}

export interface PharmacyOrder {
  id: string;
  timeAgo: string;
  placedDate: string;
  status: 'Requires Rx' | 'OTC Auto-Approved' | 'Ready to Pack' | 'Dispatched' | 'Delivered';
  stage: 'needs-rx' | 'ready-to-pack' | 'in-transit' | 'settled';
  medicine: string;
  genericFor: string;
  strength: string;
  packageCount: string;
  customerName: string;
  customerInitials: string;
  customerAddress: string;
  price: number;
  paymentMethod: string;
  rxNumber: string;
  rxDoc: {
    filename: string;
    clinic: string;
    clinicAddress: string;
    clinicTel: string;
    doctorName: string;
    doctorLicense: string;
    dea: string;
    npi: string;
    prescribedDate: string;
    validThrough: string;
    sig: string;
    dispense: string;
    refills: number;
  };
}

export interface CatalogAnomalyRow {
  rowNumber: number;
  status: 'Price Anomaly' | 'Invalid NDC Format' | 'Unmatched Formulation' | 'Valid & Mapped';
  statusSeverity: 'error' | 'warning' | 'info' | 'success';
  statusPercent?: string;
  ndc: string;
  medicine: string;
  dosage: string;
  wholesalePrice: number;
  medianPrice: number;
  diagnostic: string;
  ruleCode: string;
}

export interface CompetingSellerListing {
  rank: number;
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewsCount: number;
  licenseNumber: string;
  deliverySpeed: string;
  stockStatus: string;
  price: number;
  pillPrice: number;
  isLowest?: boolean;
  isTopPartner?: boolean;
  sla?: string;
  isHeld?: boolean;
}

export interface CanonicalMedicine {
  id: string;
  name: string;
  strength: string;
  form: string;
  bioequivalenceRef: string;
  brandBenchmark: string;
  orangeBookRating: string;
  ndc: string;
  category: string;
  lowestPrice: number;
  brandMedianPrice: number;
  savingsPercentage: number;
  image: string;
  listingsCount: number;
  competingOffers: CompetingSellerListing[];
}

export type UserRole = 'super-admin' | 'vendor' | 'customer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  organization?: string;
  licenseNumber?: string;
  deaNumber?: string;
  deliveryAddress?: string;
  phone?: string;
  joinedDate: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: string;
  licenseNumber?: string;
  deaNumber?: string;
  deliveryAddress?: string;
  phone?: string;
}
