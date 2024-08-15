'use client'
import { useLottie } from "lottie-react";
import test from "./test.json"

const style = {
  height: 300,
};

const Example = () => {
  const options = {
    animationData: test,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default Example;