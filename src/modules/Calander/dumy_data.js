export const events = [
  {
    id: 1,
    title: 'Hair cut',
    start: new Date(2018, 0, 29, 0, 30, 0),
    end: new Date(2018, 0, 29, 1, 0, 0),
    resourceId: 1,
    hexColor: 'FFFF00',
  },
  {
    id: 2,
    title: 'Facial',
    start: new Date(2018, 0, 29, 2, 30, 0),
    end: new Date(2018, 0, 29, 3, 0, 0),
    resourceId: 2,
    hexColor: '00FF00',
  },
  {
    id: 3,
    title: 'Facial',
    start: new Date(2018, 0, 29, 0, 30, 0),
    end: new Date(2018, 0, 29, 1, 0, 0),
    resourceId: 3,
    hexColor: '00FF00',
  },
  {
    id: 4,
    title: 'Hair cut',
    start: new Date(2018, 0, 29, 0, 30, 0),
    end: new Date(2018, 0, 29, 1, 0, 0),
    resourceId: 4,
    hexColor: 'FFFF00',
  },
];

export const resourceMap = [
  { resourceId: 1, resourceTitle: 'Leo Messi' },
  { resourceId: 2, resourceTitle: 'Wendy Smith' },
  { resourceId: 3, resourceTitle: 'Tommy' },
  { resourceId: 4, resourceTitle: 'Jack' },
];

export const startTime = [
  { value: '00:00:00', label: '00.00' },
  { value: '00:05:00', label: '00.05' },
  { value: '00:10:00', label: '00.10' },
  { value: '00:15:00', label: '00.15' },
  { value: '00:20:00', label: '00.20' },
  { value: '00:25:00', label: '00.25' },
  { value: '00:30:00', label: '00.30' },
  { value: '00:35:00', label: '00.35' },
  { value: '00:40:00', label: '00.40' },
  { value: '00:45:00', label: '00.45' },
  { value: '00:50:00', label: '00.50' },
  { value: '00:55:00', label: '00.55' },
];

export const duration = [
  { value: '5', label: '5min' },
  { value: '10', label: '10min' },
  { value: '15', label: '15min' },
  { value: '20', label: '20min' },
  { value: '25', label: '25min' },
  { value: '30', label: '30min' },
  { value: '35', label: '35min' },
  { value: '40', label: '40min' },
  { value: '45', label: '45min' },
  { value: '50', label: '50min' },
  { value: '55', label: '55min' },

  { value: '60', label: '1h' },
  { value: '65', label: '1h 5min' },
  { value: '70', label: '1h 10min' },
  { value: '75', label: '1h 15min' },
  { value: '80', label: '1h 20min' },
  { value: '85', label: '1h 25min' },
  { value: '90', label: '1h 30min' },
  { value: '95', label: '1h 35min' },
  { value: '100', label: '1h 40min' },
  { value: '105', label: '1h 45min' },
  { value: '110', label: '1h 50min' },
  { value: '115', label: '1h 55min' },

  { value: '120', label: '2h' },
  { value: '135', label: '2h 15min' },
  { value: '150', label: '2h 30min' },
  { value: '165', label: '2h 45min' },

  { value: '180', label: '3h' },
  { value: '195', label: '3h 15min' },
  { value: '210', label: '3h 30min' },
  { value: '225', label: '3h 45min' },

  { value: '240', label: '4h' },
  { value: '270', label: '4h 30min' },

  { value: '300', label: '5h' },
  { value: '330', label: '5h 30min' },

  { value: '360', label: '6h' },
  { value: '390', label: '6h 30min' },

  { value: '420', label: '7h' },
  { value: '450', label: '7h 30min' },

  { value: '480', label: '8h' },
  { value: '540', label: '9h' },
  { value: '600', label: '10h' },
  { value: '660', label: '11h' },
  { value: '720', label: '12h' },
];

export const teamMember = [
  { value: 'Leo Messi', label: 'Leo Messi' },
  { value: 'Wendy Smith', label: 'Wendy Smith' },
];

export const services = [
  {
    title: 'Hair',
    types: [
      {
        name: `Women's hair cut`,
        value: 1,
        duration: 50,
        price: 40,
      },
      {
        name: `Men's hair cut`,
        value: 2,
        duration: 50,
        price: 40,
      },
    ],
  },
  {
    title: 'Nail',
    types: [
      {
        name: `Manicure`,
        value: 3,
        duration: 30,
        price: 25,
      },
      {
        name: `Pedicure`,
        value: 4,
        duration: 40,
        price: 30,
      },
    ],
  },
];
