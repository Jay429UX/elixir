"use client";

export default function Footer() {
  return (
    <footer className="mt-12 w-full">
      <div className="bg-dicey-card rounded-2xl p-6 md:p-10">
        {/* Top Section - Logo and Legal Text */}
        <div className="mb-10">
          <img src="/dicey-logo.svg" alt="Dicey" className="h-6 mb-6" />
          <div className="text-xs text-gray-500 leading-relaxed space-y-3 max-w-4xl">
            <p className="text-pretty">
              Dicey is owned and operated by Magic Eden N.V. (Registration number 157086) having its registered address at Zuikertuintjeweg Z/N (Zuikertuin Tower), Curaçao.
            </p>
            <p className="text-pretty">
              Magic Eden N.V. is authorised and licensed to operate Dicey.com by the Curaçao Gaming Authority to offer games of chance under license number OGL/2024/1260/0494 in accordance with the National Ordinance on Games of Chance (Landsverordening op de kansspelen, P.B. 2024, no. 157).
            </p>
            <p className="text-pretty">
              Please note that Crypto trading is not considered gambling and therefore not covered by our Gaming license. Dicey offer these services independently.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Support</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">FAQ</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Partnership</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Blog</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Help Center</a>
            </nav>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">About Us</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">AML Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Sports Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Responsible Gaming</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Terms and Conditions</a>
            </nav>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Community</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                </svg>
                Discord
              </a>
            </nav>
          </div>
        </div>

        {/* Payments Section */}
        <div className="mb-10 bg-dicey-dark rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-white mb-4">Accepted Payments</h4>
          <div className="flex flex-wrap items-center gap-3">
            {/* Bitcoin */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <img src="/crypto/btc.svg" alt="Bitcoin" className="size-5" />
              <span className="text-xs text-gray-400">BTC</span>
            </div>
            {/* Ethereum */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <img src="/crypto/eth.svg" alt="Ethereum" className="size-5" />
              <span className="text-xs text-gray-400">ETH</span>
            </div>
            {/* Solana */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <img src="/crypto/sol.svg" alt="Solana" className="size-5" />
              <span className="text-xs text-gray-400">SOL</span>
            </div>
            {/* USDT */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <img src="/crypto/usdt.svg" alt="Tether" className="size-5" />
              <span className="text-xs text-gray-400">USDT</span>
            </div>
            {/* USDC */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <img src="/usdc.png" alt="USD Coin" className="size-5" />
              <span className="text-xs text-gray-400">USDC</span>
            </div>
            {/* Litecoin */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <svg className="size-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#345D9D"/>
                <path d="M10.5 22.5L12 17L10 17.5L10.5 15.5L12.5 15L14.5 7.5H18L16 14.5L18 14L17.5 16L15.5 16.5L14 22.5H10.5Z" fill="white"/>
              </svg>
              <span className="text-xs text-gray-400">LTC</span>
            </div>
            {/* Dogecoin */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <svg className="size-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#C2A633"/>
                <path d="M13 10H17.5C20.5 10 23 12.5 23 16C23 19.5 20.5 22 17.5 22H13V10ZM15 12V20H17.5C19.5 20 21 18.5 21 16C21 13.5 19.5 12 17.5 12H15Z" fill="white"/>
                <path d="M11 15H19V17H11V15Z" fill="white"/>
              </svg>
              <span className="text-xs text-gray-400">DOGE</span>
            </div>
            {/* XRP */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <svg className="size-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#23292F"/>
                <path d="M22.5 9H25L20 14.5C18 16.5 14 16.5 12 14.5L7 9H9.5L13.5 13C15 14.5 17 14.5 18.5 13L22.5 9Z" fill="white"/>
                <path d="M9.5 23H7L12 17.5C14 15.5 18 15.5 20 17.5L25 23H22.5L18.5 19C17 17.5 15 17.5 13.5 19L9.5 23Z" fill="white"/>
              </svg>
              <span className="text-xs text-gray-400">XRP</span>
            </div>
            {/* BNB */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <svg className="size-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
                <path d="M16 8L12.5 11.5L14.5 13.5L16 12L17.5 13.5L19.5 11.5L16 8Z" fill="white"/>
                <path d="M10 14L8 16L10 18L12 16L10 14Z" fill="white"/>
                <path d="M16 14L12.5 17.5L14.5 19.5L16 18L17.5 19.5L19.5 17.5L16 14Z" fill="white"/>
                <path d="M22 14L20 16L22 18L24 16L22 14Z" fill="white"/>
                <path d="M16 20L14.5 21.5L16 23L17.5 21.5L16 20Z" fill="white"/>
              </svg>
              <span className="text-xs text-gray-400">BNB</span>
            </div>
            {/* MATIC / Polygon */}
            <div className="flex items-center gap-2 px-3 py-2 bg-dicey-darker rounded-lg">
              <svg className="size-5" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#8247E5"/>
                <path d="M20.5 13.5L16.5 11L12.5 13.5V18.5L16.5 21L20.5 18.5V13.5Z" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M16.5 11V16L20.5 13.5" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M16.5 16L12.5 13.5" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M16.5 16V21" fill="none" stroke="white" strokeWidth="1.5"/>
              </svg>
              <span className="text-xs text-gray-400">MATIC</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6">
          <p className="text-xs text-gray-600 text-center">
            Copyright © 2026 dicey.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
