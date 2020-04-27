const express = require("express");

const app = express();

// collection of joke for Adults
const jokeAdult = {
  joke1: "Exaggerations went up by a million percent last year.",
  joke2: "What's orange and sounds like a parrot? .... A carrot.",
  joke3:
    "<img src='https://www.demilked.com/magazine/wp-content/uploads/2019/10/5da8209e8ce78-funny-boss-memes-coverimage2.jpg'>",
  joke4: "Why did the ketchup blush? .... He saw the salad dressing.",
  joke5:
    "What did the elephant ask the naked man? .... How do you breathe out of that thing?",
};

// collection of joke for people <18
const jokeKid = {
  joke1:
    "Why is Cinderella so bad at soccer? Because she always runs away from the ball!",
  joke2: "Why is Peter Pan flying all the time? He Neverlands!",
  joke3: "What did the finger say to the thumb? I'm in glove with you!",
};

// joke page function

const jokeHeader = (name) =>
  `<html>
    <style>
            h1 {
                color: white;
                text-align: center;
                font-size: 60px;
                font-family: 'Mitr', sans-serif;

                }   
            p { 
                color: yellow;
                text-align: center;
                font-size: 20px;
                font-family: 'Mitr', sans-serif;
            }
            #joke {
                color: white;
                font-size: 30px
            }
            body {
                background-color: black;
                padding: 20px;
                    }
        </style>   
    <head>
        <title>Joke App
        </title>
    </head>
    <body>
        <h1> Hello ${name}!
        </h1>
    `;

const jokeBody = (randomJoke) =>
  `<p> Do you want to hear a joke? If not, here it is anyway.
            </p>
            <p id="joke">
            ${randomJoke}
            </p>
            <p>
            <marquee><img src='https://media1.giphy.com/media/WO69ltlJZp0ZwI98kN/200.webp?cid=ecf05e47a77140b807a7ab8b94c3db31a3584f218d512af0&rid=200.webp'></marquee>
            </p>
        </body>
      </html>
    `;

const jokeAgeAlert = () =>
  `<p> PLease write your age in number. Ex: 34.
  </p>
  </html>
  `;

// Main function generate joke with age validation
app.get("/user/:name/:age", (request, response) => {
  const userName = request.params.name;
  const userAge = parseInt(request.params.age);

  // get random joke
  var randomJoke = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  // age validation
  if (isNaN(userAge)) {
    response.send(jokeHeader(userName) + jokeAgeAlert);
    process.exit;
  }

  if (userAge >= 18) {
    response.send(jokeHeader(userName) + jokeBody(randomJoke(jokeAdult)));
  } else {
    response.send(jokeHeader(userName) + jokeBody(randomJoke(jokeKid)));
  }
});

const port = process.env.PORT || 5000;

function onListen() {
  console.log(`Listen on port ${port}`);
}
app.listen(port, onListen);
