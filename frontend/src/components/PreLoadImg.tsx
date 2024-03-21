import { useEffect, useState } from "react";

type ImgForLoadingProps = {
  imageSrc: string;
};
const ImgForLoading: React.FC<ImgForLoadingProps> = ({ imageSrc }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.src = imageSrc;

    return () => {
      // Clean up
      img.onload = null;
    };
  }, [imageSrc]);

  return loaded ? (
    <img src={imageSrc} alt="Preloaded" style={{ display: "none" }} />
  ) : null;
};

export default ImgForLoading;
