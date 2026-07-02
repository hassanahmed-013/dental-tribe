/** Extended educational content per treatment — shown on /services/:slug */

export const SERVICE_DETAIL_CONTENT = {
  'tooth-colored-filling': {
    whatItIs:
      'A tooth-colored filling repairs decay or minor fractures using composite resin matched to your enamel. It restores shape, strength, and appearance in a single visit.',
    symptoms: ['Sensitivity to hot or cold', 'Visible hole or dark spot', 'Pain when biting', 'Food trapping between teeth'],
    treatmentSteps: ['Numb the area if needed', 'Remove decay and clean the cavity', 'Bond and layer composite resin', 'Shape, polish, and check your bite'],
    aftercare: ['Avoid very hard foods for 24 hours', 'Brush and floss normally', 'Return if sensitivity persists beyond a week'],
  },
  'children-filling': {
    whatItIs:
      'A children’s filling treats cavities in baby or young permanent teeth using gentle, kid-friendly techniques to prevent pain and protect adult teeth later.',
    symptoms: ['Child complains of tooth pain', 'Visible chalky or brown spots', 'Reluctance to chew on one side', 'Sensitivity to sweets'],
    treatmentSteps: ['Explain the procedure calmly', 'Numb the tooth if needed', 'Remove decay carefully', 'Place a safe composite filling and polish'],
    aftercare: ['Soft foods for a few hours', 'Supervise brushing twice daily', 'Regular check-ups every 6 months'],
  },
  'aesthetic-filling': {
    whatItIs:
      'An aesthetic filling is a cosmetic composite restoration that repairs damage while improving the shape, size, and colour of visible teeth.',
    symptoms: ['Chipped or uneven front teeth', 'Small gaps between teeth', 'Worn or shortened teeth', 'Discoloured patches on enamel'],
    treatmentSteps: ['Discuss your desired outcome', 'Prepare the tooth surface minimally', 'Sculpt premium composite in layers', 'Polish for a natural finish'],
    aftercare: ['Avoid biting nails or hard objects', 'Limit staining foods for 48 hours', 'Consider a night guard if you grind teeth'],
  },
  'root-canal': {
    whatItIs:
      'Root canal treatment removes infected pulp from inside a tooth, cleans the canals, and seals them — saving your natural tooth instead of extracting it.',
    symptoms: ['Severe or throbbing toothache', 'Prolonged sensitivity to heat', 'Swelling near the tooth', 'Darkening of the tooth'],
    treatmentSteps: ['X-ray to assess infection', 'Clean root canals under anesthesia', 'Disinfect and fill canals', 'Place filling; crown may follow'],
    aftercare: ['Mild soreness for 2–3 days is normal', 'Chew on the opposite side initially', 'Complete crown placement if recommended'],
  },
  're-root-canal': {
    whatItIs:
      'Re-root canal (retreatment) addresses infection that returns after a previous root canal, giving the tooth a second chance before extraction.',
    symptoms: ['Pain in a previously treated tooth', 'Swelling or gum boil', 'Biting discomfort', 'X-ray shows persistent infection'],
    treatmentSteps: ['Remove old filling material', 'Re-clean and disinfect canals', 'Seal with new filling material', 'Plan crown for long-term protection'],
    aftercare: ['Take prescribed medication if given', 'Avoid chewing on treated tooth initially', 'Attend follow-up as advised'],
  },
  'zirconia-crown': {
    whatItIs:
      'A zirconia crown is a metal-free cap placed over a damaged tooth to restore strength, shape, and a natural appearance with excellent durability.',
    symptoms: ['Large filling or root canal tooth', 'Cracked or heavily worn tooth', 'Severely discoloured tooth', 'Tooth weakened after decay'],
    treatmentSteps: ['Prepare and shape the tooth', 'Take digital or physical impressions', 'Fit a temporary crown', 'Cement the final zirconia crown'],
    aftercare: ['Avoid sticky foods with temporary crown', 'Brush gently around the gum line', 'Report any bite discomfort promptly'],
  },
  'pfm-crown': {
    whatItIs:
      'A PFM (porcelain-fused-to-metal) crown combines a strong metal base with a natural porcelain exterior for reliable restoration of back teeth.',
    symptoms: ['Broken or heavily filled molar', 'Tooth needs crown after root canal', 'Old crown needs replacement', 'Chewing difficulty'],
    treatmentSteps: ['Tooth preparation under anesthesia', 'Impressions for lab fabrication', 'Temporary crown placement', 'Final crown cementation and bite check'],
    aftercare: ['Avoid hard foods on temporary crown', 'Maintain good oral hygiene', 'Regular dental check-ups'],
  },
  'crown-removal': {
    whatItIs:
      'Crown removal is a careful procedure to take off an existing crown so the underlying tooth can be re-treated, re-filled, or receive a new crown.',
    symptoms: ['Crown feels loose or damaged', 'Decay under an old crown', 'Need for root canal retreatment', 'Replacing an ill-fitting crown'],
    treatmentSteps: ['Assess crown and tooth condition', 'Section and remove crown safely', 'Clean and examine the tooth', 'Plan next restorative step'],
    aftercare: ['Tooth may be sensitive temporarily', 'Avoid chewing on that side until restored', 'Proceed with planned treatment promptly'],
  },
  'simple-extraction': {
    whatItIs:
      'Simple extraction removes a visible, accessible tooth that cannot be saved — performed gently under local anesthesia with clear aftercare guidance.',
    symptoms: ['Severely decayed tooth', 'Loose baby tooth not falling out', 'Orthodontic extraction need', 'Non-restorable fracture'],
    treatmentSteps: ['Numb the area completely', 'Loosen and remove the tooth', 'Clean the socket', 'Place gauze and explain healing steps'],
    aftercare: ['Bite on gauze for 30–45 minutes', 'No spitting or straws for 24 hours', 'Soft diet and prescribed pain relief if needed'],
  },
  'surgical-extraction': {
    whatItIs:
      'Surgical extraction is for impacted, broken, or hard-to-reach teeth — including wisdom teeth — requiring a small incision and expert technique.',
    symptoms: ['Impacted wisdom tooth', 'Broken tooth below gum line', 'Repeated gum infection around tooth', 'Severe crowding'],
    treatmentSteps: ['X-ray and treatment planning', 'Anesthesia and gum access', 'Section and remove tooth carefully', 'Suture and detailed aftercare instructions'],
    aftercare: ['Rest for 24–48 hours', 'Ice packs to reduce swelling', 'Soft foods and gentle rinsing after 24 hours', 'Attend follow-up if sutures used'],
  },
  'scaling-polishing': {
    whatItIs:
      'Scaling and polishing is a professional deep clean that removes plaque, tartar, and surface stains — essential for healthy gums and fresh breath.',
    symptoms: ['Bleeding gums when brushing', 'Visible tartar buildup', 'Bad breath', 'Yellow or stained teeth surface'],
    treatmentSteps: ['Examine gums and teeth', 'Ultrasonic scaling to remove tartar', 'Polish tooth surfaces', 'Fluoride or hygiene advice if needed'],
    aftercare: ['Mild sensitivity for 1–2 days is normal', 'Brush twice and floss daily', 'Schedule cleaning every 6 months'],
  },
  'denture-conventional': {
    whatItIs:
      'A conventional denture replaces missing teeth with a custom removable appliance designed for comfort, function, and a natural smile.',
    symptoms: ['Multiple missing teeth', 'Difficulty chewing', 'Sunken facial appearance', 'Loose or worn old denture'],
    treatmentSteps: ['Impressions and bite records', 'Try-in for fit and appearance', 'Final denture delivery', 'Adjustment visits as needed'],
    aftercare: ['Remove and clean denture nightly', 'Soak in denture solution', 'Return for adjustments if sore spots develop'],
  },
  'denture-vertax': {
    whatItIs:
      'Vertax dentures use premium materials for enhanced aesthetics and durability — a higher-quality removable option for missing teeth.',
    symptoms: ['Want better denture aesthetics', 'Current denture looks unnatural', 'Need durable replacement teeth', 'Multiple missing teeth'],
    treatmentSteps: ['Detailed impressions and shade selection', 'Custom fabrication in lab', 'Fitting and bite adjustment', 'Follow-up comfort checks'],
    aftercare: ['Handle with care when cleaning', 'Regular dental check-ups', 'Report looseness early for relining'],
  },
  'dental-implant': {
    whatItIs:
      'A dental implant is a titanium post placed in the jawbone that supports a crown — the closest replacement to a natural tooth in look and function.',
    symptoms: ['Single or multiple missing teeth', 'Difficulty chewing', 'Bone loss in gap area', 'Want a fixed non-removable solution'],
    treatmentSteps: ['CT scan and treatment planning', 'Implant placement surgery', 'Healing period for bone integration', 'Crown or bridge attachment'],
    aftercare: ['Soft diet after surgery', 'Excellent oral hygiene around implant', 'Avoid smoking for best healing', 'Regular maintenance visits'],
  },
  'laser-teeth-whitening': {
    whatItIs:
      'Laser teeth whitening is an in-office treatment that lifts years of stains safely in one session using professional-grade gel and light activation.',
    symptoms: ['Yellow or dull teeth', 'Coffee, tea, or tobacco stains', 'Uneven tooth colour', 'Want fast visible results'],
    treatmentSteps: ['Shade assessment and gum protection', 'Apply whitening gel', 'Activate with laser/light', 'Final polish and aftercare advice'],
    aftercare: ['Avoid staining foods for 48 hours', 'Use sensitivity toothpaste if needed', 'Maintain with good hygiene and touch-ups'],
  },
  'post-buildup': {
    whatItIs:
      'Post buildup adds a fiber post and composite core to a root-canalled tooth that lacks enough structure to hold a crown securely.',
    symptoms: ['Root canal done but tooth is hollow', 'Large portion of tooth missing', 'Crown needed but little tooth left', 'Fractured tooth after root canal'],
    treatmentSteps: ['Place fiber post in canal', 'Build up core with composite', 'Shape for crown preparation', 'Plan crown placement'],
    aftercare: ['Avoid biting hard foods until crowned', 'Temporary restoration may be placed', 'Complete crown as soon as advised'],
  },
  'composite-veneers': {
    whatItIs:
      'Composite veneers are sculpted directly onto teeth chairside to reshape, close gaps, and brighten your smile — affordable and often done in one visit.',
    symptoms: ['Chipped or uneven front teeth', 'Gaps between teeth', 'Mild discoloration', 'Want same-day smile improvement'],
    treatmentSteps: ['Smile design discussion', 'Minimal tooth preparation', 'Layer and sculpt composite', 'Polish and refine shape'],
    aftercare: ['Avoid biting hard objects', 'Limit coffee and tea initially', 'Repairable if chipped — return for touch-ups'],
  },
  'emax-veneers': {
    whatItIs:
      'Emax veneers are ultra-thin porcelain shells custom-made in a lab for a premium, long-lasting smile makeover with natural light reflection.',
    symptoms: ['Severely stained or misshapen front teeth', 'Want Hollywood-grade aesthetics', 'Desire stain-resistant porcelain', 'Multiple cosmetic concerns'],
    treatmentSteps: ['Digital smile design', 'Minimal enamel preparation', 'Impressions sent to lab', 'Bond final Emax veneers'],
    aftercare: ['Wear night guard if you grind', 'Avoid biting nails or ice', 'Regular check-ups to monitor veneers'],
  },
}

export function getServiceDetailContent(slug) {
  return SERVICE_DETAIL_CONTENT[slug] || null
}
