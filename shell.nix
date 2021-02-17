with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "env";
  buildInputs = [
    gnumake
    nodejs-12_x
  ];

  NODE_ENV = "development";
  PUBLIC_DOMAIN = "/";
}

