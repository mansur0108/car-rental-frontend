let
  nixpkgs = import <nixpkgs> { };
in
  with nixpkgs;
  stdenv.mkDerivation rec {
    name = "car-rental-backend";
    nativeBuildInputs = [
      nodejs_21
      nodePackages.npm
      typescript
    ];
    buildInputs = [
      
    ];
    LD_LIBRARY_PATH = lib.makeLibraryPath buildInputs;
  }
