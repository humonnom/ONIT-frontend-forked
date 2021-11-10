import { parse } from 'dotenv';
import { useParams } from 'react-router-dom';

export function getPageUser() {
  const { id } = useParams();
  console.log(id);
  return id;
}
