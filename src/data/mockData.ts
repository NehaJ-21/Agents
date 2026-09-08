import { SellerApplicant, PharmacyOrder, CatalogAnomalyRow, CanonicalMedicine } from '../types';

export const APEX_CARE_APPLICANT: SellerApplicant = {
  id: 'KYC-2024-0988',
  name: 'Apex Care Pharmaceuticals LLC',
  registeredEntity: 'Apex Care Pharmaceuticals LLC',
  state: 'New York',
  stateCode: 'NY',
  licenseNumber: 'DL-NY-2024-8841',
  type: 'Tier-1 Retail Dispenser',
  status: 'Pending Inspection',
  queuePos: 1,
  submittedTime: '2 hours ago (14:32 EST)',
  trustIndex: 96,
  trustTier: 'Tier-1 (Optimal)',
  deaNumber: 'FA8940192',
  deaStatus: 'Active & Verified',
  pharmacistInCharge: {
    name: 'Dr. Marcus Vance, PharmD',
    license: 'NY-RPH-094182',
    degree: 'Columbia University Rx',
    nabpId: 'e-Profile #1049281',
    status: 'Verified (Disciplinary: Clean)'
  },
  facility: {
    address: '420 Broadway, Suite 400, Albany, NY 12207',
    coldChain: '2°C - 8°C Certified (NIST Calibrated)',
    verifiedPhotos: 4
  },
  riskClearance: {
    fdaSanctions: 'No entries found (Checked 14:33:02)',
    addressValidation: 'Commercial Zone (GIS Confirmed)',
    priceAnomalyIndex: 0.04
  },
  documents: {
    stateLicense: {
      name: 'NY_State_Board_License_ApexCare_2026.pdf',
      size: '2.4 MB',
      issued: 'Jan 15, 2024',
      expires: 'Jan 15, 2027',
      ocrMatch: 100,
      registryMatch: 'Active (Good Standing)'
    },
    picLicense: {
      degree: 'PharmD, Columbia University Rx',
      controlledAuth: 'Schedules II-V Authorized',
      status: 'Current / Active'
    },
    insurance: {
      title: 'MedPro Group #POL-884102-C',
      coverage: '$2,000,000 / $4,000,000 Agg.',
      underwriter: 'A++ (Superior)',
      endorsement: 'Platform Additional Insured Endorsement Attached',
      status: 'Valid thru Dec 2026'
    }
  }
};

