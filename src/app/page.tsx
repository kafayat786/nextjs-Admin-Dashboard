import ProductList from "@/components/Dashboard/ProductsList";

export default function Dashboard() {
  return (
    <div>
      <div className="card">
        <h1 className="text-center">Wellcome Back</h1>
      </div>
      <div className=" p-2">
        <ProductList />
      </div>
    </div>
  );
}
