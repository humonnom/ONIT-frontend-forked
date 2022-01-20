import { useParams } from 'react-router-dom';

export function getPageUser() {
  const { id } = useParams();
  return id;
}
