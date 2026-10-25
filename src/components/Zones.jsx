import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const zonesHeroBg = "/zone-1.jpg";
const zoneImages = [
  "/zone-cairo.jpg",
  "/zone-alex.jpg",
  "/zone-giza.jpg",
  "/zone-coast.jpg",
  "/zone-cairo.jpg",
  "/zone-alex.jpg",
  "/zone-giza.jpg",
  "/zone-coast.jpg"
];

const zoneTitles = [
  "Historic Cairo",
  "Alexandria Coast",
  "Giza Pyramids View",
  "North Coast Resort",
  "New Capital City",
  "Alexandria Downtown",
  "Smart Village Giza",
  "Red Sea Marina"
];

export default function Zones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getZonesData() {
      try {
        const response = await api.get('/zone');
        setZones(response?.data || []);
      } catch (error) {
        console.error("Error fetching zones:", error);
      } finally {
        setLoading(false);
      }
    }
    getZonesData();
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative w-full h-145 bg-cover bg-center flex items-center justify-center text-white px-6"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${zonesHeroBg}')` }}
      >
        <div className="absolute left-8 hidden lg:flex flex-col gap-4 text-white">
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">f</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">𝕏</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">in</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">♪</a>
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 tracking-wide">
            Destinations Defined by<br />Distinction
          </h1>
          <p className="text-xs md:text-sm text-gray-200 max-w-lg mx-auto leading-relaxed">
            From the quiet pulse of the shoreline to the vibrant energy of the metropolitan center, explore our guide to the neighborhoods that mirror your ambition and your aesthetic.
          </p>
        </div>
      </section>

      {/* 2. ZONES GRID (8 Cards layout matching Figma) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {loading && zones.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-sm">Loading zones...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(zones.length > 0 ? zones : zoneImages).map((item, index) => {
              const zoneObj = typeof item === 'object' ? item : null;
              const imgSrc = zoneObj?.image || zoneImages[index % zoneImages.length];
              const title = zoneObj?.name || zoneTitles[index % zoneTitles.length];

              return (
                <div
                  key={zoneObj?.id || index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-150 p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Zone Image */}
                    <div
                      className="h-44 bg-cover bg-center rounded-lg mb-3 relative"
                      style={{ backgroundImage: `url('${imgSrc}')` }}
                    >
                      <span className="absolute top-2.5 right-2.5 bg-[#8B1E22] text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                        {zoneObj?.properties_count || '9 Properties'}
                      </span>
                    </div>

                    {/* Zone Title */}
                    <h3 className="font-serif font-bold text-gray-900 text-sm mb-1">
                      {title}
                    </h3>

                    {/* Zone Description */}
                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-4">
                      {zoneObj?.description || "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities."}
                    </p>
                  </div>

                  {/* View Properties Button */}
                  <div>
                    <Link
                      to={`/units?zone=${zoneObj?.id || index + 1}`}
                      className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2 rounded-lg text-xs font-medium transition-colors shadow-sm"
                    >
                      View Properties
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