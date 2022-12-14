import React, { useState } from "react";
import "./App.css";
// import ReviewForm from "./components/ReviewForm";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Nav from "./components/Navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Categories from "./components/Categories";
import "bulma/css/bulma.min.css";


// Establish a connection to the back-end server's /graphql endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
// Use the ApolloClient constructor to instantiate the apollo Client instance and create the connection to the API endpoint. We also instantiate a new cache object using new InMemoryCach(). Note the absolute path to the server. React environment runs at localhost:3000 and the server environment runs at localhost:3001, therefor, if we just used /graphql the requests would go to localhost:3000/graphql which is NOT the correct addres for the back-end server.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [categories] = useState([
    {
      name: "Web Dev",
    },
    {
      name: "Garden",
    },
    {
      name: "Plumbing",
    },
    {
      name: "Cleaning",
    },
    {
      name: "Electrical",
    },
    {
      name: "Home",
    },
    {
      name: "Login"
    }, 
    {
      name: "Signup"
    }
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[5]);
  const [showModal, setShowModal] = useState(false);

  // Wrap the return portion in the ApolloProvider Client instance so it can interact with GraphQl
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Nav
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        ></Nav>
        <main>
          <Categories currentCategory={currentCategory} showModal={showModal} setShowModal={setShowModal}></Categories>
        </main>
        <Footer ></Footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
