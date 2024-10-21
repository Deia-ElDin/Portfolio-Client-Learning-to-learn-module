import MiniTitle from "../dependencies/MiniTitle";

const Reflection = () => {
  return (
    <section className="jobs" aria-label="Reflection">
      <MiniTitle titleName="Reflection" />
      <p
        style={{
          width: "80%",
          margin: "20px auto",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#27ae60",
          color: "white",
          boxShadow: "0 10px 20px rgba(39, 174, 96, 0.5)",
          fontSize: "18px",
          lineHeight: "1.6",
          fontWeight: "500",
          textAlign: "justify",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.02)";
          e.target.style.boxShadow = "0 15px 30px rgba(39, 174, 96, 0.7)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 10px 20px rgba(39, 174, 96, 0.5)";
        }}
      >
        During my time at <strong>42 Abu Dhabi</strong> and through the
        collaborative experiences I had with the amazing teams I joined in
        various <strong>hackathons</strong>, I discovered the areas I am most
        passionate about. Working on diverse challenges has not only pushed me
        to <strong>enhance my front-end and back-end development skills</strong>
        , but it has also revealed a new passion for{" "}
        <strong>Artificial Intelligence</strong>. Through these experiences, I
        developed a desire to{" "}
        <strong>build complex, AI-powered websites</strong> that can solve
        real-world problems and push the boundaries of what technology can
        achieve. Looking ahead, I aspire to
        <strong>pursue mastery in the field of AI</strong>, continuously growing
        my skills and knowledge to make a meaningful impact in the tech world.
      </p>
    </section>
  );
};

export default Reflection;
