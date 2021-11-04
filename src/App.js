import React, {useEffect, useState} from 'react';
import './App.css';
import logo from "./assets/1.png"
import axios from "axios";
import PokemonCard from "./compotents/PokemonCard";
import Pokemon from "./compotents/Pokemon";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        async function fetchData(){
            setError(false);
            setLoading(true);
            try {
                const result = await axios.get(endpoint)
                console.log(result.data)
                setPokemons(result.data)
                setLoading(false)
            }catch (e) {
                console.error(e);
                setError(true)
            }
            setLoading(false)
        }
            fetchData();
    },[endpoint])


    return (

        <div className="PokemonPage">
            <img src={logo} alt="pokemon"/>
            { pokemons &&
                <>
                    <section className="buttons">
                        <button
                            type="button"
                            onClick={() => setEndpoint(pokemons.previous)}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={()=> setEndpoint(pokemons.next)}
                        >
                            Next
                        </button>
                    </section>
                    {pokemons.results && pokemons.results.map((pokemon) =>{
                        return <PokemonCard key={pokemon.name} endpoint={pokemon.url} />
                    })}
                </>
            }
            {loading && <p>Loading...</p>}
            {error && <p>"Oeps daar ging iets mis.."</p>}
        </div>
    );
}

export default App;