export const SELLER_APPLICANTS_LIST: SellerApplicant[] = [
  APEX_CARE_APPLICANT,
  {
    id: 'KYC-2024-0987',
    name: 'MediSource Generic Lab Ltd',
    registeredEntity: 'MediSource Rx Wholesalers',
    state: 'New Jersey',
    stateCode: 'NJ',
    licenseNumber: 'MFG-NJ-9102',
    type: 'Licensed Repackager',
    status: 'In Review',
    queuePos: 2,
    submittedTime: '4 hours ago',
    trustIndex: 88,
    trustTier: 'Tier-2 (Compliant)',
    deaNumber: 'FB7712490',
    deaStatus: 'Active',
    pharmacistInCharge: {
      name: 'Dr. Evelyn Reed, RPh',
      license: 'NJ-RPH-334190',
      degree: 'Rutgers University',
      nabpId: 'e-Profile #2091884',
      status: 'Verified'
    },
    facility: {
      address: '100 Industrial Pkwy, Newark, NJ 07102',
      coldChain: 'Monitored (IoT Logged)',
      verifiedPhotos: 6
    },
    riskClearance: {
      fdaSanctions: 'Clear',
      addressValidation: 'Industrial Commercial Zone',
      priceAnomalyIndex: 0.12
    },
    documents: {
      stateLicense: {
        name: 'NJ_DeptHealth_License_2026.pdf',
        size: '1.8 MB',
        issued: 'Mar 10, 2023',
        expires: 'Mar 10, 2026',
        ocrMatch: 99,
        registryMatch: 'Active'
      },
      picLicense: {
        degree: 'BS Pharmacy, Rutgers',
        controlledAuth: 'Schedules II-V',
        status: 'Active'
      },
      insurance: {
        title: 'Chubb Pharma Risk #POL-99214',
        coverage: '$5,000,000 Agg.',
        underwriter: 'A+ (Excellent)',
        endorsement: 'Verified',
        status: 'Active'
      }
    }
  },
  {
    id: 'KYC-2024-0985',
    name: 'Sunlight Wellness Chemists',
    registeredEntity: 'Sunlight Health LLC',
    state: 'Pennsylvania',
    stateCode: 'PA',
    licenseNumber: 'DL-PA-4421',
    type: 'Community Retailer',
    status: 'Action Required',
    queuePos: 3,
    submittedTime: '1 day ago',
    trustIndex: 72,
    trustTier: 'Expiring Renewal Req.',
    deaNumber: 'FC3319028',
    deaStatus: 'Expires in 14 days',
    pharmacistInCharge: {
      name: 'Arthur Pendelton, PharmD',
      license: 'PA-RPH-190288',
      degree: 'Temple University',
      nabpId: 'e-Profile #9081231',
      status: 'Renewal Submitted'
    },
    facility: {
      address: '782 Market St, Philadelphia, PA 19106',
      coldChain: 'Ambient & Chilled Certified',
      verifiedPhotos: 3
    },
    riskClearance: {
      fdaSanctions: 'Clear',
      addressValidation: 'Commercial Verified',
      priceAnomalyIndex: 0.08
    },
    documents: {
      stateLicense: {
        name: 'PA_Board_Pharmacy_Renewal_Notice.pdf',
        size: '950 KB',
        issued: 'Nov 01, 2022',
        expires: 'Oct 31, 2024',
        ocrMatch: 98,
        registryMatch: 'Renewal Pending'
      },
      picLicense: {
        degree: 'PharmD, Temple',
        controlledAuth: 'Schedules II-IV',
        status: 'Active'
      },
      insurance: {
        title: 'Hartford Commercial Care #33819',
        coverage: '$1,000,000 Agg.',
        underwriter: 'A',
        endorsement: 'Pending endorsement signature',
        status: 'Action Required'
      }
    }
  },
  {
    id: 'KYC-2024-0982',
    name: 'BioEquiv Direct Corp',
    registeredEntity: 'BioEquiv Direct Logistics Inc.',
    state: 'Texas',
    stateCode: 'TX',
    licenseNumber: 'DIST-TX-1099',
    type: 'B2B Wholesale Dist.',
    status: 'Pending Inspection',
    queuePos: 4,
    submittedTime: '2 days ago',
    trustIndex: 91,
    trustTier: 'Tier-1 Optimal',
    deaNumber: 'FD9021882',
    deaStatus: 'Active',
    pharmacistInCharge: {
      name: 'Dr. Rebecca Chen, PharmD',
      license: 'TX-RPH-440192',
      degree: 'UT Austin Pharmacy',
      nabpId: 'e-Profile #5519283',
      status: 'Clean Disciplinary Record'
    },
    facility: {
      address: '2200 Gateway Blvd, Irving, TX 75063',
      coldChain: 'Pharma Grade Walk-in Coolers',
      verifiedPhotos: 8
    },
    riskClearance: {
      fdaSanctions: 'Clear',
      addressValidation: 'Enterprise Logistics Hub',
      priceAnomalyIndex: 0.02
    },
    documents: {
      stateLicense: {
        name: 'TX_DSHS_Wholesale_Distributor_2027.pdf',
        size: '3.1 MB',
        issued: 'Feb 20, 2024',
        expires: 'Feb 20, 2027',
        ocrMatch: 100,
        registryMatch: 'Active'
      },
      picLicense: {
        degree: 'PharmD, UT Austin',
        controlledAuth: 'Schedules II-V',
        status: 'Current'
      },
      insurance: {
        title: 'Travelers Casualty #TX-88301',
        coverage: '$5,000,000 Agg.',
        underwriter: 'A++',
        endorsement: 'Platform Insured Active',
        status: 'Active'
      }
    }
  }
];

