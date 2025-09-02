import CusPage from "../components/reuseable/page";
import { useFetchNews } from "../methods/useFetchNews";

const Technology = () => {
  const { data } = useFetchNews("technology", 100, "everything");

  return (
    <div>
      <h1 className="mx-3 mt-2">Technology Updates</h1>

      {data && data.articles.length > 0 ? (
        <CusPage
          selfClass="mt-5"
          articles={data.articles}
          variant="default"
          columns={3}
        />
      ) : (
        <div className="mx-3 mt-4">
          <p>Loading technology news...</p>
        </div>
      )}
    </div>
  );
};

export default Technology;
