export const primaryColor = '#0f2439';
export const elevatedBG = '#F7F8FB';
export const contrastColor = '#000000';


export const settings = [
  {
    id: 'bg',
    type: 'dropdown',
    text: 'Theme',
    title: 'Choose theme',
    items: [
      { label: 'Light', value: '#fafafa' },
      { label: 'Dark', value: '#121212' },
      { label: 'Classic', value: '#f8f1e3' },
      { label: 'Silver', value: '#bebebe' },
      { label: 'Grey', value: '#5a5a5c' },
    ],
  },
  {
    id: 'size',
    type: 'slider',
    text: 'Font Size',
    title: 'Choose font size',
    minValue: 14,
    maxValue: 24,
    step: 1,
    convertFunc: function (val) {
      return val + 'px';
    },
    convertBackward: function (val) {
      return parseInt(val.substr(0, val.length - 2));
    }
  },
  {
    id: 'height',
    type: 'slider',
    text: 'Line Height',
    title: 'Choose line height',
    minValue: 1.4,
    maxValue: 2.4,
    step: 0.2,
    convertFunc: function (val) {
      return Math.round(val * 10) / 10;
    },
    convertBackward: function (val) {
      return val;
    }
  },
];


export const globalSettings = [
  {
    id: 'fontFamily',
    text: 'Font',
    title: 'Choose font',
    items: [
      { label: 'Arial', value: 'Arial' },
      { label: 'Circular', value: 'Circular' },
      { label: 'Circular - Bold', value: 'CircularBold' },
      { label: 'Circular - Light', value: 'CircularLight' },
      { label: 'Playfair Display', value: 'PlayfairDisplay-Bold' },
      { label: 'Roboto', value: 'Roboto-Regular' },

      { label: 'Times New Roman', value: 'TimesNewRoman' },
    ],
  },
];
