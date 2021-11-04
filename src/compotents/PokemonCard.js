import React, {useEffect, useState} from "react";
import axios from "axios";


function PokemonCard({key, endpoint}) {
    const [pokeDetails, setPokeDetails] = useState("");

useEffect(() => {
    async function fetchData() {
        try {
            const pokeData = await axios.get(endpoint)
            console.log(pokeData.data);
            setPokeDetails(pokeData.data)
        }catch (e) {
            console.error(e)
        }
    }
    fetchData()
}, [])


    return(
        <>
            <div className="pokemon-card">
                {Object.keys(pokeDetails).length > 0 &&
                <>
                    <h1>{pokeDetails.name}</h1>
                    <img src={pokeDetails.sprites.front_default} alt="pokemon"/>
                    <h3>Weight:{pokeDetails.weight}</h3>
                    <h3>Moves: {pokeDetails.moves.length}</h3>
                    <h3>Abilities</h3>
                    <ul>
                        {pokeDetails.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
                }
            </div>
        </>
    );
}

export default PokemonCard;