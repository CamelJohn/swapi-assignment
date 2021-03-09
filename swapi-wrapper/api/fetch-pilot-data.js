import instance from './axios.js';

// regular expression to extract the number part of a url on the api (returns url's)
const idRegex = item => new RegExp(/\d/).test(item);

// helper method to operate on url's recieved from the api
const splitURL = url => url.split('/');

// for code reusability -> calls the endpoint with the parameters (The endpoint is a path in the SWAPI API)
const fetchMetaData = async (id, endpoint) => await instance.get(`/${endpoint}/${id}/`);

// makes use of smaller helper functions to return the Id of an entity as a number.
const mapID = entity => Number(splitURL(entity).filter(item => idRegex(item)))

// handles the case of an array of url's containing id's.
const mapIDs = entity => entity.map(entity => mapID(entity));

// returns the pilots object with the data retreived from the extra api calls to SWAPI. 
const remapPilotsData = pilots => pilots.map(({ name, pilots, vehicleId }) => ({ name, pilots: mapIDs(pilots), vehicleId })).flat();

// one of the main functions -> to "add" to the existing object only the data needed from the API
// turning the urls into metadata.
const mapPilotsData = async pilotArray => {
  return (await Promise.all(pilotArray.map(async ({ name: vehicle, pilots, vehicleId }) => {
    const pilot = (await Promise.all(pilots.map(async pilotID => {
      const { data: { homeworld, name: pilotName, url: pilotId } } = await fetchMetaData(pilotID, 'people');
      return { homeworldId: mapID(homeworld), pilotName, pilotId: mapID(pilotId) }
    }))).flat()    
    return { vehicle, vehicleId, pilots: [...pilot]}
  }))).flat()
}

// same, but for the planets data urls.
const mapPlanetsData = async pilotsArray => await Promise.all(pilotsArray.map(async row => {
  const pilot = await Promise.all(row.pilots.map(async pilotRow => {
    const { data: { name, population }} = await fetchMetaData(pilotRow.homeworldId, 'planets');
    return { homeworldName: name, homeworldPopulation: population, ...pilotRow }
  }))
  return { ...row, pilots: [...pilot]}
}))

// checks for the length of an array.
const isSingle = array => array.length === 1;

// some planets & populations are 'unknown' this helps handle them.
const isUnknown = array => array.includes('unknown');

// helper function to map the populations relevant to vehicles & pilots
const mapSumPopulation = array => array.reduce((prev, next) => Number(prev) + Number(next));

// makes use of smalle helper functions. not readable i guess, but it gets the job done. sum's up the total population of a given vehicle & pilot relation.
const sumPopulation = population => isSingle(population) ? isUnknown(population) ? -1 : population.pop() : isUnknown(population) ? -1 : mapSumPopulation(population).toString()

// helps map homeworld population of a given vehicle
const mapPopulation = vehicles => vehicles.map(vehicle => {
    let population = [];
    const pilot = vehicle.pilots.map(pilot => {
      population.push(pilot.homeworldPopulation);
      return pilot;
    })
    return {...vehicle, pilots: [...pilot], totalPopulation: sumPopulation(population) }
  })

  // helper function to sort vehicles by largest total population.
const sortResults = array => array.sort((prev, next) => next.totalPopulation - prev.totalPopulation);

// helper method to remap -1 as 'unknown'
const mapIsUnkown = value => value === -1 ? 'unknown' : value;

// makes use of the above function
const remapUnkown = array => array.map(row => ({ ...row, totalPopulation: mapIsUnkown(row.totalPopulation)}));

// main entry point, to get the vehicle data from the api.
export default async vehicleData => {
  try {
  const mappedVehicles = remapPilotsData(vehicleData);
  const mappedWithPilots = await mapPilotsData(mappedVehicles);
  const mappedWithPlanets = await mapPlanetsData(mappedWithPilots);
  const mappedWithPopulation = mapPopulation(mappedWithPlanets);
  const sortedResults = sortResults(mappedWithPopulation);
  return remapUnkown(sortedResults)
  } catch (err) {
    throw err;
  }
};
