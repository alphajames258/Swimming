import puppeteer from 'puppeteer';
import { setToFirebase } from './firebase/firebase';
import { NYC_50_FREE_2023_2024, SWIM_CLOUD } from './firebase/constants';

interface Swimmer {
  name: string;
  profileLink: string;
  organization: string;
  time: string;
}

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const allSwimmerData: Swimmer[] = [];

  // Loop through pages 1 to 14
  for (let pageNum = 1; pageNum <= 14; pageNum++) {
    // Construct the URL with the current page number
    const url = `https://www.swimcloud.com/times/?dont_group=false&event=150&gender=M&page=${pageNum}&region=state_NY&season_id=27&team_id&year`;

    // Navigate to the current page
    await page.goto(url);
    await page.waitForSelector('tbody');

    // Extract swimmer data for the current page
    const swimmerData = await page.evaluate(() => {
      const tbody = document.querySelectorAll('tbody')[0];
      const rows = tbody.querySelectorAll('tr');
      const result: Swimmer[] = [];

      for (let i = 0; i < rows.length; i++) {
        let swimmer = rows[i].children;

        const swimmerData: Swimmer = {
          name: '',
          profileLink: '',
          organization: '',
          time: '',
        };
        const name = swimmer[1]?.querySelector('a')?.innerText ?? '';
        const profileLink = swimmer[1]?.querySelector('a')?.href ?? '';
        const organization = swimmer[2]?.querySelector('a')?.innerText ?? '';
        const time = swimmer[4]?.querySelector('a')?.innerText ?? '';

        swimmerData.name = name;
        swimmerData.profileLink = profileLink;
        swimmerData.organization = organization;
        swimmerData.time = time;

        result.push(swimmerData);
      }
      return result;
    });

    // Add swimmer data from the current page to the overall array
    allSwimmerData.push(...swimmerData);

    console.log(`Data from page ${pageNum} collected.`);
  }

  console.log(allSwimmerData, 'All swimmer data collected');
  await setToFirebase(SWIM_CLOUD, NYC_50_FREE_2023_2024, allSwimmerData);

  await browser.close();
})();
