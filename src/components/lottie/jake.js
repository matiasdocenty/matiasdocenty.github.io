'use client'
import { useLottie } from "lottie-react";
import test from "./jake.json"

const style = {
  height: 300,
};

const Jake = () => {
  const options = {
    animationData: test,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default Jake;