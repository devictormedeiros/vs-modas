interface IProps {
    greeting: string;
}

const ItemListContainer = ({ greeting }:IProps) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{greeting}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemListContainer;