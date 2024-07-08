interface TodayForecastInfoCardProps {
  infoHeader?: string;
  infoIcon: string;
  infoParagraph: string;
}

export default function TodayForecastInfoCard({
  infoHeader,
  infoIcon,
  infoParagraph,
}: TodayForecastInfoCardProps) {
  return (
    <div className="flex flex-col items-center text-white justify-center py-2 bg-zinc-900 rounded-xl">
      {infoHeader ? <h4 className="text-2xl font-bold">{infoHeader}</h4> : null}
      <img className="size-12" src={infoIcon} />
      <p className="text-xl font-normal">{infoParagraph}</p>
    </div>
  );
}
