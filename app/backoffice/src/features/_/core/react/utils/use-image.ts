/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-expressions */

import { useLayoutEffect, useRef, useState } from 'react';

// from https://github.com/konvajs/use-image

export function useImage(
  url: string,
  crossOrigin?: string,
  referrerpolicy?: string,
) {
  // lets use refs for image and status
  // so we can update them during render
  // to have instant update in status/image when new data comes in
  const statusRef = useRef('loading');
  const imageRef = useRef<HTMLImageElement>(undefined);

  // we are not going to use token
  // but we need to just to trigger state update
  const [_, setStateToken] = useState(0);

  // keep track of old props to trigger changes
  const oldUrl = useRef<string>(undefined);
  const oldCrossOrigin = useRef<string>(undefined);
  const oldReferrerPolicy = useRef<string>(undefined);
  if (
    oldUrl.current !== url ||
    oldCrossOrigin.current !== crossOrigin ||
    oldReferrerPolicy.current !== referrerpolicy
  ) {
    statusRef.current = 'loading';
    imageRef.current = undefined;
    oldUrl.current = url;
    oldCrossOrigin.current = crossOrigin;
    oldReferrerPolicy.current = referrerpolicy;
  }

  useLayoutEffect(
    function () {
      if (!url) return;
      const img = document.createElement('img');

      function onload() {
        statusRef.current = 'loaded';
        imageRef.current = img;
        setStateToken(Math.random());
      }

      function onerror() {
        statusRef.current = 'failed';
        imageRef.current = undefined;
        setStateToken(Math.random());
      }

      img.addEventListener('load', onload);
      img.addEventListener('error', onerror);
      crossOrigin && (img.crossOrigin = crossOrigin);
      referrerpolicy && (img.referrerPolicy = referrerpolicy);
      img.src = url;

      return function cleanup() {
        img.removeEventListener('load', onload);
        img.removeEventListener('error', onerror);
      };
    },
    [url, crossOrigin, referrerpolicy],
  );

  // return array because it is better to use in case of several useImage hooks
  // const [background, backgroundStatus] = useImage(url1);
  // const [patter] = useImage(url2);
  return [imageRef.current, statusRef.current] as const;
}
