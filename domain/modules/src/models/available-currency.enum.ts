export const availableCurrencies = ['EUR', 'USD'] as const;

export type AvailableCurrency = (typeof availableCurrencies)[number];

export const availableCurrenciesOptions = availableCurrencies.map(
  (currency) => ({
    value: currency,
    label: currency,
  }),
) satisfies {
  value: AvailableCurrency;
  label: AvailableCurrency;
}[];
