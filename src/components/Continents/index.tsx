import { useTranslation } from "react-i18next";
import CheckboxCustom from "../CheckboxCustom";
import styles from "./Continents.module.scss";
import { useState } from "react";

const continents: Continent[] = [
  {
    nameEng: "Africa",
    nameUkr: "Африка",
  },
  {
    nameEng: "Asia",
    nameUkr: "Азія",
  },
  {
    nameEng: "Australia",
    nameUkr: "Австралія",
  },
  {
    nameEng: "Europe",
    nameUkr: "Європа",
  },
  {
    nameEng: "South America",
    nameUkr: "Південна Америка",
  },
  {
    nameEng: "North America",
    nameUkr: "Північна Америка",
  },
];

export interface Continent {
  nameEng: string;
  nameUkr: string;
}

interface ContinentsProps {
  onChange: (nameEng: string, nameUkr: string) => void;
}

const Continents = ({ onChange }: ContinentsProps) => {
  const { t } = useTranslation();
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(
    null
  );

  const handleCheckboxChange = (continent: Continent) => {
    if (selectedContinent === null) {
      setSelectedContinent(continent);
      onChange(continent.nameEng, continent.nameUkr);
    } else if (
      selectedContinent.nameEng === continent.nameEng &&
      selectedContinent.nameUkr === continent.nameUkr
    ) {
      setSelectedContinent(null);
      onChange("", "");
    } else {
      setSelectedContinent(continent);
      onChange(continent.nameEng, continent.nameUkr);
    }
  };

  return (
    <div className={styles["continents-container"]}>
      {continents.map((continent) => {
        const translatedLabel = t(
          `continent.${continent.nameEng.replace(/\s/g, "")}`
        );

        return (
          <div key={continent.nameEng} className={styles.continents}>
            <CheckboxCustom
              label={translatedLabel}
              isReactSelect={false}
              onChange={() => handleCheckboxChange(continent)}
              checked={
                selectedContinent !== null &&
                selectedContinent.nameEng === continent.nameEng &&
                selectedContinent.nameUkr === continent.nameUkr
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Continents;
