import React, { useState } from "react";
import { ajax } from "rxjs/ajax";
import { map, tap } from "rxjs/operators";
import { from } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import axios from "axios";

import "./App.css";
import Form from "./Form";

function App() {
  const [ajaxMessage, setAjaxMessage] = useState<string | null>(null);
  const [fetchMessage, setFetchMessage] = useState<string | null>(null);
  const [axiosMessage, setAxiosMessage] = useState<string | null>(null);

  const [ajaxSubscription, setAjaxSubscription] = useState<Subscription | null>(
    null
  );
  const [
    axiosSubscription,
    setAxiosSubscription,
  ] = useState<Subscription | null>(null);

  function handleSubmitWithFetch(id: string) {
    fetch(`http://localhost:1337/reallyImportantEndpoint/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFetchMessage(data["message"]);
      });
  }

  function handleSubmitWithRxjsAjax(id: string) {
    const ajaxSubscription = ajax(
      `http://localhost:1337/reallyImportantEndpoint/${id}`
    )
      .pipe(
        map((res) => res.response.message),
        tap(console.log)
      )
      .subscribe((message) => {
        alert(message);
        setAjaxMessage(message);
      });
    setAjaxSubscription(ajaxSubscription);
  }

  function handleSubmitWithRxjsAxios(id: string) {
    const axiosSubscription = from(
      axios.get(`http://localhost:1337/reallyImportantEndpoint/${id}`)
    )
      .pipe(map((res) => res.data.message))
      .subscribe((message) => {
        alert(message);
        setAxiosMessage(message);
      });
    setAxiosSubscription(axiosSubscription);
  }

  function handleStopAjaxRequest() {
    ajaxSubscription?.unsubscribe();
  }

  function handleStopAxiosRequest() {
    axiosSubscription?.unsubscribe();
  }

  return (
    <div className="App">
      <main>
        <h1>Demo - Request Cancellation</h1>
        <Form
          title="Promise"
          onStop={() => {}}
          onSubmit={handleSubmitWithFetch}
          idSuffix="fetch"
          message={fetchMessage}
        />
        <hr />
        <Form
          title="RxJS Ajax"
          onStop={handleStopAjaxRequest}
          onSubmit={handleSubmitWithRxjsAjax}
          idSuffix="rxAjax"
          message={ajaxMessage}
        />
        <hr />
        <Form
          title="RxJS Axios"
          onStop={handleStopAxiosRequest}
          onSubmit={handleSubmitWithRxjsAxios}
          idSuffix="axios"
          message={axiosMessage}
        />
      </main>
    </div>
  );
}

export default App;
