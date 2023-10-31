import CardDetails from "./CardDetails";

const CardContainer = () => {
  return (
    <div className="mt-60 flex items-center justify-center mx-4 md:mx-0">
      <CardDetails style={"-rotate-12 z-20 -mt-40"} />
      <CardDetails
        style={"rotate-12 z-10 hover:z-30 -ml-72 sm-ml-60 md:-ml-52"}
      />
    </div>
  );
};

export default CardContainer;