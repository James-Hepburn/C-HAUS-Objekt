import "./GridLayoutNew.css";

interface GridLayoutProps {
  box1?: React.ReactNode;
  box2?: React.ReactNode;
  box3?: React.ReactNode;
  box4?: React.ReactNode;
  box5?: React.ReactNode;
  box6?: React.ReactNode;
  mergedTop?: React.ReactNode;
  mergedBottom?: React.ReactNode;
}

export default function GridLayout({
  box1,
  box2,
  box3,
  box4,
  box5,
  box6,
  mergedTop,
  mergedBottom,
}: GridLayoutProps) {
  return (
    <div className="content-container">
      <div className="box box1">{box1}</div>

      <div className="right-column">
        <div className="box box2">{box2}</div>
        <div className="merged-top">{mergedTop}</div>
        <div className="merged-bottom">{mergedBottom}</div>

        <div className="middle-section">
          <div className="left-half">
            <div className="box box3">{box3}</div>
            <div className="bottom-row">
              <div className="box box4">{box4}</div>
              <div className="box box5">{box5}</div>
            </div>
          </div>
          <div className="box box6">{box6}</div>
        </div>
      </div>
    </div>
  );
}