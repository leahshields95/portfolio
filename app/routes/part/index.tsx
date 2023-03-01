
import { Part } from ".prisma/client";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Dropdown from "./__dropdown";

export default function SelectPart() {
  const allParts = useLoaderData().sort((a: Part, b: Part) => a.name.localeCompare(b.name));
  const [availableParts, setAvailableParts] = useState(Array.from(allParts) as Part[]);
  const [categories, setCategories] = useState([""]);
  const [subcategories, setSubcategories] = useState([""]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedPart, setSelectedPart] = useState<Part | undefined>();

  useEffect(() => {
    setCategories(Array.from(new Set<string>(allParts.map((part: Part) => part.category))).sort());
    setSubcategories(Array.from(new Set<string>(allParts.filter((part: Part) => part.category === selectedCategory).map((part: Part) => part.subcategory))).sort());
  }, [availableParts]);

  useEffect(() => {
    selectedCategory && setAvailableParts(allParts.filter((part: Part) => part.category === selectedCategory));
    selectedSubcategory && setAvailableParts(allParts.filter((part: Part) => part.category === selectedCategory && part.subcategory === selectedSubcategory));
  }, [selectedCategory, selectedSubcategory]);

  function onCategoryChange(value: string) {
    setSelectedCategory(value);
    setSelectedSubcategory("");
    setSelectedPart(undefined);
  }

  function onSubcategoryChange(value: string) {
    setSelectedSubcategory(value);
    setSelectedPart(undefined);
  }

  function onPartNameSelection(value: string) {
    setSelectedPart(availableParts.find(part => part.name === value));
  }

  return (
    <div className="p-[8rem]">
      <label className="text-white text-3xl">Find a part</label>
      <Dropdown optionName="category" onSelect={onCategoryChange} options={categories} />
      <Dropdown optionName="subcategory" onSelect={onSubcategoryChange} options={subcategories} disabled={!selectedCategory} />
      <Dropdown optionName="part name" onSelect={onPartNameSelection} options={availableParts.map(part => part.name)} disabled={!selectedSubcategory} />
      {selectedPart && (
        <Link className="text-white text-2xl" to={`/part/${selectedPart.id}`}>Part {selectedPart.name}</Link>
        // TODO: Send part details
        // <PartDetails />
      )}
      <Outlet />
    </div >
  )
}
