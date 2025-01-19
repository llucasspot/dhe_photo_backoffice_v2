// @ts-expect-error window.__STACKBLITZ__
export const isRunInStackblitzWebContainer = window.__STACKBLITZ__ === true;

console.log('isRunInStackblitzWebContainer : ', isRunInStackblitzWebContainer);
