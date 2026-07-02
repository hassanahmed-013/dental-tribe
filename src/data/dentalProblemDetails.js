/** Full content for each dental problem — used on /problems/:id pages */

export const PROBLEM_DETAILS = {
  decay: {
    id: 'decay',
    title: 'Tooth Decay',
    imageKey: 'tooth-decay',
    tone: 'from-amber-100 to-orange-50',
    overview:
      'Tooth decay (dental caries) happens when plaque bacteria produce acids that erode enamel — creating cavities. Left untreated, decay spreads deeper toward the nerve and can cause infection.',
    causes: ['Poor brushing and flossing habits', 'Frequent sugary snacks and drinks', 'Dry mouth or reduced saliva', 'Deep grooves that trap food'],
    symptoms: ['Toothache or sensitivity', 'Visible holes or dark spots', 'Pain when eating sweets', 'Bad breath or unpleasant taste'],
    treatments: [
      { slug: 'tooth-colored-filling', name: 'Tooth Colored Filling', desc: 'Early to moderate decay' },
      { slug: 'root-canal', name: 'Root Canal Treatment', desc: 'When decay reaches the nerve' },
      { slug: 'zirconia-crown', name: 'Zirconia Crown', desc: 'When much tooth structure is lost' },
    ],
    whenToVisit: 'See a dentist as soon as you notice sensitivity, pain, or a visible cavity. Evening appointments are available 5–10 PM.',
  },
  'bleeding-gums': {
    id: 'bleeding-gums',
    title: 'Bleeding Gums',
    imageKey: 'bleeding-gums',
    tone: 'from-rose-100 to-red-50',
    overview:
      'Bleeding gums are often the first sign of gingivitis — inflammation caused by plaque along the gum line. Without treatment, it can progress to periodontitis and tooth loss.',
    causes: ['Plaque and tartar buildup', 'Irregular flossing', 'Smoking or tobacco use', 'Hormonal changes or certain medications'],
    symptoms: ['Blood when brushing or flossing', 'Red, swollen, or tender gums', 'Bad breath', 'Gums pulling away from teeth'],
    treatments: [
      { slug: 'scaling-polishing', name: 'Scaling & Polishing', desc: 'Professional deep cleaning' },
      { slug: 'aesthetic-filling', name: 'Aesthetic Filling', desc: 'If recession exposes sensitive roots' },
    ],
    whenToVisit: 'Do not ignore bleeding gums — book a cleaning visit. Early gum care prevents serious bone loss.',
  },
  missing: {
    id: 'missing',
    title: 'Missing Tooth',
    imageKey: 'missing-tooth',
    tone: 'from-slate-100 to-gray-50',
    overview:
      'A missing tooth affects chewing, speech, and the alignment of neighbouring teeth. Over time, the jawbone in that area can shrink. Modern dentistry offers several fixed and removable solutions.',
    causes: ['Untreated decay or infection', 'Trauma or accident', 'Gum disease leading to tooth loss', 'Failed root canal or fracture'],
    symptoms: ['Visible gap in the smile', 'Difficulty chewing on one side', 'Shifting of nearby teeth', 'Bone loss over time'],
    treatments: [
      { slug: 'dental-implant', name: 'Dental Implant', desc: 'Permanent fixed replacement' },
      { slug: 'denture-conventional', name: 'Conventional Denture', desc: 'Removable replacement option' },
      { slug: 'zirconia-crown', name: 'Bridge / Crown', desc: 'Fixed option when adjacent teeth exist' },
    ],
    whenToVisit: 'Replace missing teeth sooner rather than later to protect bite and bone. We will recommend the best option after examination.',
  },
  broken: {
    id: 'broken',
    title: 'Broken Tooth',
    imageKey: 'broken-tooth',
    tone: 'from-violet-100 to-purple-50',
    overview:
      'A broken or chipped tooth can result from trauma, biting hard objects, or large old fillings. The right treatment depends on how much tooth structure remains.',
    causes: ['Accident or sports injury', 'Biting ice, nuts, or hard candy', 'Large old fillings weakening the tooth', 'Grinding or clenching (bruxism)'],
    symptoms: ['Visible chip or crack', 'Sharp edge irritating the tongue', 'Pain when biting', 'Sensitivity to hot and cold'],
    treatments: [
      { slug: 'composite-veneers', name: 'Composite Veneers / Bonding', desc: 'Minor chips on front teeth' },
      { slug: 'zirconia-crown', name: 'Zirconia Crown', desc: 'Large breaks or back teeth' },
      { slug: 'simple-extraction', name: 'Extraction', desc: 'When tooth cannot be saved' },
    ],
    whenToVisit: 'A broken tooth should be seen quickly — save any broken piece if possible and avoid chewing on that side until your visit.',
  },
  'loose-denture': {
    id: 'loose-denture',
    title: 'Loose Denture',
    imageKey: 'loose-denture',
    tone: 'from-blue-100 to-indigo-50',
    overview:
      'A loose denture slips, rubs sore spots, and makes eating and speaking difficult. This often happens as gums and bone change shape over time, or when a denture was never fitted properly.',
    causes: ['Bone resorption after tooth loss', 'Weight loss changing facial structure', 'Worn or old denture', 'Poor initial fit'],
    symptoms: ['Denture moves when eating or talking', 'Sore spots on gums', 'Clicking sounds', 'Difficulty chewing certain foods'],
    treatments: [
      { slug: 'denture-conventional', name: 'New Conventional Denture', desc: 'Custom replacement' },
      { slug: 'denture-vertax', name: 'Vertax Denture', desc: 'Premium aesthetic option' },
      { slug: 'dental-implant', name: 'Implant-Supported Denture', desc: 'Most stable long-term fix' },
    ],
    whenToVisit: 'Do not use excessive adhesive long-term. Book a visit for relining, adjustment, or a new denture assessment.',
  },
  stained: {
    id: 'stained',
    title: 'Stained Teeth',
    imageKey: 'stained-teeth',
    tone: 'from-teal-100 to-cyan-50',
    overview:
      'Tooth staining comes from food, drinks, tobacco, aging, and certain medications. Surface stains respond well to professional cleaning and whitening; deeper stains may need veneers.',
    causes: ['Coffee, tea, and cola', 'Tobacco use', 'Poor oral hygiene', 'Aging and enamel thinning'],
    symptoms: ['Yellow or brown discolouration', 'Uneven colour across teeth', 'Stains that do not improve with brushing', 'Self-consciousness about smile'],
    treatments: [
      { slug: 'laser-teeth-whitening', name: 'Laser Teeth Whitening', desc: 'Fast in-office brightening' },
      { slug: 'scaling-polishing', name: 'Scaling & Polishing', desc: 'Remove surface stains and tartar' },
      { slug: 'composite-veneers', name: 'Composite Veneers', desc: 'Cover stubborn front-tooth stains' },
    ],
    whenToVisit: 'Professional whitening is safer and more effective than over-the-counter kits. Book an evening slot for a same-day brighter smile.',
  },
}

export function getProblemDetail(id) {
  return PROBLEM_DETAILS[id] || null
}
