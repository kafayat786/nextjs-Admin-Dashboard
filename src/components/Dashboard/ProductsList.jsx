"use client";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import sendRequest from "@/utils/axiosUtils";
import { Chart } from "primereact/chart";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const countProductsByCategory = (products) => {
    const first100Products = products.slice(0, 100);
    const categoryCounts = first100Products.reduce((acc, product) => {
      const category = product.category;
      if (acc[category]) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});
    const result = Object.keys(categoryCounts).map((category) => ({
      label: category,
      count: categoryCounts[category],
    }));
    return result;
  };

  // Call the function and log the result
  const categoryCounts = countProductsByCategory(products);
  console.log(categoryCounts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await sendRequest("GET", "products");
        setProducts(data.products.slice(0, 100));
        countProductsByCategory(data.products); // Assuming the response structure has a `products` key
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
        toast.current?.show({
          severity: "error",
          summary: "error",
          detail: "Error fetching products:",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        Loading... <ProgressSpinner />
      </div>
    );
  }
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

  function ProdouctCount({ categoryCounts }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
      const data = {
        labels: categoryCounts.map((category) => category.label),
        datasets: [
          {
            label: "Sales",
            data: categoryCounts.map((category) => category.count),
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    }, []);

    return (
      <div className="card">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    );
  }

  function ProductDataTable({ products }) {
    const [globalFilter, setGlobalFilter] = useState(null);

    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };

    const imageBodyTemplate = (product) => {
      return (
        <img
          src={`${product.thumbnail}`}
          alt={product.image}
          style={{ maxWidth: "100px" }}
          className="w-2rem shadow-2 border-round"
        />
      );
    };

    const priceBodyTemplate = (product) => {
      return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
      return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const header = (
      <div className="flex align-items-center justify-end gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search ms-3" />
          <InputText
            type="search"
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="ps-8"
          />
        </span>
      </div>
    );
    const footer = `In total there are ${
      products ? products.length : 0
    } products.`;

    return (
      <div className="card">
        <DataTable
          value={products}
          header={header}
          footer={footer}
          globalFilter={globalFilter}
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column sortable field="title" header="Name"></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column
            sortable
            field="price"
            header="Price"
            body={priceBodyTemplate}
          ></Column>
          <Column sortable field="category" header="Category"></Column>
          <Column
            sortable
            field="rating"
            header="Reviews"
            body={ratingBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  }

  return (
    <div className="-fluid py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {categoryCounts.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-6 rounded-lg text-white ${colors[index]}`}
          >
            <h2 className="text-xl font-bold mb-2">{category.label}</h2>
            <p className="text-lg">{category.count}</p>
          </div>
        ))}
      </div>
      <ProdouctCount categoryCounts={categoryCounts} />
      <div className="mt-5">
        <ProductDataTable products={products} />
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default ProductList;
