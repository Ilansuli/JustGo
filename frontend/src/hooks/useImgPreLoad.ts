import { useEffect, useState } from "react";

export default function useImgPreLoad(imgSrc: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = imgSrc;

    return () => {
      img.onload = null;
    };
  }, [imgSrc]);
}
