import { useCallback, useState } from 'react';

import { isValidURL } from '@src/libs';
import { shortenUrl } from '../../services/shortUrlService';
import { useMutation } from "@tanstack/react-query";

export const useShortenUrl = () => {
  return useMutation({ mutationFn: shortenUrl });
};

export const useUrlShortener = () => {
  const [urlState, setUrlState] = useState({
    longUrl: "",
    shortUrl: "",
    error: "",
    isCopied: false,
  });

  const mutation = useShortenUrl();

  const shortenUrl = useCallback(() => {
    if (!isValidURL(urlState.longUrl)) {
      setUrlState((prev) => ({ ...prev, error: "Please enter a valid URL" }));
      return;
    }

    setUrlState((prev) => ({ ...prev, error: "" }));

    mutation.mutate(urlState.longUrl, {
      onSuccess: (shortUrl) => setUrlState((prev) => ({ ...prev, shortUrl })),
      onError: (error) => setUrlState((prev) => ({ ...prev, error: error.message })),
    });
  }, [urlState.longUrl, mutation]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(urlState.shortUrl);
    setUrlState((prev) => ({ ...prev, isCopied: true }));
    setTimeout(() => setUrlState((prev) => ({ ...prev, isCopied: false })), 2000);
  }, [urlState.shortUrl]);

  return { urlState, setUrlState, shortenUrl, copyToClipboard };
};