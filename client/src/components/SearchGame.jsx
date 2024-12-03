const SearchGame = () => {
  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Rechercher un jeu"
      />
      <button
        className="button-submitGame"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.value);
        }}
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchGame;
