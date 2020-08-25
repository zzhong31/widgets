import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState("programming");
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() =>{
        const timerId = setTimeout( () =>{
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }
    })

    useEffect(() => {
        const searchTerm = async () =>{
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                },
            });

            setResults(data.query.search);
        }

        if(debouncedTerm){
            searchTerm();
        }
    }, [debouncedTerm])



    const renderedResults = results.map((result, index) => {
        return (

            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button"
                    href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>

            </div>

        );
    });


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    ></input>
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
};

export default Search;