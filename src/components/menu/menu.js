import React, { useEffect, useState } from "react";
import firebase from "firebase";
import MenuCard from "../menu-card/menu-card";

function Menu({ updateUser, cartOpen, setCartOpen, modalOpen }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("settings")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          setCategories(doc.data().categories);
          setActiveCategory(doc.data().categories[0]);
        });
        firebase
          .firestore()
          .collection("menu")
          .get()
          .then((docs) => {
            var menu = [];
            docs.forEach((doc) =>
              menu.push({
                ...doc.data(),
                id: doc.id,
              })
            );
            setMenus(menu);
          });
        if (
          firebase.auth().currentUser &&
          firebase.auth().currentUser.email !== "admin@mezbaan.com"
        ) {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((doc) => {
              if (doc.exists) setCart(doc.data().cart);
            });
        }
      });
  }, []);

  useEffect(() => {
    setMenuItems(menus.filter((menu) => menu.category === activeCategory));
  }, [menus]);

  const changeMenuItems = (category) => {
    setPageNumber(0);
    setActiveCategory(category);
    setMenuItems(menus.filter((menu) => menu.category === category));
  };

  return (
    <section id="mu-restaurant-menu">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="mu-restaurant-menu-area">
              <div class="mu-title">
                <span class="mu-subtitle">Discover</span>
                <h2>OUR MENU</h2>
              </div>

              <div class="mu-restaurant-menu-content">
                <ul class="nav nav-tabs mu-restaurant-menu">
                  {categories.map((category, idx) => (
                    <li
                      class={category === activeCategory ? "active" : null}
                      key={idx}
                      onClick={() => changeMenuItems(category)}
                    >
                      <span data-toggle="tab">{category}</span>
                    </li>
                  ))}
                </ul>

                {/* <!-- Tab panes --> */}
                <div class="tab-content">
                  <div class="tab-pane fade in active">
                    <div class="mu-tab-content-area">
                      <div className="row">
                        {menuItems.map((menu, idx) => {
                          return (
                            idx > 5 * pageNumber + pageNumber - 1 &&
                            idx <= 5 * (pageNumber + 1) + pageNumber && (
                              <div
                                className="col-md-6 card-container"
                                key={idx}
                              >
                                <li className="card-items">
                                  <MenuCard
                                    item={menu}
                                    cart={cart}
                                    updateUser={updateUser}
                                    cartOpen={cartOpen}
                                    setCartOpen={setCartOpen}
                                    modalOpen={modalOpen}
                                  />
                                </li>
                              </div>
                            )
                          );
                        })}
                      </div>
                      {menuItems.length > 6 && (
                        <div className="pagination-box">
                          <span
                            className="pagination-btn"
                            onClick={() =>
                              pageNumber > 0 &&
                              setPageNumber((prev) => prev - 1)
                            }
                          >
                            <i className="bx bx-chevrons-left"></i>
                          </span>
                          {new Array(Math.ceil(menuItems.length / 6))
                            .fill()
                            .map((_, idx) => (
                              <span
                                className={
                                  pageNumber === idx
                                    ? "pagination-btn active"
                                    : "pagination-btn"
                                }
                                onClick={() => setPageNumber(idx)}
                              >
                                {idx + 1}
                              </span>
                            ))}
                          <span
                            className="pagination-btn"
                            onClick={() =>
                              pageNumber <
                                Math.ceil(menuItems.length / 6) - 1 &&
                              setPageNumber((prev) => prev + 1)
                            }
                          >
                            <i className="bx bx-chevrons-right"></i>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div class="tab-pane fade" id="meals">
                    <div class="mu-tab-content-area">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mu-tab-content-left">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="mu-tab-content-right">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="snacks">
                    <div class="mu-tab-content-area">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mu-tab-content-left">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="mu-tab-content-right">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="desserts">
                    <div class="mu-tab-content-area">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mu-tab-content-left">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="mu-tab-content-right">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="drinks">
                    <div class="mu-tab-content-area">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mu-tab-content-left">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="mu-tab-content-right">
                            <ul class="mu-menu-item-nav">
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                              <li>
                                <MenuCard />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
