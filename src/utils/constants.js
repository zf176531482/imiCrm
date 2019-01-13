export const PRODUCT_TYPE = ['Control Valve', 'BTG', 'Turbine Bypass System', 'Attemporator'];

export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

export const OPPORTUNITY_STATUS = {
  0: 'Proposal',
  1: 'Sales Lead',
  2: 'Negotiation',
  3: 'Qualification',
};

export const VALUE_TYPE = {
  application: 'Application',
  maker: 'Maker',
  model: 'Model',
  product_type: 'Product Type',
  success_case_no: 'Success Case No',
  typical_problem: 'Typical Problem',
};

export const DATA_BASE = {
  CONTACT: 'contact',
  ASSET: 'asset',
  REPORT: 'asset',
  OPP: 'opp',
  VALUES: 'complete_values',
  PLANT_INPUT: 'plant_input',
};

export const filterType = () => {
  return {
    contact: [
      {
        name: 'Dept',
        key: 'dept',
        options: [],
        selectValue: '',
      },
      {
        name: 'Job Title',
        key: 'job_title',
        options: [],
        selectValue: '',
      },
      {
        name: 'Location',
        key: 'location',
        options: [],
        selectValue: '',
      },
    ],
    asset: [
      {
        name: 'Industry',
        key: 'industry',
        options: [],
        selectValue: '',
      },
      {
        name: 'Plant Name',
        key: 'plant_name',
        options: [],
        selectValue: '',
      },
      {
        name: 'Application',
        key: 'application',
        options: [],
        selectValue: '',
      },
      {
        name: 'Product Type',
        key: 'product_type',
        options: [],
        selectValue: '',
      },
      {
        name: 'Model',
        key: 'model',
        options: [],
        selectValue: '',
      },
    ],
    report: [
      {
        name: 'Industry',
        key: 'industry',
        options: [],
        selectValue: '',
      },
      {
        name: 'Plant Type',
        key: 'plant_type',
        options: [],
        selectValue: '',
      },
      {
        name: 'Plant Name',
        key: 'plant_name',
        options: [],
        selectValue: '',
      },
    ],
    opportunity: [
      {
        name: 'Industry',
        key: 'industry',
        options: [],
        selectValue: '',
      },
      {
        name: 'Plant Type',
        key: 'plant_type',
        options: [],
        selectValue: '',
      },
      {
        name: 'Application',
        key: 'application',
        options: [],
        selectValue: '',
      },
      {
        name: 'Product Type',
        key: 'product_type',
        options: [],
        selectValue: '',
      },
      {
        name: 'Upgrade Type',
        key: 'upgrade_type',
        options: [],
        selectValue: '',
      },
    ],
    values: [
      {
        name: 'Application',
        key: 'application',
        options: [],
        selectValue: '',
      },
      {
        name: 'Product Type',
        key: 'product_type',
        options: [],
        selectValue: '',
      },
    ],
  };
};

export const oppCreatType = () => {
  return [
    {
      name: 'Industry',
      key: 'industry',
      options: [],
      selectValue: '',
    },
    {
      name: 'Plant Type',
      key: 'plant_type',
      options: [],
      selectValue: '',
    },
    {
      name: 'Application',
      key: 'application',
      options: [],
      selectValue: '',
    },
    {
      name: 'Product Type',
      key: 'product_type',
      options: ['Control Valve', 'BTG', 'Turbine Bypass System', 'Attemporator'],
      selectValue: '',
    },
  ];
};
