import React, { Fragment, useEffect, useState } from "react";


const AllCards = () => {
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    try {

      //proxy is only use in development so it will be ignored in production
      //so if there is http://localhost:5000 then by default it is going to use heroku domain
      //remember this heroku app is just our server serving the build static content and also
      //holding the restful api

      //https://uno-clone.herokuapp.com/
      const response = await fetch("/getall");
      const jsonData = await response.json();

      setCards(jsonData.cards);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  console.log(cards);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Color</th>
            <th>Values</th>
            <th>Image_file</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.color}</td>
              <td>{card.values}</td>
              <td>{card.image_file}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default AllCards;