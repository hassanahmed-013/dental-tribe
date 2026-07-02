/** Default site content — seeded to Firestore `siteContent` collection. */

export const DEFAULT_CLINIC = {
  name: 'Dental Tribe',
  doctor: 'Dr. Shahab & Associates',
  doctorFullName: 'Dr. Shahab Rafiq',
  credentials: 'Consultant Dental Surgeon — B.D.S, R.D.S, D.F.O',
  registration: 'PMDC # 19501-D · PHC # R-88761',
  whatsappNumber: '923358219393',
  phoneDisplay: '0335-8219393',
  openTime: '17:00',
  closeTime: '22:00',
  openTimeDisplay: '5:00 PM',
  closeTimeDisplay: '10:00 PM',
  address: '10-Awaisia Housing Society, Nespak Road, Near Ghazi Chowk, Lahore',
  googlePlaceId: 'ChIJI96jbuIBGTkR8C3WTPAyqL8',
  googleReviewUrl: 'https://g.page/r/CfAt1kzwMqi_EAE/review',
  googleMapsUrl: 'https://g.page/r/CfAt1kzwMqi_EAE',
  googleRating: 5.0,
  googleReviewCount: 43,
  landmark: 'Near Ghazi Chowk',
  mapEmbed:
    'https://maps.google.com/maps?q=Ghazi+Chowk+Nespak+Road+Awaisia+Housing+Society+Lahore&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapDirections:
    'https://www.google.com/maps/search/?api=1&query=Ghazi+Chowk+Nespak+Road+Awaisia+Housing+Society+Lahore',
  aboutTitle: 'A Calm, Modern Clinic Built Around You',
  aboutImage: '/data/Dental.png',
  aboutImageAlt: 'Dental Tribe clinic — modern dental care in Lahore',
  aboutDescription:
    "Dr. Shahab Rafiq's evening practice in Lahore — a clean, fully equipped clinic for restorative, cosmetic, and preventive dentistry with honesty and comfort.",
  aboutFeatures: [
    {
      title: 'Sterilized & Safe',
      description: 'Strict cross-infection protocols and sterilized instruments for every patient.',
    },
    {
      title: 'Evening Hours',
      description: 'Open 5:00 PM – 10:00 PM daily — ideal for working professionals and families.',
    },
    {
      title: 'Honest Guidance',
      description: 'Every treatment is explained clearly. No pressure, no unnecessary procedures.',
    },
    {
      title: 'Full-Service Care',
      description: 'From fillings and root canals to veneers, crowns, implants, and whitening.',
    },
  ],
  stats: [
    { label: 'Happy Patients', value: '5,000+' },
    { label: 'Years of Experience', value: '15+' },
    { label: 'Treatments Done', value: '12,000+' },
    { label: 'Patient Rating', value: '4.9/5' },
  ],
}

