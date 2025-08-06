// src/utils/mockData.js
const mockData = [
  {
    nida: '1234567890',
    name: 'John Doe',
    dob: '15/05/1988',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=150&h=150', // Picha ya mfano
    issueDate: '10/01/2014',
    usedIn: [
      { name: 'TRA', description: 'NIDA used for tax registration and verification on 12/03/2015.' },
      { name: 'Immigration', description: 'NIDA used for passport application and border identity confirmation on 22/07/2016.' },
      { name: 'Police', description: 'NIDA used for police clearance and criminal records check on 05/09/2017.' },
      { name: 'Magereza', description: 'NIDA used to track prisoner or visitor identities starting from 18/11/2018.' },
      { name: 'Ajira', description: 'NIDA used in job application and verification on 03/04/2019.' },
      { name: 'Driving license', description: 'NIDA used for issuing and renewing driving licenses on 25/06/2020.' }
    ]
  },
  {
    nida: '9876543210',
    name: 'Jane Smith',
    dob: '22/10/1995',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150', // Picha ya mfano
    issueDate: '05/08/2018',
    usedIn: [
      { name: 'Ajira', description: 'NIDA used in employment registration for government service on 15/01/2020.' },
      { name: 'Police', description: 'NIDA required for police clearance form processing on 20/02/2021.' }
    ]
  },
  {
    nida: '1122334455',
    name: 'Peter Pan',
    dob: '01/01/1990',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=150&h=150', // Picha ya mfano
    issueDate: '12/05/2012',
    usedIn: [
      { name: 'TRA', description: 'Used to register individual tax accounts on 01/03/2013.' },
      { name: 'Immigration', description: 'Passport registration linked to NIDA on 10/04/2014.' },
      { name: 'Driving license', description: 'Used for license record tracking and renewal on 20/09/2015.' }
    ]
  },
  {
    nida: '5566778899',
    name: 'Sarah Connor',
    dob: '07/07/1985',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=150&h=150', // Picha ya mfano
    issueDate: '25/03/2010',
    usedIn: [
      { name: 'Police', description: 'Referenced in national police ID system during a vehicle registration on 15/06/2012.' },
      { name: 'Magereza', description: 'Prison service records link to NIDA for a visitor access pass on 30/11/2014.' }
    ]
  }
];

export default mockData;