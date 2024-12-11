import { pick } from 'lodash';

export const mediaTypes = {
  paper: {},
  mug: {},
  canvas: {},
  tshirt: {},
};
export const availableMediaTypes = pick(mediaTypes, ['paper']);

export type AvailableMediaTypeName = keyof typeof availableMediaTypes;
export type AvailableMediaType =
  (typeof availableMediaTypes)[keyof typeof availableMediaTypes];
