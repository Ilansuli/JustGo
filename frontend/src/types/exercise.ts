type Exercise = {
  _id?: string;
  bodyPart?: string;
  equipment: string;
  gifSrc?: string;
  gifStartFrameSrc?: string;
  gifEndFrameSrc?: string;
  imgSrc?: File | string | null;
  name: string;
  target: string;
  secondaryMuscles?: string[];
  instructions?: string[];
};
