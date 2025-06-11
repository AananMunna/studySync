import React from 'react';
import Navbar from './../components/Navbar';
import { Outlet,useNavigation  } from 'react-router';
import Footer from './../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollToTop from '../components/ScrollToTop';

const Layout = () => {
      const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
    return (
        <>
        <ScrollToTop />
        <Navbar></Navbar>
         {isLoading && <LoadingSpinner />}
        <div className="my-20 lg:my-10">
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Layout;