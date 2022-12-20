import { Route, Switch } from "react-router-dom";
import Footer from "./components/footer/footer";
import GalleryIn from "./pages/galleryIn/galleryIn";
import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/homepage/homepage";
import { useRef, useState } from "react";
import firebase from "firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const childRef = useRef();

  const updateUser = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        setUser({
          ...doc.data(),
          id: doc.id,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Navbar
        updateUser={updateUser}
        user={user}
        setUser={setUser}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        ref={childRef}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Homepage
              {...props}
              updateUser={updateUser}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              setLoginModal={() => childRef.current.ModalOpen()}
            />
          )}
        />
        <Route exact path="/gallery" component={GalleryIn} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
