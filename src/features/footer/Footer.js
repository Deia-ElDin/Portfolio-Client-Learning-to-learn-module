const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <small>&copy; {year} Deia-Eldin</small>
    </footer>
  );
};

export default Footer;
