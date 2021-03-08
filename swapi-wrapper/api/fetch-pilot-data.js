import instance from './axios.js';

const idRegex = item => new RegExp(/\d/).test(item);

const splitURL = url => url.split('/');

const fetchMetaData = async (id, endpoint) => await instance.get(`/${endpoint}/${id}/`);

const mapID = entity => Number(splitURL(entity).filter(item => idRegex(item)))

const mapIDs = entity => entity.map(entity => mapID(entity));

const remapPilotsData = pilots => pilots.map(({ name, pilots, vehicleId }) => ({ name, pilots: mapIDs(pilots), vehicleId })).flat();

const mapPilotsData = async pilotArray => {
  return (await Promise.all(pilotArray.map(async ({ name: vehicle, pilots, vehicleId }) => {
    const pilot = (await Promise.all(pilots.map(async pilotID => {
      const { data: { homeworld, name: pilotName, url: pilotId } } = await fetchMetaData(pilotID, 'people');
      return { homeworldId: mapID(homeworld), pilotName, pilotId: mapID(pilotId) }
    }))).flat()    
    return { vehicle, vehicleId, pilots: [...pilot]}
  }))).flat()
}

const mapPlanetsData = async pilotsArray => await Promise.all(pilotsArray.map(async row => {
  const pilot = await Promise.all(row.pilots.map(async pilotRow => {
    const { data: { name, population }} = await fetchMetaData(pilotRow.homeworldId, 'planets');
    return { homeworldName: name, homeworldPopulation: population, ...pilotRow }
  }))
  return { ...row, pilots: [...pilot]}
}))

const isSingle = array => array.length === 1;

const isUnknown = array => array.includes('unknown');

const mapSumPopulation = array => array.reduce((prev, next) => Number(prev) + Number(next));

const sumPopulation = population => isSingle(population) ? isUnknown(population) ? -1 : population.pop() : isUnknown(population) ? -1 : mapSumPopulation(population).toString()

const mapPopulation = vehicles => vehicles.map(vehicle => {
    let population = [];
    const pilot = vehicle.pilots.map(pilot => {
      population.push(pilot.homeworldPopulation);
      return pilot;
    })
    return {...vehicle, pilots: [...pilot], totalPopulation: sumPopulation(population) }
  })

const sortResults = array => array.sort((prev, next) => next.totalPopulation - prev.totalPopulation);

const mapIsUnkown = value => value === -1 ? 'unknown' : value;

const remapUnkown = array => array.map(row => ({ ...row, totalPopulation: mapIsUnkown(row.totalPopulation)}));

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
