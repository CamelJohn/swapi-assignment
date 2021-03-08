import getText from '../api/get-scrolling-text.js';
import getData from '../api/get-data.js';
import getPilotData from '../api/fetch-pilot-data.js';
import getPlanetData from '../api/get-chart-data.js';

export default {
  getScrollingText: async (req, res, next) => {
    try {
      const scrollingTextArray = await getText();

      if (!scrollingTextArray) {
        return res.status(404).json({ message: 'No content found.' });
      }

      res.status(200).send(scrollingTextArray);
    } catch (err) {
      throw err;
    }
  },
  getTableData: async (req, res, next) => {
    try {
      const vehicleData = await getData('vehicles');
      const pilotData = await getPilotData(vehicleData);
      res.status(200).send(pilotData);

    } catch (err) {
      throw err;
    }
  },
  getChartData: async (req, res, next) => {
    try {
      const getChartData = await getPlanetData();
      res.status(200).send(getChartData)
    } catch (err) {
      throw err;
    }
  }
}