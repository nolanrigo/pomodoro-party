import React, { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/app";
import { MeProvider } from "./components/me";
import { fuego, FuegoProvider } from "./fuego";

render(
  <StrictMode>
    <FuegoProvider fuego={fuego}>
      <MeProvider>
        <App />
      </MeProvider>
    </FuegoProvider>
  </StrictMode>,
  document.getElementById("❤️"),
);