export const DEFAULT_HOME = {
  hero: {
    headlineLine1: 'Transform Your Smile,',
    headlineLine2: 'Transform Your Life.',
    headlineAccent: 'Transform Your Life.',
    subcopy:
      'We are ready to make your smile sparkle! Premium dental care in Lahore — book your evening slot online and confirm on WhatsApp.',
    videoPath: '/hero-tooth.mp4',
    backgroundImage:
      'https://images.unsplash.com/photo-1629909613654-28e377ebdada?w=1600&q=80&auto=format&fit=crop',
    stats: [
      { icon: 'trophy', text: '15+ Years of Dental Excellence' },
      { icon: 'shield', text: 'Strict Sterilization & Safety Protocols' },
      { icon: 'users', text: 'Expert Consultants — Dr. Shahab & Associates' },
      { icon: 'star', text: '5,000+ Happy Patients in Lahore' },
    ],
  },
  doctorBio: {
    quote:
      'Every smile tells a story. My goal is to give you a healthy, confident smile with gentle care and honest guidance — no unnecessary treatments, no pressure.',
    highlights: [
      'Consultant Dental Surgeon',
      'Sharif Medical & Dental College',
      'Specialist in restorative & cosmetic dentistry',
      'Evening clinic for working professionals',
    ],
  },
  faq: [
    {
      q: 'What are your clinic timings?',
      a: 'We are open daily from 5:00 PM to 10:00 PM — ideal for patients who work during the day. Last appointment slot is 9:30 PM.',
    },
    {
      q: 'Is root canal treatment painful?',
      a: 'Modern techniques and local anesthesia make root canal therapy comfortable. Most patients feel relief from pain after the first visit, not more of it.',
    },
    {
      q: 'How do I book an appointment?',
      a: 'Choose a treatment on our website, pick your date and evening slot, then confirm via WhatsApp. Our team will reply to lock in your appointment.',
    },
    {
      q: 'Do I need to pay online?',
      a: 'No online payment is required. Fees are discussed at the clinic after examination. You can ask for an estimate on WhatsApp before visiting.',
    },
    {
      q: 'Is the clinic sterilized and safe?',
      a: 'Yes. We follow strict cross-infection and sterilization protocols for all instruments and treatment areas — your safety is our priority.',
    },
    {
      q: 'Can I walk in without booking?',
      a: 'We recommend booking ahead so we can reserve your slot. Walk-ins are welcome subject to availability during clinic hours.',
    },
  ],
  trust: [
    { label: 'PMDC Registered', sub: 'Licence # 19501-D' },
    { label: 'Sterilized Equipment', sub: 'Strict safety protocols' },
    { label: 'Evening Clinic', sub: '5 PM – 10 PM daily' },
    { label: 'No Online Payment', sub: 'Pay at clinic after consult' },
  ],
  howItWorks: {
    sectionLabel: 'Get Started Today!',
    title: 'Our Simple 3-Step Appointment Process',
    subtitle: 'Booking your evening dental visit takes less than a minute — we handle the rest.',
    steps: [
      {
        step: 'Step 1',
        icon: 'phone',
        title: 'Tell Us About Your Concern',
        desc: 'Call us, message on WhatsApp, or browse treatments on this website. Share your dental problem and we will guide you to the right service.',
      },
      {
        step: 'Step 2',
        icon: 'clipboard',
        title: 'Share Your Information',
        desc: 'Enter your name, city, and phone number when booking online. We use this only to confirm your appointment — no spam, ever.',
      },
      {
        step: 'Step 3',
        icon: 'calendar',
        title: 'Confirm Your Appointment',
        desc: 'Pick your preferred evening slot and confirm on WhatsApp. Our team replies personally.',
        usesClinicHours: true,
      },
    ],
  },
  whyUs: {
    sectionLabel: 'Why Patients Choose Us',
    title: 'Care That Feels Premium',
    titleAccent: 'Premium',
    reasons: [
      {
        icon: 'microscope',
        title: 'Advanced Technology',
        desc: 'Digital X-rays, laser dentistry, and rotary endodontics for precise, faster treatments.',
      },
      {
        icon: 'shield',
        title: 'Certified Specialists',
        desc: 'Board-certified dentists with 15+ years of combined clinical experience.',
      },
      {
        icon: 'heart',
        title: 'Gentle, Patient-First Care',
        desc: 'Pain management protocols designed around your comfort, every visit.',
      },
      {
        icon: 'clock',
        title: 'Evening Clinic Hours',
        desc: 'Open 5:00 PM – 10:00 PM to fit appointments around your workday.',
      },
    ],
  },
  beforeAfterSection: {
    sectionLabel: 'Real Patient Results',
    title: 'Before & After Transformations',
    titleAccent: 'Transformations',
    subtitle: 'Drag the slider to compare results across our most popular treatments.',
  },
  dentalProblemsSection: {
    title: 'Common Dental Problems & Their Solutions',
    subtitle: 'From everyday concerns to complete smile makeovers — we have a treatment for every stage.',
  },
}

export const DEFAULT_DENTAL_PROBLEMS = [
  {
    id: 'decay',
    title: 'Tooth Decay',
    solution: 'Fillings, root canal & crowns',
    imageKey: 'tooth-decay',
    tone: 'from-amber-100 to-orange-50',
  },
  {
    id: 'bleeding-gums',
    title: 'Bleeding Gums',
    solution: 'Scaling, polishing & gum care',
    imageKey: 'bleeding-gums',
    tone: 'from-rose-100 to-red-50',
  },
  {
    id: 'missing',
    title: 'Missing Tooth',
    solution: 'Implants, bridges & dentures',
    imageKey: 'missing-tooth',
    tone: 'from-slate-100 to-gray-50',
  },
  {
    id: 'broken',
    title: 'Broken Tooth',
    solution: 'Bonding, crowns & extraction',
    imageKey: 'broken-tooth',
    tone: 'from-violet-100 to-purple-50',
  },
  {
    id: 'loose-denture',
    title: 'Loose Denture',
    solution: 'Custom dentures & adjustments',
    imageKey: 'loose-denture',
    tone: 'from-blue-100 to-indigo-50',
  },
  {
    id: 'stained',
    title: 'Stained Teeth',
    solution: 'Laser whitening & polishing',
    imageKey: 'stained-teeth',
    tone: 'from-teal-100 to-cyan-50',
  },
]