export const PHARMACY_ORDERS: PharmacyOrder[] = [
  {
    id: 'GM-88412',
    timeAgo: '4m ago',
    placedDate: 'Today, 10:14 AM',
    status: 'Requires Rx',
    stage: 'needs-rx',
    medicine: 'Atorvastatin Calcium',
    genericFor: 'Generic for Lipitor®',
    strength: '20mg',
    packageCount: '90 Tablets (3-Month Supply)',
    customerName: 'Robert Chen',
    customerInitials: 'RC',
    customerAddress: '420 Park Ave S, Apt 9B, New York, NY 10016',
    price: 22.40,
    paymentMethod: 'HSA / FSA Card (ending 4821)',
    rxNumber: 'RX-99201-NY',
    rxDoc: {
      filename: 'prescription_rchen_atorv20_signed.pdf',
      clinic: 'Metropolitan Internal Medicine',
      clinicAddress: '450 Lexington Ave, New York, NY 10017',
      clinicTel: 'Tel: (212) 555-0199',
      doctorName: 'Dr. Sarah Jenkins, MD',
      doctorLicense: 'NY-MED-294012',
      dea: 'BJ4920194',
      npi: '1093820192',
      prescribedDate: '2026-09-02',
      validThrough: '2027-09-02',
      sig: 'Take 1 tablet daily by mouth with or without food at bedtime.',
      dispense: '90 Tablets',
      refills: 3
    }
  },
  {
    id: 'GM-88409',
    timeAgo: '18m ago',
    placedDate: 'Today, 10:00 AM',
    status: 'Requires Rx',
    stage: 'needs-rx',
    medicine: 'Metformin HCl ER',
    genericFor: 'Generic for Glucophage XR®',
    strength: '500mg',
    packageCount: '60 Tablets (1-Month Supply)',
    customerName: 'Elena Rostova',
    customerInitials: 'ER',
    customerAddress: '150 West 85th St, New York, NY 10024',
    price: 11.20,
    paymentMethod: 'Visa Debit (ending 1092)',
    rxNumber: 'RX-88419-NY',
    rxDoc: {
      filename: 'rx_rostova_metformin_er.pdf',
      clinic: 'Mount Sinai Endocrine Center',
      clinicAddress: '1 Gustave L. Levy Pl, New York, NY 10029',
      clinicTel: 'Tel: (212) 659-8555',
      doctorName: 'Dr. David Alpert, MD',
      doctorLicense: 'NY-MED-182901',
      dea: 'BA3392011',
      npi: '1249018239',
      prescribedDate: '2026-08-28',
      validThrough: '2027-08-28',
      sig: 'Take 1 tablet twice daily with meals.',
      dispense: '60 Extended Release Tablets',
      refills: 5
    }
  },
  {
    id: 'GM-88395',
    timeAgo: '42m ago',
    placedDate: 'Today, 09:36 AM',
    status: 'Ready to Pack',
    stage: 'ready-to-pack',
    medicine: 'Omeprazole DR',
    genericFor: 'Generic for Prilosec®',
    strength: '20mg',
    packageCount: '30 Delayed Release Capsules',
    customerName: 'Marcus Sterling',
    customerInitials: 'MS',
    customerAddress: '88 Franklin St, New York, NY 10013',
    price: 9.85,
    paymentMethod: 'Mastercard (ending 9410)',
    rxNumber: 'RX-77301-NY',
    rxDoc: {
      filename: 'rx_sterling_omeprazole.pdf',
      clinic: 'Chelsea Gastroenterology Associates',
      clinicAddress: '275 7th Ave, New York, NY 10001',
      clinicTel: 'Tel: (212) 555-8392',
      doctorName: 'Dr. Liam Kelly, MD',
      doctorLicense: 'NY-MED-993012',
      dea: 'BK9102938',
      npi: '1940291840',
      prescribedDate: '2026-09-01',
      validThrough: '2027-09-01',
      sig: 'Take 1 capsule every morning before breakfast.',
      dispense: '30 Capsules',
      refills: 2
    }
  },
  {
    id: 'GM-88380',
    timeAgo: '1h ago',
    placedDate: 'Today, 09:15 AM',
    status: 'Dispatched',
    stage: 'in-transit',
    medicine: 'Amoxicillin Trihydrate',
    genericFor: 'Generic for Amoxil®',
    strength: '500mg',
    packageCount: '30 Capsules (10-day Course)',
    customerName: 'Sophia Miller',
    customerInitials: 'SM',
    customerAddress: '310 East 70th St, New York, NY 10021',
    price: 7.95,
    paymentMethod: 'Apple Pay',
    rxNumber: 'RX-99104-NY',
    rxDoc: {
      filename: 'rx_miller_amox.pdf',
      clinic: 'CityMD Urgent Care Midtown',
      clinicAddress: '14 West 48th St, New York, NY 10020',
      clinicTel: 'Tel: (212) 555-0911',
      doctorName: 'Dr. Amy Wong, MD',
      doctorLicense: 'NY-MED-381920',
      dea: 'BW8910291',
      npi: '1490281920',
      prescribedDate: '2026-09-07',
      validThrough: '2026-10-07',
      sig: 'Take 1 capsule three times daily for 10 days.',
      dispense: '30 Capsules',
      refills: 0
    }
  }
];

