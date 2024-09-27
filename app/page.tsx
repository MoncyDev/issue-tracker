import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <div>Hello World</div>
      <Pagination currentPage={1} itemCount={200} pageSize={10} />
    </>
  );
}
