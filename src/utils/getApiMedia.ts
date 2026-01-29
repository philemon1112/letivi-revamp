process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

export const getApiMedia = (media: string) => {
  return `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${media}`;
};
