import { Op } from 'sequelize';

import { Filter } from '#mock/domain';

export const operatorMapperSequelize = {
  $equals: ([, , value]) => ({ [Op.eq]: value }),
  $notEquals: ([, , value]) => ({ [Op.ne]: value }),
  $in: ([, , value]) => ({ [Op.in]: value }),
  $like: ([, , value]) => ({ [Op.like]: `%${value}%` }),
} as const satisfies {
  $equals: <TData extends { id: string }>([, , value]: Filter<
    TData,
    '$equals'
  >) => {
    [Op.eq]: typeof value;
  };
  $notEquals: <TData extends { id: string }>([, , value]: Filter<
    TData,
    '$notEquals'
  >) => {
    [Op.ne]: typeof value;
  };
  $in: <TData extends { id: string }>([, , value]: Filter<TData, '$in'>) => {
    [Op.in]: typeof value;
  };
  $like: <TData extends { id: string }>([, , value]: Filter<
    TData,
    '$like'
  >) => {
    [Op.like]: typeof value;
  };
};
