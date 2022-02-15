import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./search";
import PokemonCard from "../pokemonCard/pokemon-card";
import mockPokemonDetails from "mock-data/mockPokemonDetails";



const mockPokemonSearch = jest.fn();

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

describe("Searching for a pokemon should return the pokemon of the same name", () => {
  test("Searching a pokemon should return requested pokemon info", async () => {
    render(<MockPokemonCard pokemonDetails={mockPokemonDetails} />);
    render(<Search pokemonSearch={mockPokemonSearch} />);

    const searchInput = screen.getByPlaceholderText("Search Pokemon");
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "ditto"} })

    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);

    const h3Elm = screen.getByText("ditto")
    expect(h3Elm).toBeInTheDocument();

  });
});
