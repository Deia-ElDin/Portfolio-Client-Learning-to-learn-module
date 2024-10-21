const NotFound = () => {
  return (
    <section className="not-found">
      <figure>
        <img src={process.env.PUBLIC_URL + '/assets/404.jpg'} alt="404" />
      </figure>
    </section>
  );
};

export default NotFound;
