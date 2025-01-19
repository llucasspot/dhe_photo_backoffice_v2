export const isRunInStackblitzWebContainer = () =>
  // @ts-expect-error window.__STACKBLITZ__
  window.__STACKBLITZ__ === true;

console.log(
  'isRunInStackblitzWebContainer : ',
  isRunInStackblitzWebContainer(),
);
