import { useEffect, useState } from 'react';
import { useInstance } from '@mygoodstack/di-react/dist';

import { PictureControllerServicePort } from '#features/files/domain';

type BlobViewerProps = {
  pictureId: string;
};

export const BlobViewer = ({ pictureId }: BlobViewerProps) => {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const pictureControllerService = useInstance(PictureControllerServicePort);

  useEffect(() => {
    if (!pictureId) {
      return () => {};
    }
    pictureControllerService
      .getPictureById(pictureId)
      .then(({ blob }) => {
        setBlob(blob);
      })
      .catch((err) => console.log(err));
    return () => {};
  }, [pictureControllerService, pictureId]);

  useEffect(() => {
    if (!blob) {
      return () => {};
    }
    if (blob.type.startsWith('text')) {
      blob.text().then(setContent);
    } else {
      const objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup URL when component unmounts
    }
  }, [blob]);

  if (!blob) {
    return <p>No Blob</p>;
  }

  if (blob.type.startsWith('text') && content) {
    return <pre>{content}</pre>;
  }

  if (blob.type.startsWith('image') && url) {
    return <img src={url} alt="Blob Preview" style={{ maxWidth: '100%' }} />;
  }

  if (blob.type.startsWith('video') && url) {
    return <video src={url} controls style={{ maxWidth: '100%' }} />;
  }

  if (blob.type.startsWith('audio') && url) {
    return <audio src={url} controls />;
  }

  if (blob.type === 'application/pdf' && url) {
    return <iframe src={url} style={{ width: '100%', height: '500px' }} />;
  }

  return <p>Unsupported Blob type: {blob.type}</p>;
};