export const CATALOG_ANOMALY_ROWS: CatalogAnomalyRow[] = [
  {
    rowNumber: 42,
    status: 'Price Anomaly',
    statusSeverity: 'error',
    statusPercent: '-74.5%',
    ndc: '00093-7154-98',
    medicine: 'Atorvastatin Calcium 20mg Tab (90 ct)',
    dosage: '20mg • 90 Tablets',
    wholesalePrice: 0.85,
    medianPrice: 3.30,
    diagnostic: 'Seller unit price is $0.009/pill vs catalog median $0.037/pill. Exceeds FR-CORE-05 threshold.',
    ruleCode: 'GUARD-PRICE-DEVIATION-LOW'
  },
  {
    rowNumber: 88,
    status: 'Invalid NDC Format',
    statusSeverity: 'warning',
    ndc: '43598-024',
    medicine: 'Omeprazole DR 20mg Cap (30 ct)',
    dosage: '20mg • 30 Capsules',
    wholesalePrice: 2.10,
    medianPrice: 2.45,
    diagnostic: 'NDC code contains only 8 digits (missing 2-digit package segment code). Rejected by FDA schema validator.',
    ruleCode: 'SCHEMA-NDC-10-DIGIT-FAIL'
  },
  {
    rowNumber: 105,
    status: 'Unmatched Formulation',
    statusSeverity: 'info',
    ndc: '68180-478-06',
    medicine: 'Cefuroxime Axetil "Forte" 500mg (20 ct)',
    dosage: '500mg • 20 Tabs',
    wholesalePrice: 12.00,
    medianPrice: 13.50,
    diagnostic: 'Unrecognized colloquial modifier "Forte" in formulation string. Needs canonical mapping to Oral Tablet.',
    ruleCode: 'CAT-NORM-MODIFIER-UNRESOLVED'
  },
  {
    rowNumber: 106,
    status: 'Valid & Mapped',
    statusSeverity: 'success',
    ndc: '00093-0145-01',
    medicine: 'Metformin HCl ER 500mg Tab (60 ct)',
    dosage: '500mg • 60 Tablets',
    wholesalePrice: 2.10,
    medianPrice: 2.25,
    diagnostic: 'Canonical match 100% (RxNorm CUI: 860975). Ingestion validated.',
    ruleCode: 'INGEST-CLEARED'
  },
  {
    rowNumber: 107,
    status: 'Valid & Mapped',
    statusSeverity: 'success',
    ndc: '00781-1506-10',
    medicine: 'Amoxicillin Trihydrate 500mg Cap (30 ct)',
    dosage: '500mg • 30 Capsules',
    wholesalePrice: 3.90,
    medianPrice: 4.10,
    diagnostic: 'Canonical match 100% (RxNorm CUI: 308189). Ingestion validated.',
    ruleCode: 'INGEST-CLEARED'
  }
];

