import { useState } from "react";
import { fetchEvents, fetchSightSeeing, fetchArts, fetchCulture, fetchFamily, fetchShopping, fetchSports, fetchCruiseinfo, fetchRestaurants, fetchCoffee, fetchWine, fetchBeer, fetchSpirits, fetchFood, fetchHotel, fetchBlog, fetchPhone, fetchEmail} from "./services";
import RenderData from "./RenderData";



const Tabs = ({ tabsConfig, defaultIndex }) => {
  const [selectedIndexLog, setSelectedIndexLog] = useState(-1); // Set an initial value that doesn't correspond to any tab index
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sessionData, setSessionData] = useState(null); 
  const handleClick = (index) => setSelectedIndex(index);
  
  function sightseeingClick(indexed) {
    setSelectedItem(indexed);
    fetchSightSeeing()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function eventsClick(indexed) {
    setSelectedItem(indexed);
    fetchEvents()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

 function artsAndCultureClick(indexed) {
    setSelectedItem(indexed);
    fetchArts()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function culturalHeritageClick(indexed) {
    setSelectedItem(indexed);
    fetchCulture()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function familyFunClick(indexed) {
    setSelectedItem(indexed);
    fetchFamily()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function shoppingClick(indexed) {
    setSelectedItem(indexed);
    fetchShopping()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function sportsClick(indexed) {
    setSelectedItem(indexed);
    fetchSports()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function cruiseInfoClick(indexed) {
    setSelectedItem(indexed);
    fetchCruiseinfo()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }


  function restaurantsClicked(indexed) {
    setSelectedItem(indexed);
    fetchRestaurants()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function coffeeClicked(indexed) {
    setSelectedItem(indexed);
    fetchCoffee()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function wineClicked(indexed) {
    setSelectedItem(indexed);
    fetchWine()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function beerClicked(indexed) {
    setSelectedItem(indexed);
    fetchBeer()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function spiritsClicked(indexed) {
    setSelectedItem(indexed);
    fetchSpirits()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function foodClicked(indexed) {
    setSelectedItem(indexed);
    fetchFood()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function hotelClicked(indexed) {
    setSelectedItem(indexed);
    fetchHotel()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }
  
  function blogClicked(indexed) {
    setSelectedItem(indexed);
    fetchBlog()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function phoneClicked(indexed) {
    setSelectedItem(indexed);
    fetchPhone()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  function emailClicked(indexed) {
    setSelectedItem(indexed);
    fetchEmail()
    .then(response => {
      setSessionData(response);
    })
    .catch(error => console.error(error));
  }

  

  return (
    <>
      {selectedItem === null && (
        <div className="tab">
          
          {tabsConfig.map((tab, index) => (
            <button className="tablinks" key={`tab-${index}`}
              onClick={() => {
                handleClick(index);
                setSelectedIndexLog(index); // Update the selected index on tab click
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div>
        <ul>
          {selectedItem === null && tabsConfig.map((tab, index) => (
            <div className="tabcontent" key={`tabpanel-${index}`} hidden={selectedIndexLog !== index}>
              <>
                <li className="tab-list-style"
                  key={index}
                  onClick={() => {
                    if (tab.label == "Things To do")
                      sightseeingClick(index);
                    else if (tab.label == "Food & Drink")
                      restaurantsClicked(index);
                    else if (tab.label == "Lodging")
                      hotelClicked(index)
                    else if (tab.label == "Blog")
                      blogClicked(index)
                    else if (tab.label == "Contact Us")
                      phoneClicked(index)

                  }}
                >
              {tab.listItem1}
                </li>
                {tab.listItem2 && (
                  <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      if (tab.label == "Things To do")
                      eventsClick(index);
                      else if (tab.label == "Food & Drink")
                      coffeeClicked(index)
                      else if (tab.label == "Contact Us")
                      emailClicked(index)
                    }}
                  >
                    {tab.listItem2}
                  </li>
                )}
                {tab.listItem3 && (
                <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      if (tab.label == "Things To do")
                      artsAndCultureClick(index);
                      else if (tab.label == "Food & Drink")
                      wineClicked(index)
                    }}
                >
                    {tab.listItem3}
                </li>
                )}
                {tab.listItem4 && (
                <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      if (tab.label == "Things To do")
                      culturalHeritageClick(index);
                      else if (tab.label == "Food & Drink")
                      beerClicked(index)
                    }}
                >
                    {tab.listItem4}
                </li>
                )}
                {tab.listItem5 && (
                <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      if (tab.label == "Things To do")
                      familyFunClick(index);
                      else if (tab.label == "Food & Drink")
                      spiritsClicked(index)
                    }}
                >
                    {tab.listItem5}
                </li>
                )}
                {tab.listItem6 && (
                <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      if (tab.label == "Things To do")
                      shoppingClick(index);
                      else if (tab.label == "Food & Drink")
                      foodClicked(index)
                    }}
                >
                    {tab.listItem6}
                </li>
                )}
                {tab.listItem7 && (
                <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      sportsClick(index);
                    }}
                >
                    {tab.listItem7}
                </li>
                )}
                {tab.listItem8 && (
                <li className="tab-list-style"
                    key={index}
                    onClick={() => {
                      cruiseInfoClick(index);
                    }}
                >
                    {tab.listItem8}
                </li>
                )}
              </>
            </div>
          ))}
        </ul>
        {selectedItem !== null && (
          <>
            {selectedIndex == 0 && <RenderData message = {sessionData} />}
            {selectedIndex == 1 && <RenderData message = {sessionData} />}
            {selectedIndex == 2 && <RenderData message = {sessionData} />}
            {selectedIndex == 3 && <RenderData message = {sessionData} />}
            {selectedIndex == 4 && <RenderData message = {sessionData} />}
            {selectedIndex == 5 && <RenderData message = {sessionData} />}
            {selectedIndex == 6 && <RenderData message = {sessionData} />}

          </>
        )}
      </div>
    </>
  );
};

export default Tabs;
