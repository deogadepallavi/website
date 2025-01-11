const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const todos = require('./todos');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

    if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username'}) ;
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient'});
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, todos.makeTodoList());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTodos());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

app.get('/api/session/sightSeeing', (req, res) => {
  const response = {
      message: 'Everyone should experience the SPACE NEEdLE and PIKE PLACE MARKET at least once, but those aren’t the only draws worth a visit. Seattle has so much to offer, from major attractions to unexpected surprises.Take in stunning views from vantages around town, including KERRY PARK and the SEATTLE GREAT WHEEL on the waterfront. Learn all about the region’s deep aviation roots among the vintage airplanes and spacecraft at the MUSEUM OF FLIGHT. Feel the wind on your face as you cruise across Puget Sound on a WASHINGTON STATE FERRY. Sip offerings from more than 100 different Washington wineries in nearby Woodinville. Or peer up at more than a thousand colorful glass discs suspended overhead in CHIHULY GARDEN and GLASS. Seattle is a sightseer’s paradise, so let us help you get started',
  };
  res.status(200).json(response);
});

app.get('/api/session/events', (req, res) => {
  const response = {
    message: 'Every day of the year, there’s a festival, performance, concert, reading or sporting event happening in Seattle.There are unlimited opportunities to experience art, heritage, and culture while you’re in town. Step into a historic theater downtown to catch up-and-coming music acts, thought-provoking contemporary plays, and touring Broadway productions.Visit a gallery or museum to discover one-of-a-kind art with Pacific Northwest flair. Or attend a festival—everything from celebrations of wine, beer, and cider to music blockbusters and more—for every interest. We invite you to discover the creative pulse that makes Seattle such a great place to visit.'
  };
  res.status(200).json(response);
});

app.get('/api/session/arts', (req, res) => {
  const response = {
    message: 'Seattle’s art scene is where you can discover the city’s cultured, fun, and playful personality. We have a reputation as one of the greatest arts cities in the world—after all, this is the home of music legends like Nirvana, Jimi Hendrix, and Pearl Jam. Dancers, artists, musicians, and writers showcase their craft in new and unexpected ways. Seattle Symphony plays the classics and puts adventurous twists on famous soundtracks. Museums, galleries, and nontraditional spaces showcase art from old masters to modern. Pacific Northwest Ballet embraces boundary-pushing choreographers for new dance expressions en pointe. And the city is home to more than 80 theater companies, presenting new work and classic favorites in captivating productions on stage. When you take in all that Seattle’s vibrant arts community offers, you can glimpse the very soul of the city.'
  };
  res.status(200).json(response);
});

app.get('/api/session/culture', (req, res) => {
  const response = {
    message: 'Global cultures come together in the Emerald City. Discover the lasting legacies of the region’s first peoples at historic longhouses and Native experiences. Explore the community’s significant Asian influences in the Chinatown–International District. Learn about Seattle’s Scandinavian settlers in the Ballard neighborhood. And glimpse Northwest Latino and African American communities at vibrant area museums and annual festivals.    '
  };
  res.status(200).json(response);
});

app.get('/api/session/family', (req, res) => {
  const response = {
    message: ' Adventures for the whole family await in Seattle : Whether you have a tot in tow or a set of teenagers, kids and adults alike love exploring the Emerald City. A bevy of museums—specializing in everything from airplanes and computers to pop culture and hands-on activities—provide hours of fun. The Seattle Aquarium and Woodland Park Zoo feature up-close animal encounters, while area parks, playgrounds, and fountains let little ones splash, jump, climb, and play. As an added bonus, many Seattle breweries and restaurants are family friendly, so parents can relax with a pint while out and about with their half pints. Artists at Play Playground : Located at Seattle Center, adjacent to the epic structure that is MoPOP, and in the shadow of the monumental Space Needle, the Artists at Play playground offers kids a great place to climb, slide, hang, swing and just generally run around. With a giant 35-foot climbing structure (one of the tallest in North America!), kids can scale the rope ladders that lead straight up to the top or take a more adventurous path through the large climbing net and rope passageways to get to the top of the two enormous tube slides. And, with the Seattle Center Armory nearby to offer snacks and easily accessible public restrooms, this playground has all the amenities you could want for an amazing day of play with the kids. Museum of Pop Culture :  Located at Seattle Center in an absolutely stunning building designed by renowned architect Frank O. Gehry, MoPOP is dedicated to the ideas and risk-taking that fuel contemporary popular culture. With its roots in rock ‘n’ roll, MoPOP serves as a gateway museum, reaching young and old through its collections, exhibitions, and educational programs, using interactive technologies to engage visitors. Here you can discover the influential history of Nirvana, explore science fiction, fantasy or horror films, delve into Jimi Hendrix’s Seattle roots, and even pick up the instruments of your choice in their state-of-the-art interactive Sound Lab and discover your own Seattle sound. '
  };
  res.status(200).json(response);
});

