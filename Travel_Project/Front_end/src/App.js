import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-dates/lib/css/_datepicker.css";
import "./styles/app.sass";
import Page from "./components/Page";
import Stays from "./screens/Stays";
import StaysCategory from "./screens/StaysCategory";
import StaysProduct from "./screens/StaysProduct";
import StaysCheckout from "./screens/StaysCheckout";
import StaysCheckoutComplete from "./screens/StaysCheckoutComplete";
import FullPhoto from "./screens/FullPhoto";
import Flights from "./screens/Flights";
import FlightsCategory from "./screens/FlightsCategory";
import ThingsToDo from "./screens/ThingsToDo";
import Category from "./screens/Category";
import Product from "./screens/Product";
import Checkout from "./screens/Checkout";
import CheckoutComplete from "./screens/CheckoutComplete";
import Cars from "./screens/Cars";
import CarsCategory from "./screens/CarsCategory";
import CarsCategory2 from "./screens/CarsCategory2";
import CarsProduct from "./screens/CarsProduct";
import CarsCheckout from "./screens/CarsCheckout";
import CarsCheckoutComplete from "./screens/CarsCheckoutComplete";
import HostProfile from "./screens/HostProfile";
import ProfileUser from "./screens/ProfileUser";
import AccountSettings from "./screens/AccountSettings";
import Support from "./screens/Support";
import PageList from "./screens/PageList";
import MessageCenter from "./screens/MessageCenter";
import Wishlists from "./screens/Wishlists";
import YourTrips from "./screens/YourTrips";
import Bookings from "./screens/Bookings";
import ListYourProperty from "./screens/ListYourProperty";
import AdminPage from './screens/AdminPage/AdminPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/con_dao_360"
          render={() => (
              <iframe 
                src=".\360_VR\Con_Dao\tour.html"
                title="Embedded Page"
                style={{ 
                  width: '100%', 
                  height: '100vh',
                  display: 'block'   
                }} 
              />
          )}
        />
        <Route
          exact
          path="/phong_nha_360"
          render={() => (
              <iframe 
                src=".\360_VR\Phong_Nha\tour.html"
                title="Embedded Page"
                style={{ 
                  width: '100%', 
                  height: '100vh',
                  display: 'block'   
                }} 
              />
          )}
        />
        <Route
          exact
          path="/da_nang_360"
          render={() => (
              // <iframe 
              //   src=".\360_VR\Phong_Nha\tour.html"
              //   title="Embedded Page"
              //   style={{ 
              //     width: '100%', 
              //     height: '100vh',
              //     display: 'block'   
              //   }} 
              // />
              <div style={{ 
                width: '100%', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '24px',
                color: '#555'
              }}>
                This page is currently under development.<br />
                Please check back later!<br />
                  <br />
                Thank you for visiting. ❤️
              </div>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Page>
              <Stays />
            </Page>
          )}
        />
        <Route
          exact
          path="/stays-category"
          render={() => (
            <Page notAuthorized>
              <StaysCategory />
            </Page>
          )}
        />
        <Route
          exact
          path="/stays-product/:id"
          render={() => (
            <Page separatorHeader>
              <StaysProduct />
            </Page>
          )}
        />
        <Route
          exact
          path="/stays-checkout"
          render={() => (
            <Page separatorHeader>
              <StaysCheckout />
            </Page>
          )}
        />
        <Route
          exact
          path="/stays-checkout-complete"
          render={() => (
            <Page separatorHeader>
              <StaysCheckoutComplete />
            </Page>
          )}
        />
        <Route
          exact
          path="/full-photo"
          render={() => (
            <Page separatorHeader>
              <FullPhoto />
            </Page>
          )}
        />
        <Route
          exact
          path="/flights"
          render={() => (
            <Page>
              <Flights />
            </Page>
          )}
        />
        <Route
          exact
          path="/flights-category"
          render={() => (
            <Page>
              <FlightsCategory />
            </Page>
          )}
        />
        <Route
          exact
          path="/things-to-do"
          render={() => (
            <Page>
              <ThingsToDo />
            </Page>
          )}
        />
        <Route
          exact
          path="/category"
          render={() => (
            <Page>
              <Category />
            </Page>
          )}
        />
        <Route
          exact
          path="/product"
          render={() => (
            <Page separatorHeader>
              <Product />
            </Page>
          )}
        />
        <Route
          exact
          path="/checkout"
          render={() => (
            <Page separatorHeader>
              <Checkout />
            </Page>
          )}
        />
        <Route
          exact
          path="/checkout-complete"
          render={() => (
            <Page separatorHeader>
              <CheckoutComplete />
            </Page>
          )}
        />
        <Route
          exact
          path="/cars"
          render={() => (
            <Page>
              <Cars />
            </Page>
          )}
        />
        <Route
          exact
          path="/cars-category"
          render={() => (
            <Page>
              <CarsCategory />
            </Page>
          )}
        />
        <Route
          exact
          path="/cars-category-2"
          render={() => (
            <Page>
              <CarsCategory2 />
            </Page>
          )}
        />
        <Route
          exact
          path="/cars-product"
          render={() => (
            <Page separatorHeader>
              <CarsProduct />
            </Page>
          )}
        />
        <Route
          exact
          path="/cars-checkout"
          render={() => (
            <Page separatorHeader>
              <CarsCheckout />
            </Page>
          )}
        />
        <Route
          exact
          path="/cars-checkout-complete"
          render={() => (
            <Page separatorHeader>
              <CarsCheckoutComplete />
            </Page>
          )}
        />
        <Route
          exact
          path="/messages"
          render={() => (
            <Page separatorHeader fooferHide wide>
              <MessageCenter />
            </Page>
          )}
        />
        <Route
          exact
          path="/wishlists"
          render={() => (
            <Page separatorHeader>
              <Wishlists />
            </Page>
          )}
        />
        <Route
          exact
          path="/bookings"
          render={() => (
            <Page separatorHeader>
              <Bookings />
            </Page>
          )}
        />
        <Route
          exact
          path="/your-trips"
          render={() => (
            <Page separatorHeader>
              <YourTrips />
            </Page>
          )}
        />
        <Route
          exact
          path="/list-your-property"
          render={() => (
            <Page separatorHeader>
              <ListYourProperty />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <Page>
              <ProfileUser />
            </Page>
          )}
        />
        <Route
          exact
          path="/host-profile"
          render={() => (
            <Page>
              <HostProfile />
            </Page>
          )}
        />
        <Route
          exact
          path="/account-settings"
          render={() => (
            <Page>
              <AccountSettings />
            </Page>
          )}
        />
        <Route
          exact
          path="/support"
          render={() => (
            <Page>
              <Support />
            </Page>
          )}
        />
        <Route exact path="/pagelist" component={PageList} />
        <Route
          path="/admin/*"
          render={() => <AdminPage />}  // Sử dụng render cho AdminPage
        />
      </Switch>
    </Router>
  );
}

export default App;