export const CANONICAL_MEDICINES: CanonicalMedicine[] = [
  {
    id: 'MED-ATOR-20',
    name: 'Atorvastatin Calcium',
    strength: '20mg',
    form: 'Oral Tablet',
    bioequivalenceRef: 'Lipitor® (Pfizer)',
    brandBenchmark: 'Lipitor 20mg ($14.50 avg)',
    orangeBookRating: 'AB Rated (Therapeutically Equivalent)',
    ndc: '68180-478-06',
    category: 'Cardiovascular',
    lowestPrice: 1.20,
    brandMedianPrice: 14.50,
    savingsPercentage: 91.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJsB7wx9-J3A4Qc54Hx9jF7R6qzcHT2Kt0hIkL5yXirjnTST8lqLIOVuJnatpqB4jAnKSSNNR4BvQVXs8_u4JHrCxkHVMSLFo853X8IajIPZoqy5C8A_TsdhFt0LopTAqyJMHx1h7v42tG05229ID9WBLmv0NMBLhQYZHtfguCxvUL5DXSwEUnDKC4a1WqSGFjUlM9-LSEaD7kjDBCrMPEcNjIyjZkQS-ae-_HUGll-KDebO4ko783XA',
    listingsCount: 6,
    competingOffers: [
      {
        rank: 1,
        sellerId: 'S-104',
        sellerName: 'QuickPharma LLC',
        rating: 4.4,
        reviewsCount: 89,
        licenseNumber: 'NY-LIC-99014',
        deliverySpeed: 'Dispatched in 24h',
        stockStatus: 'In stock (2,400+ units)',
        price: 1.20,
        pillPrice: 0.04,
        isLowest: true,
        isHeld: true // Flagged in moderation
      },
      {
        rank: 2,
        sellerId: 'S-201',
        sellerName: 'Pioneer Health Rx',
        rating: 4.9,
        reviewsCount: 1420,
        licenseNumber: 'NJ-LIC-88192',
        deliverySpeed: 'Same-day courier available',
        stockStatus: 'In stock (850 units)',
        price: 13.10,
        pillPrice: 0.44,
        isTopPartner: true,
        sla: '99.4% On-Time'
      },
      {
        rank: 3,
        sellerId: 'S-104-APEX',
        sellerName: 'Apex Care Pharmacy',
        rating: 4.9,
        reviewsCount: 1240,
        licenseNumber: 'NY-LIC-8841',
        deliverySpeed: 'Next-day tracked delivery',
        stockStatus: 'In stock (1,100 units)',
        price: 14.25,
        pillPrice: 0.47,
        sla: '98.2% On-Time'
      },
      {
        rank: 4,
        sellerId: 'S-312',
        sellerName: 'OmniPharm Systems',
        rating: 4.7,
        reviewsCount: 650,
        licenseNumber: 'PA-LIC-4421',
        deliverySpeed: '2-3 business days',
        stockStatus: 'In stock (420 units)',
        price: 14.50,
        pillPrice: 0.48
      },
      {
        rank: 5,
        sellerId: 'S-405',
        sellerName: 'Prime Med Direct',
        rating: 4.6,
        reviewsCount: 310,
        licenseNumber: 'TX-LIC-9921',
        deliverySpeed: '3 business days',
        stockStatus: 'In stock (600 units)',
        price: 15.40,
        pillPrice: 0.51
      },
      {
        rank: 6,
        sellerId: 'S-520',
        sellerName: 'United Generic Supply',
        rating: 4.5,
        reviewsCount: 180,
        licenseNumber: 'CT-LIC-1120',
        deliverySpeed: '2-4 business days',
        stockStatus: 'In stock (190 units)',
        price: 16.80,
        pillPrice: 0.56
      }
    ]
  },
  {
    id: 'MED-METF-500',
    name: 'Metformin HCl ER',
    strength: '500mg',
    form: 'Extended Release Tablet',
    bioequivalenceRef: 'Glucophage XR® (Bristol-Myers)',
    brandBenchmark: 'Glucophage XR ($18.20 avg)',
    orangeBookRating: 'AB Rated (Therapeutically Equivalent)',
    ndc: '00093-0145-01',
    category: 'Diabetes',
    lowestPrice: 3.40,
    brandMedianPrice: 18.20,
    savingsPercentage: 81.3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC1ct1emMUdJh5sbHTfYoWIa0Zxja7GFdppyywparyUqN_Wb-dNQMIWqrR24i244oB3paGRpy8R2yJr46mMzQeLukEH4F_H_IQxj53SbiV4wPzdHa3NbnE8zI6IGSiLmrZdAwBbYEGmR7ZcaHuk0ucn5czlV2j53VZgNH1U4Q9Alzv11oJD7wvQUM7DNfKJPiYSskbEVajWFjYFRYKF8O2aGklebf_Y3YJqQIjSGq8-d-K4fZclq2Agw',
    listingsCount: 8,
    competingOffers: [
      {
        rank: 1,
        sellerId: 'S-104-APEX',
        sellerName: 'Apex Care Pharmacy',
        rating: 4.9,
        reviewsCount: 1240,
        licenseNumber: 'NY-LIC-8841',
        deliverySpeed: 'Next-day tracked delivery',
        stockStatus: 'In stock (3,500 units)',
        price: 3.40,
        pillPrice: 0.05,
        isLowest: true,
        sla: '98.2% On-Time'
      },
      {
        rank: 2,
        sellerId: 'S-201',
        sellerName: 'Pioneer Health Rx',
        rating: 4.9,
        reviewsCount: 1420,
        licenseNumber: 'NJ-LIC-88192',
        deliverySpeed: 'Same-day courier available',
        stockStatus: 'In stock (1,200 units)',
        price: 4.20,
        pillPrice: 0.07,
        isTopPartner: true
      },
      {
        rank: 3,
        sellerId: 'S-312',
        sellerName: 'OmniPharm Systems',
        rating: 4.7,
        reviewsCount: 650,
        licenseNumber: 'PA-LIC-4421',
        deliverySpeed: '2 business days',
        stockStatus: 'In stock (900 units)',
        price: 4.75,
        pillPrice: 0.08
      }
    ]
  },
  {
    id: 'MED-AMOX-500',
    name: 'Amoxicillin Trihydrate',
    strength: '500mg',
    form: 'Oral Capsule',
    bioequivalenceRef: 'Amoxil® (GSK)',
    brandBenchmark: 'Amoxil ($15.50 avg)',
    orangeBookRating: 'AB Rated (Therapeutically Equivalent)',
    ndc: '00781-1506-10',
    category: 'Antibiotics',
    lowestPrice: 4.95,
    brandMedianPrice: 15.50,
    savingsPercentage: 68.1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhgfcl9jkplUD1OB_2nPpppXWv-NvJk3s3kQu9HJArMZAlUBu-VYadatBaIq0WG4MHJwcuvMK6Wkv_l73bot0SiNFWEEdb5ua9hsxRHW7foaP_vpBPRumEpwYmfFmi_XGtuMdz9Y4nSYpb31JtWgNEVLeYq82-bMObjE13UbwXSSY2XT6YPMQIcCJdo9-AHd9Q1jPzbuOFTUU_0YwMuG1kkqVGAoGJAyHlbR22Iq_4pFpRmbIdYJ3Yg',
    listingsCount: 5,
    competingOffers: [
      {
        rank: 1,
        sellerId: 'S-201',
        sellerName: 'Pioneer Health Rx',
        rating: 4.9,
        reviewsCount: 1420,
        licenseNumber: 'NJ-LIC-88192',
        deliverySpeed: 'Same-day courier available',
        stockStatus: 'In stock (1,400 units)',
        price: 4.95,
        pillPrice: 0.16,
        isLowest: true,
        isTopPartner: true
      },
      {
        rank: 2,
        sellerId: 'S-104-APEX',
        sellerName: 'Apex Care Pharmacy',
        rating: 4.9,
        reviewsCount: 1240,
        licenseNumber: 'NY-LIC-8841',
        deliverySpeed: 'Next-day tracked delivery',
        stockStatus: 'In stock (820 units)',
        price: 5.50,
        pillPrice: 0.18
      }
    ]
  },
  {
    id: 'MED-OMEP-20',
    name: 'Omeprazole DR',
    strength: '20mg',
    form: 'Delayed-Release Capsule',
    bioequivalenceRef: 'Prilosec® (AstraZeneca)',
    brandBenchmark: 'Prilosec ($24.80 avg)',
    orangeBookRating: 'AB Rated (Therapeutically Equivalent)',
    ndc: '00093-7154-98',
    category: 'Gastrointestinal',
    lowestPrice: 5.80,
    brandMedianPrice: 24.80,
    savingsPercentage: 76.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4cnZjX-XXB1UiHv8Tnvxs8woEVHUMXznuvXciVEGUK8VGxp81L2leqqvl6bJ35RgWDpiUXMcjTxWixsfB45ZR75XzxyQ_lzgy4TRzJpSQbiBtF5OieXV_QQ01grVn4IyPOHA77qksfZ2Y9Cj0gM3cY-XrKD1eXQtLdBR9ighJfTJMuMOdJGQKjWlRFrBhBZNuN_vCffmvQB1x-EjOWUu8AHIBlyaM5PD2kPonxJ-Byiy_Cm4JV-mc6g',
    listingsCount: 7,
    competingOffers: [
      {
        rank: 1,
        sellerId: 'S-104-APEX',
        sellerName: 'Apex Care Pharmacy',
        rating: 4.9,
        reviewsCount: 1240,
        licenseNumber: 'NY-LIC-8841',
        deliverySpeed: 'Next-day tracked delivery',
        stockStatus: 'In stock (2,100 units)',
        price: 5.80,
        pillPrice: 0.19,
        isLowest: true
      }
    ]
  },
  {
    id: 'MED-LISIN-10',
    name: 'Lisinopril',
    strength: '10mg',
    form: 'Oral Tablet',
    bioequivalenceRef: 'Zestril® / Prinivil®',
    brandBenchmark: 'Zestril ($16.40 avg)',
    orangeBookRating: 'AB Rated',
    ndc: '00093-0210-01',
    category: 'Cardiovascular',
    lowestPrice: 2.10,
    brandMedianPrice: 16.40,
    savingsPercentage: 87.2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJsB7wx9-J3A4Qc54Hx9jF7R6qzcHT2Kt0hIkL5yXirjnTST8lqLIOVuJnatpqB4jAnKSSNNR4BvQVXs8_u4JHrCxkHVMSLFo853X8IajIPZoqy5C8A_TsdhFt0LopTAqyJMHx1h7v42tG05229ID9WBLmv0NMBLhQYZHtfguCxvUL5DXSwEUnDKC4a1WqSGFjUlM9-LSEaD7kjDBCrMPEcNjIyjZkQS-ae-_HUGll-KDebO4ko783XA',
    listingsCount: 9,
    competingOffers: [
      {
        rank: 1,
        sellerId: 'S-104-APEX',
        sellerName: 'Apex Care Pharmacy',
        rating: 4.9,
        reviewsCount: 1240,
        licenseNumber: 'NY-LIC-8841',
        deliverySpeed: 'Next-day tracked delivery',
        stockStatus: 'In stock (4,200 units)',
        price: 2.10,
        pillPrice: 0.07,
        isLowest: true
      }
    ]
  },
  {
    id: 'MED-SERT-50',
    name: 'Sertraline HCl',
    strength: '50mg',
    form: 'Film-Coated Tablet',
    bioequivalenceRef: 'Zoloft® (Pfizer)',
    brandBenchmark: 'Zoloft ($28.00 avg)',
    orangeBookRating: 'AB Rated',
    ndc: '00093-7182-01',
    category: 'Mental Health',
    lowestPrice: 3.80,
    brandMedianPrice: 28.00,
    savingsPercentage: 86.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC1ct1emMUdJh5sbHTfYoWIa0Zxja7GFdppyywparyUqN_Wb-dNQMIWqrR24i244oB3paGRpy8R2yJr46mMzQeLukEH4F_H_IQxj53SbiV4wPzdHa3NbnE8zI6IGSiLmrZdAwBbYEGmR7ZcaHuk0ucn5czlV2j53VZgNH1U4Q9Alzv11oJD7wvQUM7DNfKJPiYSskbEVajWFjYFRYKF8O2aGklebf_Y3YJqQIjSGq8-d-K4fZclq2Agw',
    listingsCount: 11,
    competingOffers: [
      {
        rank: 1,
        sellerId: 'S-201',
        sellerName: 'Pioneer Health Rx',
        rating: 4.9,
        reviewsCount: 1420,
        licenseNumber: 'NJ-LIC-88192',
        deliverySpeed: 'Same-day courier available',
        stockStatus: 'In stock (2,000 units)',
        price: 3.80,
        pillPrice: 0.12,
        isLowest: true
      }
    ]
  }
];

