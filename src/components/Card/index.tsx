import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import Modal from "../Modal";
import styles from "./Card.module.scss";

interface CardProps {
  id?: string;
  cityEng: string;
  cityUkr: string;
  continentEng?: string;
  continentUkr?: string;
  countryEng: string;
  countryUkr?: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  purchaseDate?: Date;
}

const Card = ({
  cityEng,
  cityUkr,
  continentEng,
  continentUkr,
  countryEng,
  countryUkr,
  latitude,
  longitude,
  imageUrl,
}: CardProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const truncateText = (text: string, length: number) => {
    if (text) {
      if (text.length > length) {
        return `${text.slice(0, length)}...`;
      }
    }
    return text;
  };
  const country = i18n.language === "uk" ? countryUkr : countryEng;
  const city = i18n.language === "uk" ? cityUkr : cityEng;
  return (
    <>
      <div className={styles["card-container"]}>
        <img
          className={styles["shotglass-image"]}
          src={imageUrl}
          alt="Shot glass"
        />
        <p className={styles.country}>{truncateText(country as string, 17)}</p>
        <div className={styles["city-container"]}>
          <p className={styles.city}>{truncateText(city as string, 19)}</p>
          {isOpen ? (
            <span
              className={styles["more-info-close"]}
              data-tooltip-id="city-id"
              onClick={() => setIsOpen(false)}
            >
              x
            </span>
          ) : (
            <span
              className={styles["more-info"]}
              onClick={() => setIsOpen(true)}
            >
              i
            </span>
          )}
          <Tooltip
            id="city-id"
            className={styles.tooltip}
            noArrow
            place="right"
            delayHide={0}
            imperativeModeOnly
            openOnClick
            clickable
            isOpen={isOpen}
            render={() => (
              <span
                onClick={() => {
                  setIsOpen(false);
                  setIsOpenModal(true);
                }}
              >
                {t("card.tooltip")}
              </span>
            )}
          />
        </div>
      </div>
      {isOpenModal && (
        <Modal
          cityEng={cityEng}
          cityUkr={cityUkr}
          continentEng={continentEng}
          continentUkr={continentUkr}
          countryEng={countryEng}
          countryUkr={countryUkr}
          imageUrl={imageUrl}
          latitude={latitude}
          longitude={longitude}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
};
export default Card;
