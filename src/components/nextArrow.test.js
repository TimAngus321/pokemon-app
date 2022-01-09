import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NextArrow from "./next-arrow";
import PokemonCard from "./pokemon-card";
import mockPokemonDetails from "mock-data/mockPokemonDetails";

// This test really just tests that the Pokemon card renders Ditto's Id
// ToDo mock requests in the next Pokemon function
const mockNextPokemkonFn = jest.fn();

const MockPokemonCard = () => {
  return (
    <PokemonCard
      pokemonDetails={mockPokemonDetails}
      pokeName={mockPokemonDetails.name}
      pokeId={mockPokemonDetails.id}
      pokeImg={mockPokemonDetails.sprites.front_default}
    />
  );
};

describe("Render Next Pokemon in Pokemon Card", () => {
  test("Shoud display the next pokemon on click", async () => {
    render(<MockPokemonCard pokemonDetails={mockPokemonDetails} />);
    render(<NextArrow nextPokemon={mockNextPokemkonFn} />);

    const nextArrowElm = screen.getByTestId("next-arrow-test");
    expect(nextArrowElm).toBeInTheDocument();

    const pokeIdDiv = screen.getByTestId("poke-id-test");
    expect(pokeIdDiv).toBeInTheDocument();

    fireEvent.click(nextArrowElm);
    let nextId = screen.getByText("132");
    expect(nextId).toBeInTheDocument();
  });
});
