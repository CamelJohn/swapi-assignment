import instance from './axios.js';

const PLANETS = ['Tatooine', 'Alderaan', 'Bespin', 'Endor', 'Naboo'];

const filterPlanets = data => data.filter(planet => PLANETS.includes(planet.name));

const mapPlanetData = planets => planets.map(({ name, population }) => ({ name, population: Number(population) }));

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