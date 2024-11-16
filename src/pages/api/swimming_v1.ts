import {
  NYC_50_FREE_2023_2024,
  SWIM_CLOUD,
} from '../../server/firebase/constants';
import { getFirebaseStore } from '../../server/firebase/firebase';

export default async function getStore(req, res) {
  try {
    let swimmers: any = [];
    const { event } = req.body; // Extract the event value from the request body

    // Assuming event.data is an array of events
    for (const evt of event.data) {
      const swimmersData = await getFirebaseStore(SWIM_CLOUD, evt);
      if (swimmersData) {
        swimmersData.event = evt;
      }
      swimmers = [...swimmers, swimmersData];
    }

    res.status(200).json(swimmers);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching swimmers data:', error);
    res.status(500).json({ error: error.message });
  }
}
