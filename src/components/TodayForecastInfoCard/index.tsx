import { degres } from "../../common/comms";

interface TodayForecastInfoCardProps {
  infoHeader?: string;
  infoIcon: string;
  infoParagraph: string;
  rotation_deg?: number;
  infoAlt: string;
}

export default function TodayForecastInfoCard({
  infoHeader,
  infoIcon,
  infoParagraph,
  rotation_deg,
  infoAlt,
}: TodayForecastInfoCardProps) {
  return (
    <div className="flex flex-col items-center text-white justify-center py-2 bg-zinc-900 rounded-xl">
      {infoHeader ? <h4 className="text-2xl font-bold">{infoHeader}</h4> : null}
      <img
        className={
          rotation_deg
            ? `size-11 ${degres[rotation_deg as keyof typeof degres]}`
            : "size-20"
        }
        src={infoIcon}
        alt={infoAlt}
      />
      <p className="text-xl font-normal">{infoParagraph}</p>
    </div>
  );
}
