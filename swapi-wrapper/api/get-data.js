import instance from './axios.js';

// filter only vehicles that have pilots.
const vehicleFn = vehicles => vehicles.filter(({ pilots }) => pilots.length > 0);

// extract pilot id's.
const extractId = predicate => +predicate.split('/').filter(item => new RegExp(/\d/).test(item))

// map the vehicle data from the SWAPI api
const mapVehicleData = vehicles => vehicles.map(({ name, pilots, url }) => ({ name, pilots, vehicleId: extractId(url) }));

 
//main entry point.
const dataFetcher = async (url, next, prevData) => {
  try {
    let accumulatedData = prevData ? [...prevData] : [];
    const { data } = await instance.get(`${url}/${next || ''}`);
    
    const filteredData = vehicleFn(data.results);
    const mappedData = mapVehicleData(filteredData);
    accumulatedData = [...accumulatedData, mappedData].flat();

    while (data.next) {
      let page_number = data.next.split('=')[1];
      let next = `?page=${page_number}`;

      return dataFetcher(url, next, accumulatedData);
    }
    return accumulatedData;
  } catch (err) {
    throw err;
  }
};

export default dataFetcher;
