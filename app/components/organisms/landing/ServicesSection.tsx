import { TranslationT } from "../../../utils";
import { KeyPoints } from "../keyPoints/KeyPoints";
import { PlantIcon } from "../../theme/icons/Plant";
import { BathroomIcon } from "../../theme/icons/Bathroom";
import { NetworkIcon } from "../../theme/icons/Network";
import { GripIcon } from "../../theme/icons/Grip";

export const ServicesSection = ({ t }: { t: TranslationT }) => {
  const services = [
    {
      icon: <BathroomIcon size={8} />,
      title: "Cleaning",
      text: "Professional cleaning services tailored to your home's needs. We use eco-friendly products and ensure every corner sparkles.",
    },
    {
      icon: <PlantIcon size={8} />,
      title: "Gardening",
      text: "Expert garden maintenance and landscaping. From lawn care to pruning, we keep your outdoor spaces vibrant and healthy.",
    },
    {
      icon: <GripIcon size={8} />,
      title: "Maintenance",
      text: "General home repairs and maintenance. Plumbing, electrical, or handyman tasks - we handle it all with precision.",
    },
    {
      icon: <NetworkIcon size={8} />,
      title: "Domotics",
      text: "Smart home integration and automation. Control your lighting, security, and climate with ease, integrated with our services.",
    },
  ];

  return (
    <div id="services">
      <KeyPoints
        title="Our Services"
        text="Comprehensive home care solutions combining human expertise with smart technology."
        keys={services}
      />
    </div>
  );
};
