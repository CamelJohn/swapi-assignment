import instance from './axios.js';

// base planets
const PLANETS = ['Tatooine', 'Alderaan', 'Bespin', 'Endor', 'Naboo'];

// helper method to only use the relevant planets from the SWAPI api.
const filterPlanets = data => data.filter(planet => PLANETS.includes(planet.name));

// map only relevant fields from planets.
const mapPlanetData = planets => planets.map(({ name, population }) => ({ name, population: Number(population) }));

// sums up total of planet populations
const addTotal = planets => {
  const rawPopulation = planets.map(planet => planet.population);
  const total = rawPopulation.reduce((prev, next) => Number(prev) + Number(next), 0);
  return { planets, total }
}

export default async () => {
  const { data } = await instance.get('/planets/');
  const filteredData = filterPlanets(data.results);
  const mappedData = mapPlanetData(filteredData);
  return addTotal(mappedData);
}