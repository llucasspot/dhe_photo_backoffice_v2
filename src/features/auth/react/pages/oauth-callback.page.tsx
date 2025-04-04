import { useEffect } from 'react';

export const OAuthCallbackPage = () => {
  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const userId = urlParams.get('userId');
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');

      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'oauth-data',
            oauthData: {
              userId,
              accessToken,
              refreshToken,
            },
          },
          '*',
        ); // Replace '*' with the actual parent origin for security
        window.close();
      }
    };

    exchangeCodeForToken();
  }, []);

  return (
    <div>
      <h1>OAuth Callback</h1>
      <p>Processing...</p>
    </div>
  );
};