export const MOCK_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKSSx7IAeNxzVVUgT7dsQnmZxMR1Ynai0U5jLUs5gxAq8EzV33f6PCyBnapF2svT7moDn2WNySbSYDixt9uDm8s3sIqhlEtSKlNUU6R1XHt5fNa8DEbwZ0GKKvff4UdRlwWVYPDJZaBQI620OFNlm0PXYj71c_lt3di5R1MwwQDWFbtReq13tF4qOFmnzMZX_HnR9SODkhrZlCdoFrubWr50_zw-r3WxZP_P5-QWAaIqRmGl_rdRxs3Q';

export const MOCK_FACILITY_PHOTOS = [
  {
    title: 'Dispensary Compounding Area & Automated Dispenser',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6ZNEwKmJyZTHTA4qkRTOHhRR9qqiQd01oGDBqfdx3p6qD8bGP2Z-jl5W8LiNU9SVg0N2JTIdcMaINZtRVw4k1tIviLh55g7KWWrSZ8GPfdf1oISWyKY8ZxLLkjOmO2tka9VKU0doSva1SJsgZ8s0qUllAs30M4WWA_dWABY9qLZuVL9F5q20g9uK-1I9PVYPM3y5wwyKRblYvjH_0KrkT99bqquUpqk8uFHwHzG8eGaD91RCyPPoryw',
    badge: '3.8°C Monitored'
  },
  {
    title: 'Cold-Chain Storage Unit & Temp Logger (NIST Traceable)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAicGjCBfkgtwSZ9VXMBYy0Ag9SBHgsgXKNUy99-QQmA_cTaa_fxlO1zm6k0IKEfOPAp6_2sFuIUfNzFn1LJ4wRVnmVOApaRsOJyomDJczW3AO5R_SGckqj-n4nh1G86rsxT0cGUcXnIEkXAjcdGUjXRhCYI3xIkcAPQEK8dzKUEQ-my5X3FvmRhMxJwHUQHrGlZZ9QbdfOMWAd_WCDQqNbavkKoEUtHZv8y-H4WQolgTXe2QSxg73rmA',
    badge: 'Geotagged Albany NY'
  }
];
