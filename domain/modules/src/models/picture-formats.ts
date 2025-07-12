import { pick } from 'lodash';

export const pictureFormats = {
  // Formats classiques :
  '9x13': { cm: '9x13', in: '3.5x5', ratio: '4:3' },
  '10x15': { cm: '10x15', in: '4x6', ratio: '3:2' },
  '13x18': { cm: '13x18', in: '5x7', ratio: '5:7' },
  '15x20': { cm: '15x20', in: '6x8', ratio: '4:3' },
  '20x25': { cm: '20x25', in: '8x10', ratio: '4:5' },
  '20x30': { cm: '20x30', in: '8x12', ratio: '3:2' },

  // Grand format :
  '30x40': { cm: '30x40', in: '12x16', ratio: '4:3' },
  '40x50': { cm: '40x50', in: '16x20', ratio: '4:5' },
  '50x70': { cm: '50x70', in: '20x28', ratio: '5:7' },
  '60x90': { cm: '60x90', in: '24x36', ratio: '3:2' },

  // Formats carrés :
  '10x10': { cm: '10x10', in: '4x4', ratio: '1:1' },
  '20x20': { cm: '20x20', in: '8x8', ratio: '1:1' },
  '30x30': { cm: '30x30', in: '12x12', ratio: '1:1' },

  // Formats panoramiques :
  '10x20': { cm: '10x20', in: '4x8', ratio: '2:1' },
  '15x30': { cm: '15x30', in: '6x12', ratio: '2:1' },
  '20x40': { cm: '20x40', in: '8x16', ratio: '2:1' },
  '30x60': { cm: '30x60', in: '12x24', ratio: '2:1' },
  '40x100': { cm: '40x100', in: '16x40', ratio: '2.5:1' },
  '50x150': { cm: '50x150', in: '20x60', ratio: '3:1' },

  // Passeport et identités :
  '3.5x4.5': { cm: '3.5x4.5', in: '1.4x1.8', ratio: '7:9' },
  '5x5': { cm: '5x5', in: '2x2', ratio: '1:1' },
  '4x4': { cm: '4x4', in: '1.6x1.6', ratio: '1:1' },

  // Formats pour cadres :
  '7x9': { cm: '7x9', in: '2.75x3.5', ratio: '7:9' },
  '11x15': { cm: '11x15', in: '4.3x6', ratio: '11:15' },
  '18x24': { cm: '18x24', in: '7x9.5', ratio: '3:4' },
  '24x30': { cm: '24x30', in: '9.5x12', ratio: '4:5' },
  '30x45': { cm: '30x45', in: '12x18', ratio: '3:2' },

  // Formats papier ISO (A-series) :
  A4: { cm: '21x29.7', in: '8.3x11.7', ratio: '1:1.414' },
  A3: { cm: '29.7x42', in: '11.7x16.5', ratio: '1:1.414' },
  A2: { cm: '42x59.4', in: '16.5x23.4', ratio: '1:1.414' },
  A1: { cm: '59.4x84.1', in: '23.4x33.1', ratio: '1:1.414' },
  A0: { cm: '84.1x118.9', in: '33.1x46.8', ratio: '1:1.414' },
} as const;

export const availablePictureFormats = pick(pictureFormats, [
  // Formats classiques :
  '9x13',
  '10x15',
  '13x18',
  '15x20',
  '20x25',
  '20x30',
  // Grand format :
  '30x40',
  '40x50',
  '50x70',
  '60x90',
  // Formats pour cadres :
  '7x9',
  '11x15',
  '18x24',
  '24x30',
  '30x45',
]);

export type AvailablePictureFormatName = keyof typeof availablePictureFormats;
export type AvailablePictureFormat =
  (typeof availablePictureFormats)[keyof typeof availablePictureFormats];
