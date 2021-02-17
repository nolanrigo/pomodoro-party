import React, { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/app";
import { Auth } from "./components/auth";
import { Firebase } from "./components/firebase";

render(
  <StrictMode>
    <Firebase>
      <Auth>
        <App />
      </Auth>
    </Firebase>
  </StrictMode>,
  document.getElementById("❤️"),
);
