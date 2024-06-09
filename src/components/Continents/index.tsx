import { useTranslation } from "react-i18next";
import CheckboxCustom from "../CheckboxCustom";
import styles from "./Continents.module.scss";
import {
  Continent,
  handleContinentSelect,
  setSelectedContinent,
} from "../../redux/slices/adminFormSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
// import { continentsList } from "./continents";
import { useMemo } from "react";
import geoList from "../../geoData";

interface ContinentsProps {
  isMulti: boolean;
  continents?: Continent[];
  setContinents?: (value: Continent[]) => void;
}

const Continents = ({
  isMulti,
  continents,
  setContinents,
}: ContinentsProps) => {
  const { selectedContinent } = useSelector((state: RootState) => state.admin);
 const continentsList = useMemo(() => {
   const uniqueContinentsSet = new Set(
     geoList.map((item) =>
       JSON.stringify({
         nameEng: item.continentEng,
         nameUkr: item.continentUkr,
       })
     )
   );

   return Array.from(uniqueContinentsSet).map((continentString) =>
     JSON.parse(continentString)
   );
 }, []);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (continent: Continent) => {
    console.log(selectedContinent, continent);
    const { nameEng, nameUkr } = continent;
    if (!isMulti) {
      if (
        selectedContinent === null ||
        (selectedContinent as Continent).nameEng !== nameEng
      ) {
        dispatch(setSelectedContinent({ nameEng, nameUkr }));
        dispatch(handleContinentSelect({ nameEng, nameUkr }));
      } else if (
        (selectedContinent as Continent).nameEng === nameEng &&
        (selectedContinent as Continent).nameUkr === nameUkr
      ) {
        dispatch(setSelectedContinent(null));
        dispatch(handleContinentSelect({ nameEng: "", nameUkr: "" }));
      }
    }
    if (isMulti) {
      let updatedContinents: Continent[];
      if (continents?.some((c) => c.nameEng === nameEng)) {
        updatedContinents = continents.filter((c) => c.nameEng !== nameEng);
      } else {
        updatedContinents = [...continents!, continent];
      }
      setContinents!(updatedContinents);
    }
  };

  return (
    <div className={styles["continents-container"]}>
      {continentsList.map((continent) => {
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
                (selectedContinent as Continent).nameEng ===
                  continent.nameEng &&
                (selectedContinent as Continent).nameUkr === continent.nameUkr
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Continents;
