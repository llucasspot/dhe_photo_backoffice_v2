import { OmitType } from '@domain/core';

import { PersonalInfoModel } from '../models/personal-info.model.ts';

export class PersonalInfoDto extends OmitType(PersonalInfoModel, []) {}
