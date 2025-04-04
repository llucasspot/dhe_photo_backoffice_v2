import { PropsWithChildren, useEffect } from 'react';

import { Utils } from '../../../_/core/utils.ts';
import { AuthenticateAction } from '../../use-cases/actions/authenticate.action.ts';

import { useAction } from '#action/react';

type OAuthButtonProps = PropsWithChildren<{
  oauthProviderName: 'google';
}>;

type OauthData = {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
};

export const OAuthButton = ({
  oauthProviderName,
  children,
}: OAuthButtonProps) => {
  const authenticateAction = useAction(AuthenticateAction);

  const successCallback = Utils.urlJoin(
    // TODO import.meta.env
    import.meta.env.VITE_FRONT_BASE_URL,
    `/auth/oauth-callback`,
  );
  const authorizeUrl = Utils.urlJoin(
    // TODO import.meta.env
    import.meta.env.VITE_AUTH_SERVICE_BASE_URL,
    `/auth/${oauthProviderName}/authorize?success_callback=${successCallback}`,
  );

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent<{
        type: 'oauth-data';
        oauthData: OauthData;
      }>,
    ) => {
      if (event.origin !== window.origin) {
        return;
      }
      if (event.data.type === 'oauth-data') {
        const oauthData: OauthData = event.data.oauthData;

        if (!oauthData.userId || !oauthData.accessToken) {
          throw new Error('');
        }

        const authResponse = {
          userId: oauthData.userId,
          accessToken: oauthData.accessToken,
          refreshToken: oauthData.refreshToken,
        };
        authenticateAction.mutate(authResponse);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [authenticateAction]);

  const openOAuthWindow = () => {
    const oauthPopupWindow = window.open(
      authorizeUrl,
      '_blank',
      'width=500,height=600',
    );
    if (!oauthPopupWindow) {
      alert('please accept popup on your browser');
    }
  };

  return (
    <>
      <button
        onClick={openOAuthWindow}
        type="button"
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        aria-label={`Sign in with ${oauthProviderName}`}
      >
        {children}
      </button>
    </>
  );
};