app.get('/api/session/shopping', (req, res) => {
  const response = {
    message: 'Seeking the latest designer fashion? Seattle has it. One-of-a-kind crafts and artisan gifts? Those too. From independent boutiques and major department stores to antique malls, souvenir shops, and specialty food purveyors, Seattle is a shopper’s paradise. Walk to dozens of stores in the downtown retail district, including the flagship Nordstrom store or venture further afield to shop other Seattle-grown national brands Filson, Brooks Running, and REI. Explore charming boutique-lined commercial streets in the city’s diverse neighborhoods and discover unique finds at area markets, vintage malls, and thrift stores.    '
  };
  res.status(200).json(response);
});

app.get('/api/session/sports', (req, res) => {
  const response = {
    message: 'SEATTLE IS A CITY THAT LOVES ITS SPORTS. Just take in the scarf-toting, jersey-wearing fans on any given game day to see what we mean. Football enthusiasts at Lumen Field set a World Record for loudest crowd roar during a 2013 Seattle Seahawks game.  Loyal soccer supporters chant, sing, and cheer throughout Sounders FC and OL Reign matches. Baseball fans love the classic ballpark atmosphere during Seattle Mariners games. Basketball buffs revel in the action as the 4-time WNBA Chamipon-winning Seattle Storm take to the court. And even before they had a single faceoff, fans have embraced the Seattle Kraken, set to join the NHL in 2021. Along with its major professional sports, Seattle also enjoys a variety of collegiate sports at the University of Washington, Seattle University, Seattle Pacific University and Washington State University.    '
  };
  res.status(200).json(response);
});

app.get('/api/session/cruiseinfo', (req, res) => {
  const response = {
    message: 'CRUISING FROM SEATTLE : With two centrally located cruise terminals and easy access to the airport, Seattle is one of the West Coast’s premier points of departure for your Alaska, West Coast, or Pacific Northwest cruise. The Port of Seattle has announced its  preliminary 2023 cruise season schedule, which features 288 sailings to Alaska from Seattle on seven different cruise lines. The season kicks off April 15 and closes October 30, during which time an estimated 1.4 million passengers will sail out of SeattlBefore or after your cruise, you can easily explore Seattle’s major attractions. Whether you have two hours or two days in town, there’s plenty to see and do mere steps from your cruise ship.    '
  };
  res.status(200).json(response);
});

app.get('/api/session/restaurants', (req, res) => {
  const response = {
    message: 'It’s hard to beat the Pacific Northwest when it comes to fresh ingredients, forward-thinking chefs, and an unparalleled dedication to all things local.Whether you want to dine on flavor-packed dishes or sip small-batch spirits, Seattle is the place to taste your heart out. Local celebrity chefs like Tom Douglas, Ethan Stowell, and Renee Erickson infuse the city with their creative flavors, while a number of Washington wineries, breweries, coffee roasters, cideries, soda makers, and distilleries make it easy to always drink like a local. Sink your teeth into juicy burgers, get a sugar fix at a beloved Seattle bakery, or relax at an indie coffee shop. The options are endlessly delicious.    '
  };
  res.status(200).json(response);
});

