import { useEffect, useState } from "react";

const GetApi = () => {
    const [buttonTrigger, setButtonTrigger] = useState(0);
    const [gif, setGif] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRandomGif = async () => {
            setIsLoading(true);
            setGif(null);
            const randomUrl = 'https://api.giphy.com/v1/gifs/random';
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `${randomUrl}?api_key=${apiKey}`;

            try{
            const response = await fetch(url);
            const gifData = await response.json();
            setGif(gifData.data);
            } catch (error){
                setGif(null);
            } finally {
                setIsLoading(false);
            }
        };

        if(buttonTrigger > 0){
            fetchRandomGif();
        }
    }, [buttonTrigger]);

    const handleClick = () => {
        setButtonTrigger((prev) => prev + 1);
    }

    return(
        <>
        <button onClick={handleClick} disabled={isLoading}>Klicka för Random GIF</button>
        <br />
        {!isLoading && gif && (
            <img src={gif.images.fixed_width.url} alt={gif.title} style={{maxWidth: '250px', marginTop: '20px'}}
            /> )}
        </>
    )
}

export default GetApi;