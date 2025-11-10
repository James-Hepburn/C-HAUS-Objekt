import "./GridLayout.css";

interface GridLayoutProps {
  children?: React.ReactNode;
}

export default function GridLayout({ children }: GridLayoutProps) {
  return (
    <div className="content-container">
      <div className="box box1"></div>

      <div className="right-column">
        <div className="box box2"></div>
        <div className="merged-top"></div>
        <div className="merged-bottom"></div>

        <div className="middle-section">
          <div className="left-half">
            <div className="box box3"></div>
            <div className="bottom-row">
              <div className="box box4"></div>
              <div className="box box5"></div>
            </div>
          </div>
          <div className="box box6"></div>
        </div>
      </div>

      {children}
    </div>
  );
}