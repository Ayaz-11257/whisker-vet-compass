import type { LucideIcon } from "lucide-react";
import { Ambulance, HeartHandshake, Hospital, House, Microscope, Stethoscope } from "lucide-react";

export type CategorySlug = "vet-clinics" | "hospitals" | "boarding" | "diagnostics" | "ambulance" | "ngos";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  {
    slug: "vet-clinics",
    name: "Veterinary Clinics",
    short: "Clinics",
    description: "Check-ups, vaccinations and everyday care close to home.",
    icon: Stethoscope,
  },
  {
    slug: "hospitals",
    name: "Animal Hospitals",
    short: "Hospitals",
    description: "Surgery, in-patient care and specialist departments.",
    icon: Hospital,
  },
  {
    slug: "boarding",
    name: "Pet Boarding",
    short: "Boarding",
    description: "Safe stays, day care and supervised play while you're away.",
    icon: House,
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    short: "Diagnostics",
    description: "Lab tests, X-ray, ultrasound and imaging centres.",
    icon: Microscope,
  },
  {
    slug: "ambulance",
    name: "Ambulance Services",
    short: "Ambulance",
    description: "Pet transport and animal ambulance operators.",
    icon: Ambulance,
  },
  {
    slug: "ngos",
    name: "Animal Welfare NGOs",
    short: "NGOs",
    description: "Rescue, adoption, sterilisation and community animal care.",
    icon: HeartHandshake,
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const isCategorySlug = (value: unknown): value is CategorySlug =>
  typeof value === "string" && CATEGORIES.some((c) => c.slug === value);

export interface Provider {
  id: string;
  name: string;
  categories: CategorySlug[];
  city: string;
  area: string;
  address: string;
  services: string[];
  hoursSummary: string;
  hours: { days: string; time: string }[];
  emergency: boolean;
  phone: string;
  about: string;
  featured?: boolean;
}

/**
 * DEMONSTRATION DATA ONLY.
 * Every provider below is fictional. Names, addresses and phone numbers are placeholders
 * and do not refer to real businesses. No ratings, reviews or credentials are shown.
 */
export const PROVIDERS: Provider[] = [
  {
    id: "pawsitive-care-clinic",
    name: "Pawsitive Care Veterinary Clinic",
    categories: ["vet-clinics"],
    city: "Bengaluru",
    area: "Indiranagar",
    address: "Sample Street 12, Indiranagar, Bengaluru",
    services: ["General check-ups", "Vaccinations", "Dental care", "Nutrition advice"],
    hoursSummary: "Mon–Sat · 9:00 AM – 8:00 PM",
    hours: [
      { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
      { days: "Sunday", time: "10:00 AM – 1:00 PM" },
    ],
    emergency: false,
    phone: "+91 00000 00001",
    about:
      "A neighbourhood clinic profile used to demonstrate how a general practice listing could look.",
    featured: true,
  },
  {
    id: "harbourline-animal-hospital",
    name: "Harbourline Animal Hospital",
    categories: ["hospitals", "diagnostics"],
    city: "Mumbai",
    area: "Andheri West",
    address: "Demo Road 48, Andheri West, Mumbai",
    services: ["Soft-tissue surgery", "In-patient care", "Orthopaedics", "Digital X-ray"],
    hoursSummary: "Open 24 hours (as listed)",
    hours: [{ days: "Every day", time: "Open 24 hours (as listed by provider)" }],
    emergency: true,
    phone: "+91 00000 00002",
    about:
      "A sample multi-speciality hospital listing that shows emergency, surgical and imaging services.",
    featured: true,
  },
  {
    id: "tailwag-boarding-house",
    name: "Tailwag Boarding House",
    categories: ["boarding"],
    city: "Pune",
    area: "Baner",
    address: "Placeholder Lane 7, Baner, Pune",
    services: ["Overnight boarding", "Day care", "Grooming", "Supervised play"],
    hoursSummary: "Daily · 7:00 AM – 9:00 PM",
    hours: [{ days: "Every day", time: "7:00 AM – 9:00 PM (check-in hours)" }],
    emergency: false,
    phone: "+91 00000 00003",
    about: "A demonstration boarding listing with day care and grooming add-ons.",
    featured: true,
  },
  {
    id: "clearview-pet-diagnostics",
    name: "ClearView Pet Diagnostics",
    categories: ["diagnostics"],
    city: "Hyderabad",
    area: "Banjara Hills",
    address: "Example Avenue 3, Banjara Hills, Hyderabad",
    services: ["Blood panels", "Ultrasound", "Digital X-ray", "Home sample collection"],
    hoursSummary: "Mon–Sat · 8:00 AM – 7:00 PM",
    hours: [
      { days: "Monday – Saturday", time: "8:00 AM – 7:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    emergency: false,
    phone: "+91 00000 00004",
    about: "A sample diagnostic centre profile showing lab and imaging services.",
    featured: true,
  },
  {
    id: "swiftpaws-ambulance",
    name: "SwiftPaws Animal Ambulance",
    categories: ["ambulance"],
    city: "Delhi",
    area: "South Delhi",
    address: "Service area: South & Central Delhi (demo)",
    services: ["Emergency pet transport", "Stretcher support", "Hospital transfers"],
    hoursSummary: "Listed as 24/7 — call to confirm",
    hours: [{ days: "Every day", time: "Listed as 24/7 — availability not guaranteed" }],
    emergency: true,
    phone: "+91 00000 00005",
    about: "A demonstration ambulance operator listing with a service area instead of a street address.",
    featured: true,
  },
  {
    id: "second-chance-paws",
    name: "Second Chance Paws Foundation",
    categories: ["ngos"],
    city: "Kolkata",
    area: "Salt Lake",
    address: "Sample Block 9, Salt Lake, Kolkata",
    services: ["Rescue support", "Adoption drives", "Sterilisation camps", "Volunteer programmes"],
    hoursSummary: "Mon–Sun · 10:00 AM – 6:00 PM",
    hours: [{ days: "Every day", time: "10:00 AM – 6:00 PM" }],
    emergency: false,
    phone: "+91 00000 00006",
    about: "A fictional animal welfare organisation used to show how NGO listings appear.",
    featured: true,
  },
  {
    id: "greenleaf-vet-centre",
    name: "Greenleaf Vet Centre",
    categories: ["vet-clinics", "diagnostics"],
    city: "Kolkata",
    area: "Ballygunge",
    address: "Demo Crescent 21, Ballygunge, Kolkata",
    services: ["Vaccinations", "Skin & allergy care", "In-house lab tests"],
    hoursSummary: "Mon–Sat · 10:00 AM – 9:00 PM",
    hours: [
      { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    emergency: false,
    phone: "+91 00000 00007",
    about: "A sample clinic listing combining general practice with in-house testing.",
  },
  {
    id: "northstar-pet-hospital",
    name: "Northstar Pet Hospital",
    categories: ["hospitals"],
    city: "Bengaluru",
    area: "Hebbal",
    address: "Example Ring Road 66, Hebbal, Bengaluru",
    services: ["Critical care unit", "Surgery", "Cardiology", "Physiotherapy"],
    hoursSummary: "Open 24 hours (as listed)",
    hours: [{ days: "Every day", time: "Open 24 hours (as listed by provider)" }],
    emergency: true,
    phone: "+91 00000 00008",
    about: "A demonstration hospital listing with emergency and specialist care.",
  },
  {
    id: "cosy-whiskers-retreat",
    name: "Cosy Whiskers Cat Retreat",
    categories: ["boarding"],
    city: "Mumbai",
    area: "Bandra",
    address: "Placeholder Road 15, Bandra, Mumbai",
    services: ["Cat-only boarding", "Private suites", "Daily photo updates"],
    hoursSummary: "Daily · 8:00 AM – 8:00 PM",
    hours: [{ days: "Every day", time: "8:00 AM – 8:00 PM" }],
    emergency: false,
    phone: "+91 00000 00009",
    about: "A fictional cat boarding listing to illustrate species-specific services.",
  },
  {
    id: "rapid-rescue-pet-transport",
    name: "Rapid Rescue Pet Transport",
    categories: ["ambulance"],
    city: "Bengaluru",
    area: "Whitefield",
    address: "Service area: East Bengaluru (demo)",
    services: ["Pet ambulance", "Scheduled vet visits", "Post-surgery pick-up"],
    hoursSummary: "Daily · 6:00 AM – 11:00 PM",
    hours: [{ days: "Every day", time: "6:00 AM – 11:00 PM" }],
    emergency: true,
    phone: "+91 00000 00010",
    about: "A sample transport operator listing that covers both emergency and scheduled trips.",
  },
  {
    id: "street-friends-collective",
    name: "Street Friends Animal Collective",
    categories: ["ngos"],
    city: "Pune",
    area: "Kothrud",
    address: "Sample Colony 4, Kothrud, Pune",
    services: ["Community feeding", "Injury first aid", "Adoption counselling"],
    hoursSummary: "Mon–Sat · 9:00 AM – 5:00 PM",
    hours: [
      { days: "Monday – Saturday", time: "9:00 AM – 5:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    emergency: false,
    phone: "+91 00000 00011",
    about: "A fictional community welfare group used as demonstration content.",
  },
  {
    id: "brightpaw-clinic-hyderabad",
    name: "BrightPaw Family Vet",
    categories: ["vet-clinics"],
    city: "Hyderabad",
    area: "Gachibowli",
    address: "Demo Plaza 10, Gachibowli, Hyderabad",
    services: ["Puppy & kitten care", "Microchipping", "Deworming"],
    hoursSummary: "Mon–Sun · 9:00 AM – 9:00 PM",
    hours: [{ days: "Every day", time: "9:00 AM – 9:00 PM" }],
    emergency: false,
    phone: "+91 00000 00012",
    about: "A sample family veterinary practice listing.",
  },
];

export const getProvider = (id: string) => PROVIDERS.find((p) => p.id === id);

export interface ProviderFilters {
  q?: string | undefined;
  location?: string | undefined;
  category?: CategorySlug | undefined;
  emergency?: boolean | undefined;
}

export function filterProviders(list: Provider[], filters: ProviderFilters): Provider[] {
  const q = filters.q?.trim().toLowerCase();
  const loc = filters.location?.trim().toLowerCase();
  return list.filter((p) => {
    if (filters.category && !p.categories.includes(filters.category)) return false;
    if (filters.emergency && !p.emergency) return false;
    if (loc && !`${p.city} ${p.area} ${p.address}`.toLowerCase().includes(loc)) return false;
    if (q) {
      const hay = [p.name, ...p.services, ...p.categories.map((c) => getCategory(c)?.name ?? "")]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export const CITIES = Array.from(new Set(PROVIDERS.map((p) => p.city))).sort();
