interface TitleProps {
  subTitle: string;
}

function SubTitle({ subTitle }: TitleProps) {
  return (
    <div>
      <h2 className="text-stone-50 text-2xl pb-2">{subTitle}</h2>
    </div>
  );
}

export default SubTitle;
