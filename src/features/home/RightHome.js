import MediasBlock from "../contactMe/blocks/MediasBlock";

const RightHome = () => {
  return (
    <article className="right-home">
      <h1>
        I'm <span>Deia</span>.
      </h1>
      <h3>
        A Full-Stack Web Developer &{" "}
        <span style={{ color: "#27ae60" }}>42 AbuDhabi</span> Student.
      </h3>
      <p className="text-p">
        Hi, I'm a web developer based in Abu Dhabi, UAE. <br />
        I have a passion for web design and love to create for web and mobile
        devices. <br />
        I'm also passionate about AI and enjoy building AI-powered websites.
      </p>
      <button
        style={{
          padding: "15px",
          marginTop: "50px",
          borderRadius: "10px",
          fontSize: "20px",
          color: "#27ae60",
          boxShadow: "5px 5px 5px #27ae60",
          cursor: "pointer",
          fontWeight: "bold",
          borderColor: "white",
        }}
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1Nv_wm0EQODMbcrjMe94WMG3nKho93K4X/view?usp=drive_link",
            "_blank",
            "noopener,noreferrer"
          )
        }
      >
        Download CV
      </button>
    </article>
  );
};

export default RightHome;
