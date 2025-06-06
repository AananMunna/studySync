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
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    );
};

export default Layout;