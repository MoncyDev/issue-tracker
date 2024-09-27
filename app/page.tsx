import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <div>Hello World</div>
      <Pagination
        currentPage={parseInt(searchParams.page)}
        itemCount={200}
        pageSize={10}
      />
    </>
  );
}