export const DEFAULT_BEFORE_AFTER = [
  {
    id: 'braces',
    label: 'Braces',
    subtitle: 'Braces — Before and After Pictures',
    title: 'Unsure what braces will do to your beautiful smile?',
    description:
      'See how orthodontic treatment gently aligns crowded and crooked teeth. Our clinic uses modern braces techniques with careful planning — so you get a straighter, healthier smile without compromising your natural look.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
  {
    id: 'invisalign',
    label: 'Invisalign',
    subtitle: 'Invisalign — Before and After Pictures',
    title: 'Want straighter teeth without metal braces?',
    description:
      'Clear aligners can correct spacing and mild crowding discreetly. Explore real transformations from patients who chose Invisalign-style treatment for a confident smile at work and in social settings.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
  {
    id: 'crowns',
    label: 'Crowns',
    subtitle: 'Crowns — Before and After Pictures',
    title: 'Considering tooth crowns to improve your smile?',
    description:
      'Tooth crowns restore broken, worn, or heavily filled teeth with natural-looking results. Browse our before and after photos to see how crowns can rebuild strength and aesthetics in a single treatment.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
  {
    id: 'veneers',
    label: 'Veneers',
    subtitle: 'Veneers — Before and After Pictures',
    title: 'Dreaming of a camera-ready Hollywood smile?',
    description:
      'Porcelain and composite veneers reshape colour, size, and symmetry in just a few visits. Slide to compare how veneers transform stained or uneven front teeth into a bright, balanced smile.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
  {
    id: 'whitening',
    label: 'Teeth Whitening',
    subtitle: 'Teeth Whitening — Before and After Pictures',
    title: 'Tired of yellow or stained teeth in photos?',
    description:
      'Professional whitening lifts years of coffee, tea, and tobacco stains safely. Our evening clinic offers whitening that delivers visible brightness — often in a single session.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
  {
    id: 'implants',
    label: 'Dental Implants',
    subtitle: 'Dental Implants — Before and After Pictures',
    title: 'Missing a tooth and want a permanent solution?',
    description:
      'Dental implants replace missing teeth with fixed, natural-looking restorations. See how implant crowns fill gaps and restore full chewing function — without affecting neighbouring healthy teeth.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
  {
    id: 'bonding',
    label: 'Dental Bonding',
    subtitle: 'Dental Bonding — Before and After Pictures',
    title: 'Small chips or gaps holding your smile back?',
    description:
      'Composite bonding reshapes minor imperfections in one visit — no drilling required in many cases. A cost-effective way to refine your smile before considering veneers or crowns.',
    beforeImageKey: 'smile-before',
    afterImageKey: 'smile-after',
  },
]

export const DEFAULT_REVIEWS = [
  {
    id: 'review-tahir',
    authorName: 'Tahir Sadiq',
    rating: 5,
    relativeTime: '1 year ago',
    text: 'Very highly skilled and professional doctor and staff. I had a dental surgery last week and Alhamdulillah now recovered. Highly recommend. Normal fee and surgery charges. The best thing is doctor is very friendly which is not very common in Pakistan\'s health sector.',
  },
  {
    id: 'review-israa',
    authorName: 'Israa Tanweer',
    rating: 5,
    relativeTime: '3 years ago',
    text: 'I\'ve had an amazing experience thanks to Dr. Shahab and his staff. He made me feel at ease by explaining the entire procedure from the get go. Moreover he patiently listens to any and all questions and gives sound, practical advice.',
  },
  {
    id: 'review-hamna',
    authorName: 'hamna rashid',
    rating: 5,
    relativeTime: '4 years ago',
    text: 'Great experience! Got extraction done from Dr. Shahab. The procedure went really smooth and he did it really well. Highly recommended!',
  },
  {
    id: 'review-simmrah',
    authorName: 'simmrah kamal',
    rating: 5,
    relativeTime: '4 years ago',
    text: 'Top notch dentists and service. I would recommend this place 10/10. Friendly environment and super class expertise. Budget friendly charges. Dr Shahab and Dr Ali will give the best advice and guidance, unlike other dentists.',
  },
  {
    id: 'review-adeel',
    authorName: 'Adeel Ahmad',
    rating: 5,
    relativeTime: '4 years ago',
    text: 'Excellent service under good friendly environment with appreciate recommendations. I\'ve gone through a couple of scaling events. Dr. Shahab showed a strong commitment and dedication towards his profession. Must visit the place if found with some dental problem.',
  },
  {
    id: 'review-pakricemarkit',
    authorName: 'Pakricemarkit Apps',
    rating: 5,
    relativeTime: 'Google review',
    text: 'A great dental clinic with highly skilled doctors and a very supportive staff.',
  },
]

export const SITE_CONTENT_COLLECTION = 'siteContent'

export const SITE_CONTENT_DOC_IDS = {
  clinic: 'clinic',
  home: 'home',
  dentalProblems: 'dentalProblems',
  beforeAfter: 'beforeAfter',
  reviews: 'reviews',
}
