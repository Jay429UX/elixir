"use client";

import { useTheme, ThemeType } from "@/context/ThemeContext";

export default function ThemeSelector() {
  const { setTheme, setHasSelectedTheme } = useTheme();

  const handleSelectTheme = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    setHasSelectedTheme(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <div className="w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose Your Theme</h1>
          <p className="text-gray-400">Select a color theme for your Dicey experience</p>
        </div>

        {/* Theme Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Purple Theme */}
          <button
            onClick={() => handleSelectTheme("purple")}
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {/* Preview Card */}
            <div className="bg-[#1a1229] rounded-2xl p-6 h-full">
              {/* Mini Preview */}
              <div className="bg-[#231738] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700" />
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-[#362452] rounded" />
                    <div className="h-2 w-12 bg-[#362452] rounded mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-16 w-12 bg-[#362452] rounded-lg" />
                  <div className="h-16 w-12 bg-[#362452] rounded-lg" />
                  <div className="h-16 w-12 bg-[#362452] rounded-lg" />
                  <div className="h-16 w-12 bg-[#362452] rounded-lg" />
                </div>
              </div>

              {/* Theme Name */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Purple Theme</h3>
                <p className="text-sm text-gray-400">A nod to Magic Eden, keeping with our foundations. My preference.</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </div>
          </button>

          {/* Green Theme */}
          <button
            onClick={() => handleSelectTheme("green")}
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {/* Preview Card */}
            <div className="bg-[#131514] rounded-2xl p-6 h-full">
              {/* Mini Preview */}
              <div className="bg-[#1f2120] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700" />
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-[#2a2d2b] rounded" />
                    <div className="h-2 w-12 bg-[#2a2d2b] rounded mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-16 w-12 bg-[#2a2d2b] rounded-lg" />
                  <div className="h-16 w-12 bg-[#2a2d2b] rounded-lg" />
                  <div className="h-16 w-12 bg-[#2a2d2b] rounded-lg" />
                  <div className="h-16 w-12 bg-[#2a2d2b] rounded-lg" />
                </div>
              </div>

              {/* Theme Name */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Green Theme</h3>
                <p className="text-sm text-gray-400">Following our current color palette, however this prototype has some visual bugs.</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </div>
          </button>
        </div>

        <p className="text-gray-500 text-sm text-center mt-6">
          You can change theme by refreshing the page and selecting a new version.
        </p>
      </div>
    </div>
  );
}
