import api from "./axios";

interface UrlProps {
  purpose: string;
  fileName: string;
  contentType: string;
}

interface UploadProps {
  purpose: string;
  file: string;
}

export const filesUploadUrl = async (props: UrlProps) => {
  const { data } = await api.post(`files/upload-url`, props);
  return data;
};

export const filesUpload = async (datas: UploadProps) => {
  const { data } = await api.post(`files/upload`, datas);
  return data;
};

export const getFilesUploaded = async (datas: UploadProps, key: string) => {
  const { data } = await api.post(`files/url/${key}`, datas);
  return data;
};
