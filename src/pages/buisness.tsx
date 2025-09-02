import CusPage from "../components/reuseable/page";
import { useFetchNews } from "../methods/useFetchNews";

const BusinessPage = () => {
  const { data } = useFetchNews("business", 100, "everything");

  return (
    <div>
      <h1 className="mx-3 mt-2">Business Updates</h1>

      {data && data.articles.length > 0 && (
        <CusPage
          selfClass="mt-5"
          articles={data.articles}
          variant="default" // or "compact" or "featured"
          columns={4} // 1, 2, 3, or 4 columns
        />
      )}
    </div>
  );
};

export default BusinessPage;