app.get('/api/session/coffee', (req, res) => {
  const response = {
    message: 'No surprise here: Seattle has been recognized as one of the top coffee cities in the world. From small-batch roasters to global brands, this is a town that knows its caffeine. Starbucks is based out of Seattle, with cafes on nearly every street corner, including the famous Starbucks Reserve Roastery with its coffee library of single-origin beans. Independent coffee chains also leave their mark on the Emerald City, with creative espresso drinks and brewing methods that locals love. But it’s not just coffee – Seattle also enjoys a robust tea scene with places like Steepologie, which boasts 250+ loose leaf tea blends and herbals plus a steep bar for hot or chilled tea. Meanwhile, bakeries and dessert hot spots sprinkle Seattle with freshly baked pastries, artisan cupcakes and doughnuts, tempting chocolates, and other sweet treats.    '
  };
  res.status(200).json(response);
});

app.get('/api/session/wine', (req, res) => {
  const response = { 
    message: 'With more than 900 wineries across the state, Washington is the second-largest producer of premium wine in the country. Seattle has dozens of urban wineries within city limits, while there are 100-plus wineries and tasting rooms only a 30-minute drive away in nearby Woodinville Wine Country. East of the Cascade Mountains, hundreds more wineries await in Washington Wine Country, where you can sip the state’s more than 70 varietals while overlooking the vineyards. The Yakima Valley, Walla Walla, and Tri-Cities communities serve as Washington premier wine touring regions, along with up-and-coming growing areas around the state from the Columbia Gorge to the Cascade Valley. Each region showcases locally grown grapes and the inventive winemakers perfecting their craft. Cheers!    '
  };
  res.status(200).json(response);
});

app.get('/api/session/beer', (req, res) => {
  const response = {
  message : 'There’s no doubt about it, Washington is beer heaven. Some 250 craft breweries call the state home, with more than 70 percent of the nation’s hops grown right in the Yakima Valley. Seattle is the perfect place to sip a pint of local suds. The Ballard, Fremont, and SoDo neighborhoods are packed with dozens of craft breweries, many within walking distance of one another. Meanwhile, bars and restaurants around town proudly feature local brews on their menus, so you can raise a glass just about anywhere.'  };
  res.status(200).json(response);
});

app.get('/api/session/spirits', (req, res) => {
  const response = {
  message : 'Craft spirits are a big part of Washington’s drink culture. The state boasts around 100 distilleries crafting small-batch spirits like whiskey, gin, vodka, and even aquavit and saké. Join a guided distillery tour to get a behind-the-scenes look at how spirits are made, or order a craft cocktail at an area bar or restaurant to sample local spirits mixed with Seattle-made tinctures, bitters, or sodas.'  };
  res.status(200).json(response);
});

app.get('/api/session/food', (req, res) => {
  const response = {
  message : 'PIKE PLACE MARKET - 1. Eat Seattle : Become an honorary insider with Eat Seattle‘s chef-guided food tours of Pike Place Market. Get the inside scoop on where chefs shop and locals hang out, uncover hidden gems, and interact with local vendors—all while indulging in many delicious treats from carefully selected stops. 2. Atrium Kitchen : Atrium Kitchen is a state-of-the-art kitchen located right in the heart of Pike Place Market. Join Chef Traci Calderon for the Market to Table Tour and Cooking Class, a one-of-a-kind experience where you will learn the history and little known secrets of the Market while sourcing fresh ingredients to use. The outcome is delicious with memories you won’t soon forget. 3. Show Me Seattle : While their tour options extend beyond food and drink, Show Me Seattle offers two tours of Pike Place Market, one of them providing early bird access. If you have a sweet tooth, be sure to check out their new wine+chocolate experience in historic Pioneer Square.  '  };
  res.status(200).json(response);
});

app.get('/api/session/hotel', (req, res) => {
  const response = {
    message : 'hotel info'};
    res.status(200).json(response);
});

app.get('/api/session/blog', (req, res) => {
  const response = {
    message : 'blog info'};
    res.status(200).json(response);
});

app.get('/api/session/phone', (req, res) => {
  const response = {
    message : 'phone info'};
    res.status(200).json(response);
});

app.get('/api/session/email', (req, res) => {
  const response = {
    message : 'email info'};
    res.status(200).json(response);
});

app.post('/api/todos', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { task } = req.body;
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  const todoList = users.getUserData(username);
  const id = todoList.addTodo(task);
  res.json(todoList.getTodo(id));
});




app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

