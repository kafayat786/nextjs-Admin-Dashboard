import ProductList from "@/components/Dashboard/ProductsList";

export default function Dashboard() {
  return (
    <div className="container-fluid px-5">
      <div className="card">
        <h1 className="text-center">Wellcome Back</h1>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4   bg-white p-2">
        <ProductList />
      </div>
    </div>
  );
}
