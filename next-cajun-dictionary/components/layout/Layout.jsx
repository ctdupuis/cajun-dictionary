import Head from "next/head";
import { Fragment } from "react";
import Header from "./Header";
import Nav from "./Nav";
// import MainHeader from "./MainHeader";


export default function Layout(props) {
  return (
    <Fragment>
        <Head>
          <title>Cajun Dictionary</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Play:wght@400;700&display=swap')
          </style>
        </Head>
        <Header />
        <Nav />
        <main>
            {props.children}
        </main>
    </Fragment>
  )
}
