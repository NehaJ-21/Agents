import React, { useState } from 'react';
import { CANONICAL_MEDICINES } from '../../data/mockData';
import { CanonicalMedicine, CompetingSellerListing } from '../../types';
import { PharmacyLocationMap } from './PharmacyLocationMap';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

interface CustomerAppProps {
  isMobileDeviceView: boolean;
  onToggleMobileDeviceView: () => void;
}

export const CustomerApp: React.FC<CustomerAppProps> = ({
  isMobileDeviceView,
  onToggleMobileDeviceView,
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentScreen, setCurrentScreen] = useState<'search' | 'detail' | 'cart' | 'order-success'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMedicine, setSelectedMedicine] = useState<CanonicalMedicine>(CANONICAL_MEDICINES[0]);
  const [selectedSeller, setSelectedSeller] = useState<CompetingSellerListing>(CANONICAL_MEDICINES[0].competingOffers[0]);
  const [packSize, setPackSize] = useState<'30' | '90'>('30');
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const [consentChecked, setConsentChecked] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState<'usps' | 'sameday'>('usps');
  const [paymentMethod, setPaymentMethod] = useState<'hsa' | 'card' | 'apple'>('hsa');

  const categories = ['All', 'Cardiovascular', 'Diabetes', 'Antibiotics', 'Mental Health', 'Gastrointestinal'];

  const filteredMedicines = CANONICAL_MEDICINES.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.bioequivalenceRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.ndc.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const basePrice = selectedSeller ? selectedSeller.price : selectedMedicine.lowestPrice;
  const unitMultiplier = packSize === '90' ? 2.5 : 1;
  const itemPrice = basePrice * unitMultiplier;
  const subtotal = itemPrice * cartQuantity;
  const deliveryFee = deliveryMethod === 'sameday' ? 8.99 : 3.99;
  const total = subtotal + deliveryFee;
  const brandEstimate = selectedMedicine.brandMedianPrice * unitMultiplier * cartQuantity;
  const totalSaved = Math.max(0, brandEstimate - subtotal);

  const handleSelectMedicine = (med: CanonicalMedicine) => {
    setSelectedMedicine(med);
    setSelectedSeller(med.competingOffers[0]);
    setCurrentScreen('detail');
  };

  const handleAddToCart = () => {
    setCurrentScreen('cart');
  };

  const handlePlaceOrder = () => {
    setCurrentScreen('order-success');
  };

  // The actual Customer App UI (Shared between Mobile Device Frame and Desktop view)
  const appContent = (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-full font-['Inter',sans-serif]">
      {/* Customer Mobile/App Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#bfc9c6]/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentScreen === 'cart') setCurrentScreen('detail');
                else if (currentScreen === 'detail') setCurrentScreen('search');
                else if (currentScreen === 'order-success') setCurrentScreen('search');
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#eff4ff] text-[#0b1c30] ${
                currentScreen === 'search' ? 'invisible' : ''
              }`}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-[#6f7977]">
              <span className="material-symbols-outlined text-base text-[#006b5a]">location_on</span>
              <span>Deliver to:</span>
              <strong className="text-[#0b1c30] truncate max-w-[130px] sm:max-w-[200px]">
                {currentUser?.deliveryAddress || 'Brooklyn, NY 11201'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isAuthenticated && currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-xl hover:bg-[#eff4ff] text-xs text-[#0b1c30]"
                title="Account Profile"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-[#006b5a]"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#00423d] text-[#76f5d9] text-[10px] font-bold flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </span>
                )}
                <span className="text-[11px] font-semibold text-[#0b1c30] hidden sm:inline truncate max-w-[80px]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#006b5a] hover:bg-[#dce9ff] text-[11px] font-bold transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => setCurrentScreen('cart')}
              className="relative p-2 rounded-full hover:bg-[#eff4ff] text-[#0b1c30]"
              title="View Cart"
            >
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              {cartQuantity > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#006b5a] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Global Search Bar (Only shown on Search screen) */}
        {currentScreen === 'search' && (
          <div className="mt-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search generic, brand (Lipitor), or NDC..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#eff4ff] rounded-2xl border border-[#dce9ff] text-xs font-medium text-[#0b1c30] placeholder-[#6f7977] focus:outline-none focus:ring-2 focus:ring-[#006b5a] focus:bg-white transition-all shadow-inner"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-[#006b5a]">
              search
            </span>
            <button
              onClick={() => setSearchQuery('Atorvastatin')}
              className="material-symbols-outlined absolute right-3 top-2.5 text-lg text-[#6f7977] hover:text-[#006b5a]"
              title="Barcode Scan Simulation"
            >
              barcode_scanner
            </button>
          </div>
        )}
      </div>

      {/* Screen 1: Search & Compare Marketplace */}
      {currentScreen === 'search' && (
        <div className="p-4 space-y-4 max-w-4xl mx-auto pb-16">
          {/* Generic Savings Guarantee Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00423d] to-[#0f5b54] text-white shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#76f5d9]">verified</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#76f5d9]">
                Generic Savings Guarantee
              </span>
            </div>
            <h3 className="text-base font-bold font-['Plus_Jakarta_Sans']">
              Save up to 85% on verified bioequivalent generics
            </h3>
            <p className="text-xs text-white/80">
              Every pharmacy on GenericMed is licensed, DEA verified, and audited for chemical bioequivalence (FDA Orange Book AB Rated).
            </p>
          </div>

          {/* Therapeutic Categories Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] px-1">
              Therapeutic Categories
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#00423d] text-white shadow-sm'
                      : 'bg-white text-[#3f4947] border border-[#bfc9c6]/40 hover:bg-[#eff4ff]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Refill Searches Cards */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977] px-1">
              Popular Generic Refills
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div 
                onClick={() => handleSelectMedicine(CANONICAL_MEDICINES[0])}
                className="p-3 bg-white rounded-xl border border-[#bfc9c6]/40 hover:border-[#006b5a] cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">Atorvastatin 20mg</p>
                  <p className="text-[10px] text-[#6f7977]">Generic for Lipitor®</p>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#76f5d9] text-[#00423d]">
                  Save 91%
                </span>
              </div>

              <div 
                onClick={() => handleSelectMedicine(CANONICAL_MEDICINES[1])}
                className="p-3 bg-white rounded-xl border border-[#bfc9c6]/40 hover:border-[#006b5a] cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">Metformin ER 500mg</p>
                  <p className="text-[10px] text-[#6f7977]">Generic for Glucophage®</p>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#76f5d9] text-[#00423d]">
                  Save 81%
                </span>
              </div>

              <div 
                onClick={() => handleSelectMedicine(CANONICAL_MEDICINES[2])}
                className="p-3 bg-white rounded-xl border border-[#bfc9c6]/40 hover:border-[#006b5a] cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#0b1c30]">Amoxicillin 500mg</p>
                  <p className="text-[10px] text-[#6f7977]">Generic for Amoxil®</p>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#76f5d9] text-[#00423d]">
                  Save 68%
                </span>
              </div>
            </div>
          </div>

          {/* Available Generic Matches List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#0b1c30]">
                Available Generic Matches ({filteredMedicines.length})
              </span>
              <span className="text-[11px] text-[#006b5a] font-semibold">Sorted by Lowest Price</span>
            </div>

            <div className="space-y-3">
              {filteredMedicines.map((med) => (
                <div
                  key={med.id}
                  onClick={() => handleSelectMedicine(med)}
                  className="p-4 bg-white rounded-2xl border border-[#bfc9c6]/40 hover:border-[#006b5a] hover:shadow-md cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#bfc9c6]/30 bg-[#eff4ff] flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
                          {med.name} {med.strength}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#006b5a] text-[10px] font-bold">
                          {med.orangeBookRating.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-[#3f4947] mt-0.5">
                        {med.form} • {med.bioequivalenceRef}
                      </p>
                      <p className="text-[11px] text-[#6f7977] font-mono mt-0.5">
                        NDC: {med.ndc}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-[11px]">
                        <span className="text-[#6f7977] line-through">${med.brandMedianPrice.toFixed(2)} brand</span>
                        <span className="text-[#006b5a] font-bold">Save {med.savingsPercentage}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eff4ff]">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#6f7977] uppercase block font-semibold">Lowest Verified Price</span>
                      <span className="font-mono font-extrabold text-lg sm:text-xl text-[#00423d]">
                        ${med.lowestPrice.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-[#6f7977]">30 tablets</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMedicine(med);
                      }}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-[#00423d] text-white text-xs font-bold hover:bg-[#006b5a] transition-colors"
                    >
                      Compare {med.listingsCount} Sellers
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Medicine Details & Ranked Seller Comparison */}
      {currentScreen === 'detail' && (
        <div className="p-4 space-y-5 max-w-3xl mx-auto pb-32">
          {/* Formulation Telemetry Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-20 h-20 rounded-2xl object-cover border border-[#bfc9c6]/30 bg-[#eff4ff]"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#00423d] text-xs font-bold">
                    AB Rated Therapeutic Equivalent
                  </span>
                </div>
                <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#0b1c30] mt-1">
                  {selectedMedicine.name} {selectedMedicine.strength}
                </h2>
                <p className="text-xs text-[#3f4947] mt-0.5">
                  Generic equivalent for <strong>{selectedMedicine.bioequivalenceRef}</strong>
                </p>
                <p className="text-[11px] text-[#6f7977] font-mono mt-1">
                  Canonical NDC: {selectedMedicine.ndc} • {selectedMedicine.form}
                </p>
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="pt-3 border-t border-[#eff4ff] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6f7977]">
                Select Supply Duration
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPackSize('30')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    packSize === '30'
                      ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]'
                      : 'border-[#bfc9c6]/40 bg-white hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0b1c30]">30 Tablets</span>
                    <span className="text-xs font-mono font-bold text-[#00423d]">${selectedSeller.price.toFixed(2)}</span>
                  </div>
                  <span className="text-[11px] text-[#6f7977] block mt-0.5">1-Month Supply (${(selectedSeller.price / 30).toFixed(2)}/pill)</span>
                </button>

                <button
                  onClick={() => setPackSize('90')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    packSize === '90'
                      ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]'
                      : 'border-[#bfc9c6]/40 bg-white hover:bg-[#f8f9ff]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0b1c30]">90 Tablets</span>
                    <span className="text-xs font-mono font-bold text-[#00423d]">${(selectedSeller.price * 2.5).toFixed(2)}</span>
                  </div>
                  <span className="text-[11px] text-[#006b5a] font-bold block mt-0.5">Best Value (3-Month Supply)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lowest Verified Price Banner */}
          <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#006b5a] block">
                Lowest Verified Regional Price
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold font-mono text-[#00423d]">
                  ${(selectedSeller.price * unitMultiplier).toFixed(2)}
                </span>
                <span className="text-xs text-[#6f7977] line-through">
                  ${(selectedMedicine.brandMedianPrice * unitMultiplier).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-[#006b5a] font-semibold mt-0.5">
                Save ${( (selectedMedicine.brandMedianPrice - selectedSeller.price) * unitMultiplier ).toFixed(2)} vs retail pharmacy chain median
              </p>
            </div>

            <div className="text-right">
              <span className="px-2 py-0.5 rounded-full bg-[#76f5d9] text-[#00423d] text-xs font-bold">
                Save {selectedMedicine.savingsPercentage}%
              </span>
              <span className="block text-[10px] text-[#6f7977] mt-1 font-mono">
                {selectedSeller.sellerName}
              </span>
            </div>
          </div>

          {/* Ranked Licensed Pharmacy Offers List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
                  Ranked Licensed Pharmacy Offers
                </h3>
                <p className="text-[11px] text-[#6f7977]">All sellers hold active state dispensing licenses and cold-chain compliance</p>
              </div>
              <span className="text-xs text-[#006b5a] font-bold">Price: Low to High</span>
            </div>

            <div className="space-y-2.5">
              {selectedMedicine.competingOffers.map((offer) => {
                const isSelected = selectedSeller.sellerId === offer.sellerId;
                const offerPrice = offer.price * unitMultiplier;

                return (
                  <div
                    key={offer.sellerId}
                    onClick={() => setSelectedSeller(offer)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#00423d] ring-2 ring-[#00423d]/20 shadow-md'
                        : 'bg-white border-[#bfc9c6]/40 hover:border-[#006b5a] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0b1c30]">
                            #{offer.rank} {offer.sellerName}
                          </span>
                          {offer.isLowest && (
                            <span className="px-1.5 py-0.2 rounded bg-[#76f5d9] text-[#00423d] text-[10px] font-bold">
                              Lowest
                            </span>
                          )}
                          {offer.isTopPartner && (
                            <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#006b5a] text-[10px] font-bold">
                              Top Partner
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#6f7977] mt-0.5">
                          {offer.deliverySpeed} • {offer.stockStatus}
                        </p>
                        <p className="text-[10px] text-[#6f7977] font-mono mt-0.5">
                          License: {offer.licenseNumber} • Rating: {offer.rating} ★ ({offer.reviewsCount})
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-extrabold text-lg text-[#00423d]">
                          ${offerPrice.toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-[#6f7977]">
                          ${(offerPrice / (packSize === '90' ? 90 : 30)).toFixed(2)}/pill
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Selected Pharmacy Location Map */}
          <PharmacyLocationMap
            selectedSeller={selectedSeller}
            customerAddress={currentUser?.deliveryAddress || 'Brooklyn, NY 11201'}
          />

          {/* Sticky Add To Cart CTA Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#bfc9c6]/30 shadow-lg flex items-center justify-between max-w-3xl mx-auto z-20">
            <div>
              <span className="text-[10px] text-[#6f7977] uppercase block">Selected: {selectedSeller.sellerName}</span>
              <span className="font-mono font-extrabold text-xl text-[#00423d]">
                ${(selectedSeller.price * unitMultiplier).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-6 py-3 rounded-xl bg-[#00423d] text-white hover:bg-[#006b5a] text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Select & Continue to Cart</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 3: Review Cart & Checkout */}
      {currentScreen === 'cart' && (
        <div className="p-4 space-y-5 max-w-3xl mx-auto pb-24">
          {/* Checkout Steps Header */}
          <div className="bg-white p-4 rounded-2xl border border-[#bfc9c6]/40 shadow-sm flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#00423d] font-bold">
              <span className="w-5 h-5 rounded-full bg-[#00423d] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Cart & Rx</span>
            </div>
            <span className="text-[#bfc9c6]">→</span>
            <div className="flex items-center gap-2 text-[#6f7977] font-medium">
              <span className="w-5 h-5 rounded-full bg-[#eff4ff] text-[#3f4947] flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Delivery</span>
            </div>
            <span className="text-[#bfc9c6]">→</span>
            <div className="flex items-center gap-2 text-[#6f7977] font-medium">
              <span className="w-5 h-5 rounded-full bg-[#eff4ff] text-[#3f4947] flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Payment</span>
            </div>
          </div>

          {/* Cart Item Card with Blister Pack image */}
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4cnZjX-XXB1UiHv8Tnvxs8woEVHUMXznuvXciVEGUK8VGxp81L2leqqvl6bJ35RgWDpiUXMcjTxWixsfB45ZR75XzxyQ_lzgy4TRzJpSQbiBtF5OieXV_QQ01grVn4IyPOHA77qksfZ2Y9Cj0gM3cY-XrKD1eXQtLdBR9ighJfTJMuMOdJGQKjWlRFrBhBZNuN_vCffmvQB1x-EjOWUu8AHIBlyaM5PD2kPonxJ-Byiy_Cm4JV-mc6g"
                alt="Medicine packaging"
                className="w-20 h-20 rounded-xl object-cover border border-[#bfc9c6]/30 bg-[#eff4ff]"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0b1c30]">
                    {selectedMedicine.name} {selectedMedicine.strength}
                  </h3>
                  <span className="font-mono font-bold text-sm text-[#00423d]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#6f7977]">
                  {packSize === '90' ? '90 Tablets (3-Month Supply)' : '30 Tablets (1-Month Supply)'}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#006b5a] text-[10px] font-bold">
                    Fulfilling: {selectedSeller.sellerName}
                  </span>
                  <span className="text-[10px] text-[#6f7977] font-mono">NY-LIC-8841</span>
                </div>

                {/* Quantity Stepper */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center border border-[#bfc9c6]/60 rounded-lg overflow-hidden bg-[#f8f9ff]">
                    <button
                      onClick={() => setCartQuantity(Math.max(1, cartQuantity - 1))}
                      className="px-2.5 py-1 hover:bg-[#eff4ff] text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-[#0b1c30]">{cartQuantity}</span>
                    <button
                      onClick={() => setCartQuantity(cartQuantity + 1)}
                      className="px-2.5 py-1 hover:bg-[#eff4ff] text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-[#6f7977]">
                    ${itemPrice.toFixed(2)} / bottle
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Required by Law Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#006b5a]">verified</span>
                <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                  Prescription Required by Law (Rx Only)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#006b5a] text-[10px] font-bold">
                Attached
              </span>
            </div>

            <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#bfc9c6]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#00423d] text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">description</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0b1c30] font-mono">
                    prescription_rchen_atorv20_signed.pdf
                  </p>
                  <p className="text-[11px] text-[#6f7977]">
                    Dr. Sarah Jenkins, MD • 3 Refills Remaining
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#006b5a]">Verified on File</span>
            </div>
          </div>

          {/* Delivery Address & Method */}
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
              Delivery Address & Speed
            </span>

            <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#eff4ff] text-xs">
              <span className="font-bold text-[#0b1c30]">Robert Chen</span>
              <p className="text-[#3f4947] mt-0.5">742 Evergreen Terr, Springfield, NY 10017</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <label className={`p-3 rounded-xl border cursor-pointer text-xs ${
                deliveryMethod === 'usps' ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]' : 'border-[#bfc9c6]/40'
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'usps'}
                  onChange={() => setDeliveryMethod('usps')}
                  className="sr-only"
                />
                <span className="font-bold text-[#0b1c30] block">USPS Priority Mail</span>
                <span className="text-[11px] text-[#6f7977] block mt-0.5">Est. Tomorrow • $3.99</span>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer text-xs ${
                deliveryMethod === 'sameday' ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]' : 'border-[#bfc9c6]/40'
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'sameday'}
                  onChange={() => setDeliveryMethod('sameday')}
                  className="sr-only"
                />
                <span className="font-bold text-[#0b1c30] block">Same-Day Courier</span>
                <span className="text-[11px] text-[#6f7977] block mt-0.5">Today by 6 PM • $8.99</span>
              </label>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
              Select Payment Method
            </span>

            <div className="space-y-2 text-xs">
              <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                paymentMethod === 'hsa' ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]' : 'border-[#bfc9c6]/40'
              }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'hsa'}
                    onChange={() => setPaymentMethod('hsa')}
                    className="text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <div>
                    <span className="font-bold text-[#0b1c30]">HSA / FSA Card Eligible</span>
                    <span className="text-[11px] text-[#6f7977] block">Card ending in 4821</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#76f5d9] text-[#00423d] text-[10px] font-bold">Tax-Free</span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                paymentMethod === 'card' ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]' : 'border-[#bfc9c6]/40'
              }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <div>
                    <span className="font-bold text-[#0b1c30]">Credit / Debit Card</span>
                    <span className="text-[11px] text-[#6f7977] block">Visa, Mastercard, Amex</span>
                  </div>
                </div>
              </label>

              <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                paymentMethod === 'apple' ? 'border-[#00423d] bg-[#eff4ff]/40 ring-1 ring-[#00423d]' : 'border-[#bfc9c6]/40'
              }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'apple'}
                    onChange={() => setPaymentMethod('apple')}
                    className="text-[#006b5a] focus:ring-[#006b5a]"
                  />
                  <div>
                    <span className="font-bold text-[#0b1c30]">Apple Pay / Google Pay</span>
                    <span className="text-[11px] text-[#6f7977] block">Instant 1-touch checkout</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Order Financial Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6f7977]">
              Transparent Pricing Summary
            </span>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between text-[#3f4947]">
                <span>Medicine Subtotal ({cartQuantity} {cartQuantity === 1 ? 'bottle' : 'bottles'})</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#3f4947]">
                <span>Courier Tracked Delivery</span>
                <span className="font-mono font-bold">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#3f4947]">
                <span>Platform Pharmacy Verification Fee</span>
                <span className="font-mono font-bold text-[#006b5a]">$0.00 (Waived)</span>
              </div>
              <div className="pt-2 border-t border-[#eff4ff] flex justify-between text-sm font-bold text-[#0b1c30]">
                <span>Total Amount Due</span>
                <span className="font-mono text-base text-[#00423d]">${total.toFixed(2)}</span>
              </div>
              <div className="p-2.5 bg-[#eff4ff] rounded-xl text-center text-xs font-bold text-[#006b5a]">
                You are saving ${totalSaved.toFixed(2)} with GenericMed!
              </div>
            </div>

            {/* Consent Checkbox */}
            <label className="flex items-start gap-2 pt-2 cursor-pointer text-xs text-[#3f4947]">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 rounded text-[#006b5a] focus:ring-[#006b5a]"
              />
              <span>
                I authorize licensed pharmacists at {selectedSeller.sellerName} to review my prescription and dispense this medication under state and federal regulations.
              </span>
            </label>
          </div>

          {/* Place Order Sticky Bottom Action */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#bfc9c6]/30 shadow-lg flex items-center justify-between max-w-3xl mx-auto z-20">
            <div>
              <span className="text-[10px] text-[#6f7977] uppercase block">Total with Courier</span>
              <span className="font-mono font-extrabold text-xl text-[#00423d]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!consentChecked}
              className="px-6 py-3 rounded-xl bg-[#00423d] text-white hover:bg-[#006b5a] text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              <span>Place Order & Submit Rx</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 4: Order Confirmed & Success */}
      {currentScreen === 'order-success' && (
        <div className="p-6 space-y-6 max-w-xl mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#76f5d9] text-[#00423d] flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-3xl font-bold">check</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006b5a]">
              Order Successfully Submitted
            </span>
            <h2 className="text-2xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#0b1c30]">
              Order #GM-88412 Placed
            </h2>
            <p className="text-xs text-[#6f7977]">
              Prescription transmitted to licensed pharmacist at {selectedSeller.sellerName} for verification.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#bfc9c6]/40 shadow-sm text-left text-xs space-y-2.5">
            <div className="flex justify-between pb-2 border-b border-[#eff4ff]">
              <span className="text-[#6f7977]">Medication</span>
              <span className="font-bold text-[#0b1c30]">{selectedMedicine.name} {selectedMedicine.strength}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#eff4ff]">
              <span className="text-[#6f7977]">Fulfilling Seller</span>
              <span className="font-bold text-[#0b1c30]">{selectedSeller.sellerName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#eff4ff]">
              <span className="text-[#6f7977]">Delivery Est.</span>
              <span className="font-bold text-[#006b5a]">Tomorrow by 2:00 PM</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#00423d] pt-1">
              <span>Amount Paid (HSA/FSA)</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('search')}
            className="w-full py-3 bg-[#00423d] text-white hover:bg-[#006b5a] text-xs font-bold rounded-xl shadow-md transition-all"
          >
            Return to Marketplace
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4">
      {/* Top Banner with Device View Toggle */}
      <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between text-xs text-[#3f4947]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0b1c30]">Customer Consumer Experience</span>
          <span className="hidden sm:inline text-[#6f7977]">• Search, Bioequivalent Price Comparison & Rx Checkout</span>
        </div>

        <button
          onClick={onToggleMobileDeviceView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#bfc9c6] bg-white text-xs font-semibold hover:border-[#00423d] text-[#00423d] transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {isMobileDeviceView ? 'desktop_windows' : 'smartphone'}
          </span>
          <span>{isMobileDeviceView ? 'Switch to Fullscreen Desktop' : 'Switch to Smartphone Frame'}</span>
        </button>
      </div>

      {/* Conditional Rendering: Mobile Smartphone Device Frame vs Desktop Fullscreen */}
      {isMobileDeviceView ? (
        <div className="flex justify-center items-center py-2">
          {/* Smartphone Frame */}
          <div className="w-full max-w-[420px] h-[850px] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-black/20 border-4 border-[#3f4947]/30 flex flex-col relative overflow-hidden">
            {/* Speaker / Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700"></div>
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-[#f8f9ff] rounded-[38px] overflow-y-auto overflow-x-hidden pt-6 relative">
              {appContent}
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-[#bfc9c6]/40 shadow-sm overflow-hidden">
          {appContent}
        </div>
      )}

      {/* Customer In-App Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        initialRole="customer"
      />
    </div>
  );
};
