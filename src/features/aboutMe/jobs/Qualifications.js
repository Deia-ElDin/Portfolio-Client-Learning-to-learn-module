import MiniTitle from "../dependencies/MiniTitle";

const Qualifications = () => {
  return (
    <section className="jobs" aria-label="Qualifications">
      <MiniTitle titleName="Qualifications" />
      <p
        style={{
          width: "fit-content",
          margin: "20px auto",
          padding: "20px 30px",
          borderRadius: "15px",
          backgroundColor: "#27ae60",
          color: "white",
          boxShadow: "0 8px 15px rgba(39, 174, 96, 0.4)",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 12px 20px rgba(39, 174, 96, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 8px 15px rgba(39, 174, 96, 0.4)";
        }}
      >
        Institute of Aviation Engineering & Technology (2006 - 2012)
      </p>

      <p
        style={{
          width: "fit-content",
          margin: "20px auto",
          padding: "20px 30px",
          borderRadius: "15px",
          backgroundColor: "#27ae60",
          color: "white",
          boxShadow: "0 8px 15px rgba(39, 174, 96, 0.4)",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 12px 20px rgba(39, 174, 96, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 8px 15px rgba(39, 174, 96, 0.4)";
        }}
      >
        Institute of Aviation Engineering & Technology (2023 - now)
      </p>
    </section>
  );
};

export default Qualifications;
