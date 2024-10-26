interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <div className="border-b-2 pb-2">
      <div className="text-lg font-bold">{text}</div>
    </div>
  );
};

export default Title;
