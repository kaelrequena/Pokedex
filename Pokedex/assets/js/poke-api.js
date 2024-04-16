const PokeAPI = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  // Desconstruindo
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

PokeAPI.getPokemonsDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

PokeAPI.getPokemons = (offset = 0, limit = 25) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  return (
    fetch(url)
      //Transformando em Json()
      .then((response) => response.json())

      // Esse jsonBody é o resultado que é um objeto que tem Count, next, previous, results
      .then((jsonBody) => jsonBody.results)

      .then((pokemons) => pokemons.map(PokeAPI.getPokemonsDetails))

      .then((detailRequests) => Promise.all(detailRequests))

      .then((pokemonsDetails) => pokemonsDetails)

      .catch((error) => {
        console.log(error);
      })
  );
};
