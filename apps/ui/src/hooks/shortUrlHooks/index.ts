import { useCallback, useState } from 'react';

import { isValidURL } from '@src/libs';
import { shortenUrl } from '../../services/shortUrlService';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '../../app/hooks/user';

export const useShortenUrl = () => {
  return useMutation({ mutationFn: shortenUrl });
};

export const useUrlShortener = () => {
  const { user } = useUser();
  const [urlState, setUrlState] = useState({
    longUrl: '',
    shortUrl: '',
    error: '',
    isCopied: false,
  });

  const mutation = useShortenUrl();

  // Callback to shorten the URL
  const shortenUrl = useCallback(() => {
    if (!isValidURL(urlState.longUrl)) {
      setUrlState((prev) => ({ ...prev, error: 'Please enter a valid URL' }));
      return;
    }

    setUrlState((prev) => ({ ...prev, error: '' }));

    if (user?.id) {
      mutation.mutate(
        {
          longUrl: urlState.longUrl,
          userId: user?.id,
        },
        {
          onSuccess: (shortUrl) =>
            setUrlState((prev) => ({ ...prev, shortUrl })),
          onError: (error) =>
            setUrlState((prev) => ({ ...prev, error: error.message })),
        }
      );
    }
  }, [urlState.longUrl, mutation, user?.id]);

  // Callback to copy the short URL to the clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(urlState.shortUrl);
    setUrlState((prev) => ({ ...prev, isCopied: true }));
    setTimeout(
      () => setUrlState((prev) => ({ ...prev, isCopied: false })),
      2000
    );
  }, [urlState.shortUrl]);

  return { urlState, setUrlState, shortenUrl, copyToClipboard };
};
