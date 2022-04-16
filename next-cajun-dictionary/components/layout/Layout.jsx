import Head from "next/head";
import { Fragment } from "react";
import Header from "../ui/Header/Header.jsx";
import Nav from "../ui/Nav/Nav.jsx";
import ModalHandler from "./ModalHandler.jsx";


export default function Layout(props) {
  return (
    <Fragment>
      <Head>
        <title>Cajun Dictionary</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Play:wght@400;700&display=swap')
        </style>
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>
      <Header />
      <Nav />
      <ModalHandler />
      {props.children}
    </Fragment>
  )
}
