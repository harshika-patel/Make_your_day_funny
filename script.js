async function getData() {
  try {
    const url = "https://icanhazdadjoke.com/";
    const giphyUrl = "https://api.giphy.com/v1/gifs/search";
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    //delay
    
    //getting random joke
    let getJokeDiv = document.querySelector(".getjoke");

    getJokeDiv.textContent = "Generating dad joke...";
    getJokeDiv.style.opacity = 1;

    // delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update joke text
    let joke = response.data.joke;
    getJokeDiv.textContent = joke;


    const giphyResponse = await axios.get(giphyUrl, {
      params: {
        api_key: "QXK44xmlRy6DyE7FSylpbeFaAeg41pb4",
        q: joke.split(" ")[3],
        limit: 1,
      },
    });

    //Get the data of Giphy for jokes
    let getGiphyDiv = document.querySelector(".getgiphy");

    console.log(giphyResponse.data);
    let gifUrl = giphyResponse.data.data[0]?.images.original.url;
    getGiphyDiv.innerHTML = ""; // Clear previous content
    if (gifUrl) {
      const img = document.createElement("img");
      img.src = gifUrl;
      img.alt = "gif";
      getGiphyDiv.appendChild(img);
    } else {
      getGiphyDiv.textContent = "No GIF found for this joke.";
    }
  } catch (error) {
    console.error(error);
  }
}

//call the funtion
getData();
let btn = document.querySelector(".button");
btn.addEventListener("click", getData);

  
