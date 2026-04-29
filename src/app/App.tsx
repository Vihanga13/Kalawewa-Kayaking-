import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { UniqueValueSection } from "./components/UniqueValueSection";
import { TourDetailsSection } from "./components/TourDetailsSection";
import { SafetySection } from "./components/SafetySection";
import { GallerySection } from "./components/GallerySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CommunityStoriesSection } from "./components/CommunityStoriesSection";
import { BookingSection } from "./components/BookingSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";

// === Images ===
const heroImg =
  "https://images.unsplash.com/photo-1730606604079-554f0401193b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkJTIwZWxlcGhhbnRzJTIwcml2ZXIlMjBTcmklMjBMYW5rYSUyMGp1bmdsZXxlbnwxfHx8fDE3NzcyNjE3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080";

const kayakImg =
  "https://images.unsplash.com/photo-1773113393133-93fb3f166a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXlha2luZyUyMHRyb3BpY2FsJTIwcml2ZXIlMjBuYXR1cmV8ZW58MXx8fHwxNzc3MjYxNzA5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const jungleImg =
  "https://images.unsplash.com/photo-1656495782927-1a65c1170fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTcmklMjBMYW5rYSUyMGx1c2glMjBncmVlbiUyMGp1bmdsZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzcyNjE3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080";

const elephantBathImg =
  "https://images.unsplash.com/photo-1731124655617-e74233ed4a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMGJhdGhpbmclMjB3YXRlciUyMGNsb3NlJTIwdXAlMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzcyNjE3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080";

const riverMistImg =
  "https://images.unsplash.com/photo-1646596962270-60f6e6b61c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXlhayUyMHBhZGRsaW5nJTIwY2FsbSUyMHJpdmVyJTIwbW9ybmluZyUyMG1pc3R8ZW58MXx8fHwxNzc3MjYxNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const ecoTourismImg =
  "https://images.unsplash.com/photo-1759252973843-957dc1b5e0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjB0b3VyaXNtJTIwbmF0dXJlJTIwZ3VpZGUlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzc3MjYxNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const elephantHerdImg =
  "https://images.unsplash.com/photo-1759213997390-da57e76726f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMHBob3RvZ3JhcGh5JTIwZWxlcGhhbnQlMjBoZXJkJTIwc3Vuc2V0fGVufDF8fHx8MTc3NzI2MTcxNXww&ixlib=rb-4.1.0&q=80&w=1080";

const riverGoldenImg =
  "https://images.unsplash.com/photo-1666170378011-b82634539902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMG1vcm5pbmclMjBnb2xkZW4lMjBsaWdodCUyMHRyb3BpY2FsJTIwZm9yZXN0fGVufDF8fHx8MTc3NzI2MTcxOXww&ixlib=rb-4.1.0&q=80&w=1080";

// Testimonial avatars
const avatar1 =
  "https://images.unsplash.com/photo-1758599668756-fa55c7ff4463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwc21pbGluZyUyMGFkdmVudHVyZSUyMG91dGRvb3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNjE3MTR8MA&ixlib=rb-4.1.0&q=80&w=200";

const avatar2 =
  "https://images.unsplash.com/photo-1569342515654-a51ab4b2b050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRyYXZlbGVyJTIwbmF0dXJlJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI2MTcxNXww&ixlib=rb-4.1.0&q=80&w=200";

const avatar3 =
  "https://images.unsplash.com/photo-1758524571928-6283144ffdea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBvdXRkb29yJTIwYWR2ZW50dXJlJTIwc21pbGluZyUyMGhhcHB5JTIwdHJhdmVsZXJ8ZW58MXx8fHwxNzc3MjYxNzE4fDA&ixlib=rb-4.1.0&q=80&w=200";

const galleryImages = [
  { src: elephantBathImg, alt: "Wild elephant bathing in river", caption: "Morning ritual at the river" },
  { src: kayakImg, alt: "Kayaking on tropical river" },
  { src: ecoTourismImg, alt: "Eco tour experience" },
  { src: riverGoldenImg, alt: "Golden river at sunrise", caption: "Dawn on the water" },
  { src: elephantHerdImg, alt: "Elephant herd at sunset", caption: "Herd at golden hour" },
];

const testimonials = [
  {
    name: "James Hartley",
    origin: "London, United Kingdom",
    rating: 5,
    text: "I've done safaris in Kenya and Botswana, but nothing compares to this. We were 20 metres from a herd of elephants, just floating in silence. My hands were shaking trying to photograph them. Absolutely extraordinary.",
    avatar: avatar1,
    trip: "Morning Tour · July 2025",
  },
  {
    name: "Priya Sethuraman",
    origin: "Singapore",
    rating: 5,
    text: "The guides were phenomenal — knowledgeable, passionate, and made us feel completely safe. The moment a baby elephant splashed water near our kayak is something I'll tell my grandchildren about. Book it. Now.",
    avatar: avatar2,
    trip: "Private Tour · August 2025",
  },
  {
    name: "Marco Delgado",
    origin: "Barcelona, Spain",
    rating: 5,
    text: "We were a family of four including our 10-year-old daughter. She cried happy tears when an elephant walked past just metres from our kayaks. The guides handled everything perfectly. A 10/10 life experience.",
    avatar: avatar3,
    trip: "Family Tour · September 2025",
  },
  {
    name: "Aiko Yamamoto",
    origin: "Tokyo, Japan",
    rating: 5,
    text: "I came to Sri Lanka specifically for this experience after seeing it on Instagram. It completely exceeded my expectations. The river at sunrise, the mist, the elephants — it felt like I was inside a nature documentary.",
    avatar: avatar2,
    trip: "Sunrise Tour · October 2025",
  },
];

export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", overflowX: "hidden", margin: 0, padding: 0, width: "100%" }}>
      <CookieBanner />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <UniqueValueSection />
      <TourDetailsSection />
      <SafetySection />
      <GallerySection images={galleryImages} videoThumb={riverMistImg} />
      <TestimonialsSection  />
      <CommunityStoriesSection videos={[]} />
      <BookingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}