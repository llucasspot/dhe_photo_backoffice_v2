import { OmitType } from '@domain/core';

import { CompanyInfoModel } from '../models/company-info.model.ts';

export class CompanyInfoDto extends OmitType(CompanyInfoModel, []) {}
