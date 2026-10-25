import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

export default function Units() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();


  const [searchTerm, setSearchTerm] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [developer, setDeveloper] = useState('');
  const [zone, setZone] = useState('');

  useEffect(() => {
    async function getUnitsData() {
      try {
        const queryParams = new URLSearchParams(location.search);
        const zoneId = queryParams.get('zone');
        const endpoint = zoneId ? `/unit?zone=${zoneId}` : '/unit';
        
        const response = await api.get(endpoint);
        setUnits(response?.data || []);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setLoading(false);
      }
    }
    getUnitsData();
  }, [location.search]);

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative w-full h-145 bg-cover bg-center flex items-center justify-center text-white px-6"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/units-bg.jpg')` }}
      >
        <div className="absolute left-8 hidden lg:flex flex-col gap-4 text-white">
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">f</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">𝕏</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">in</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">♪</a>
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 tracking-wide">
            Where Visionary Design<br />Meets Daily Life
          </h1>
          <p className="text-xs md:text-sm text-gray-200 max-w-lg mx-auto leading-relaxed">
            Experience a collection of residences designed to personal sanctuary. Each architecture expands city views with matured textures and spaces by a skilled vision to create the ultimate retreat from the world.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="max-w-1280px] mx-auto px-6 -mt-6 relative z-20">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <input
            type="text"
            placeholder="Search Property"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8B1E22] col-span-2 sm:col-span-1" 
          />
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8B1E22] bg-white text-gray-600"
          >
            <option value="">Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
          </select>
          <select
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8B1E22] bg-white text-gray-600"
          >
            <option value="">Developer</option>
            <option value="palm">Palm Hills</option>
            <option value="sawary">Sawary</option>
          </select>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8B1E22] bg-white text-gray-600"
          >
            <option value="">Zone</option>
            <option value="alex">Alexandria</option>
            <option value="cairo">New Cairo</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8B1E22] bg-white text-gray-600">
            <option value="">Projects</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#8B1E22] bg-white text-gray-600">
            <option value="">Status</option>
          </select>
          <button className="bg-[#8B1E22] hover:bg-[#6b171a] text-white rounded-lg py-2 text-xs font-medium transition-colors col-span-2 sm:col-span-1 shadow-sm">
            Search
          </button>
        </div>
      </section>

      {/* 3. UNITS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center text-gray-500 py-20 text-sm">Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(units.length > 0 ? units : Array(9).fill(0)).map((item, index) => {
              const unitData = typeof item === 'object' ? item : null;
              return (
                <div
                  key={unitData?.id || index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-150 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Unit Image */}
                    <div
                      className="h-48 bg-cover bg-center rounded-lg mb-4 relative"
                      style={{ backgroundImage: `url('${unitData?.image || '/unit-img.jpg'}')` }}
                    >
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                        {unitData?.status || 'Available'}
                      </span>
                    </div>

                    {/* Meta info: Bedrooms, Bathrooms, Area */}
                    <div className="flex justify-between items-center text-gray-500 text-[11px] mb-3 pb-3 border-b border-gray-100 px-1">
                      <span>🛏️ {unitData?.bedrooms || 3} Bedrooms</span>
                      <span>🚿 {unitData?.bathrooms || 2} Bathrooms</span>
                      <span>📐 {unitData?.area || '150m²'}</span>
                    </div>

                    {/* Title and Price */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif font-bold text-gray-900 text-sm">
                        {unitData?.title || "Sawary Family Villa"}
                      </h3>
                      <span className="font-bold text-[#8B1E22] text-xs">
                        {unitData?.price ? `${unitData.price} EGP` : "50,000 EGP"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-6">
                      {unitData?.description || "Experience the true meaning of modern living in this luxurious property featuring spacious rooms and modern amenities."}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <div>
                    <Link
                      to={`/unit/${unitData?.id || index + 1}`}
                      className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2 rounded-lg text-xs font-medium transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}