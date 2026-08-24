import axios from "axios";

interface UploadParams {
  uri: string;
  fileName: string;
  contentType: string;
  uploadUrl: string;
  headers?: Record<string, string>;
}

export const uploadToPresignedUrl = async ({
  uri,
  fileName,
  contentType,
  uploadUrl,
  headers = {},
}: UploadParams) => {
  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error("Unable to read selected file");
  }

  const blob = await response.blob();

  await axios.put(uploadUrl, blob);

  return {
    fileName,
    contentType,
  };
};