const limit = 5;
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
const pokemonList = document.getElementById("IDpokemomList");
const loadMoreButton = document.getElementById("loadMoreButton");

function pokemonItems(offset, limit) {
  // Esse PARAMETRO pokemon do element, que foi definido como parametro quando chamei a função convertPokemonToLi
  function convertPokemonToLi(pokemon) {
    return `
          <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
  
            <!--Aqui é  a lista e a imagem do pokemon -->
            <div class="detail">
              <ol class="types">
              ${pokemon.types
                .map((type) => {
                  return `<li class="type ${type}">${type}</li>`;
                })
                .join("")}
              </ol>
              <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"
              />
            </div>
          </li>
  `;
  }

  PokeAPI.getPokemons(offset, limit)

    //Isso aqui é uma lista que vem do .then() DA PARTE DE CIMA
    .then((pokemons = []) => {
      const novaLista = pokemons.map((pokemon) => {
        return convertPokemonToLi(pokemon);
      });

      //juntando tudo
      const newhtml = novaLista.join(" ");

      pokemonList.innerHTML += newhtml;
    });
}

pokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  pokemonItems(offset, limit);
});
