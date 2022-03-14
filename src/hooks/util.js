import { useParams } from 'react-router-dom';

export function useGetUrl() {
  const { id } = useParams();
  return id;
}

export function useGetCode() {
  const { code } = useParams();
  return code;
}
