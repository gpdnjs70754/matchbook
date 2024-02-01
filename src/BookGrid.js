const BookGrid = ({ selectedStlye, item, handleImageSelect }) => {
  return (
    <img
      className={selectedStlye ? "selected-img" : null}
      src={item["표지 링크"]}
      alt={item.Description}
      onClick={() => handleImageSelect(item["추천인"])}
    />
  );
};

export default BookGrid;
