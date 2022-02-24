import { useParams } from 'react-router-dom';

export function useGetUrl() {
  const { id } = useParams();
  return id;
}
