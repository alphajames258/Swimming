import {
  NYC_50_FREE_2023_2024,
  SWIM_CLOUD,
} from '../../server/firebase/constants';
import { getFirebaseStore } from '../../server/firebase/firebase';

export default async function getStore(req, res) {
  try {
    const swimmersData = await getFirebaseStore(
      SWIM_CLOUD,
      NYC_50_FREE_2023_2024
    );

    res.status(200).json(swimmersData);
  } catch (error) {
    // Handle any errors
    res.status(200).json({ error: error });
  }
}
