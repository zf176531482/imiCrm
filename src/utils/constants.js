export const INDUSTRY = [
  'Fossil',
  'Oil & Gas',
  'Nuclear',
  'Desalination',
  'Iron & Steel',
  'Non-Industrial',
  'Petrochemical',
  'Power',
  'Other',
];

export const PLANT_TYPE = [
  'Clean Water',
  'Biomass',
  'Chemical',
  'Coal',
  'Combined Cycle Power',
  'Combined Heat & Power',
  'Downstream',
  'Fertiliser',
  'Glass',
  'Iron & Steel',
  'LNG',
  'Marine',
  'Midstream',
  'Mining',
  'Non-Industrial',
  'Nuclear',
  'Oil',
  'Oil & Gas',
  'Other',
  'Paper & Pulp',
  'Plastic',
  'Refining',
  'Sanitation',
  'Solar',
  'Sugar',
  'Upstream',
  'Waste',
  '--',
];

export const PRODUCT_TYPE = ['Control Valve', 'BTG'];

export function contactFilter() {
  return [
    {
      name: 'Dept',
      key: 'dept',
      data: [
        { name: 'AFM Inside Sales' },
        { name: 'Aftermarket Engineer' },
        { name: 'Aftermarket Outside Sales' },
        { name: 'Engineering' },
        { name: 'Executive' },
        { name: 'Operation' },
        { name: 'Service Center' },
      ],
    },
    {
      name: 'Job Title',
      key: 'job_title',
      data: [
        { name: 'AFM Initiatives Manager' },
        { name: 'Applicationl Engineer' },
        { name: 'China MD' },
        { name: 'Commissioning Engineer' },
        { name: 'Design Engineer' },
        { name: 'Designer' },
        { name: 'Field Service Engineer' },
        { name: 'Field Service Specialist' },
        { name: 'Outside Sales Engineer' },
        { name: 'Sales Engineer' },
        { name: 'Sr. Application Engineer' },
        { name: 'Sr. Designer' },
      ],
    },
    {
      name: 'Location',
      key: 'location',
      data: [
        { name: 'Beijing' },
        { name: 'Jinan' },
        { name: 'Langfang' },
        { name: 'Shanghai' },
        { name: 'Wuhan' },
      ],
    },
  ];
}

export function assetFilter() {
  return [
    {
      name: 'Industry',
      key: 'industry',
      data: [
        { name: 'AFM Inside Sales' },
        { name: 'Aftermarket Engineer' },
        { name: 'Aftermarket Outside Sales' },
        { name: 'Engineering' },
        { name: 'Executive' },
        { name: 'Operation' },
        { name: 'Service Center' },
      ],
    },
    {
      name: 'Plant Name',
      key: 'plant_name',
      data: [
        { name: 'AFM Initiatives Manager' },
        { name: 'Applicationl Engineer' },
        { name: 'China MD' },
        { name: 'Commissioning Engineer' },
        { name: 'Design Engineer' },
        { name: 'Designer' },
        { name: 'Field Service Engineer' },
        { name: 'Field Service Specialist' },
        { name: 'Outside Sales Engineer' },
        { name: 'Sales Engineer' },
        { name: 'Sr. Application Engineer' },
        { name: 'Sr. Designer' },
      ],
    },
    {
      name: 'Plant Type',
      key: 'plant_type',
      data: [
        { name: 'AFM Initiatives Manager' },
        { name: 'Applicationl Engineer' },
        { name: 'China MD' },
        { name: 'Commissioning Engineer' },
        { name: 'Design Engineer' },
        { name: 'Designer' },
        { name: 'Field Service Engineer' },
        { name: 'Field Service Specialist' },
        { name: 'Outside Sales Engineer' },
        { name: 'Sales Engineer' },
        { name: 'Sr. Application Engineer' },
        { name: 'Sr. Designer' },
      ],
    },
    {
      name: 'Product Type',
      key: 'product_type',
      data: [
        { name: 'Beijing' },
        { name: 'Jinan' },
        { name: 'Langfang' },
        { name: 'Shanghai' },
        { name: 'Wuhan' },
      ],
    },
  ];
}
