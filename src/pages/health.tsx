import CusPage from "../components/reuseable/page";
import { useFetchNews } from "../methods/useFetchNews";

const Health = () => {
  const { data } = useFetchNews("health", 100, "everything");

  return (
    <div>
      <h1 className="mx-3 mt-2">Health & Wellness</h1>

      {data && data.articles.length > 0 ? (
        <CusPage
          selfClass="mt-5"
          articles={data.articles}
          variant="default"
          columns={3}
        />
      ) : (
        <div className="mx-3 mt-4">
          <p>Loading health news...</p>
        </div>
      )}
    </div>
  );
};

export default Health;
