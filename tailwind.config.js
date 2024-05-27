/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        landingBackgroundColor: "#F0F0F0", // Kaydol kısmının arka planı, butonları ve Login butonları için de aynı
        landingFontColor: "#000000", // Bazı textlerin pass throughları farklı bakarız tasarımdan.
        landingButtonTextColor: "#FFFFFF",
        landingShapeColor: "#D9D9D9", // Kaydol kısmının shapeler ve kaydol üst buton için de aynı
        signupCardColor: "#757575",  // Kaydol kısmının textleri için de aynı renk
        signupButtonStrokeColor: "#5C5E64", // Butonların strokeları, alt geçiş butonlarının renkleri (Ana sayfada navbar ve sidebardaki textler ve ikonlar) 
        cardBackground: "#2B3245",
        cardBronze: "#FF6038",
        cardGold: "#FFB828",
        cardSilver: "#2E69FF",
        loginSuccess: "#4BB543",  // Video screende ilerle butonu rengi
        loginUnsuccess: "#FC100D", // pass throughları farklı
        createButtons: "#FF8C00",
        updateButton: "#1974D2",
        videoScreenShapes: "#7929FF",
        updatehover: "#689CD2",
        cancelhover: "#DD6563",
      },
      fontFamily: {
        inter: ["Inter", 'sans-serif'],
        open: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
