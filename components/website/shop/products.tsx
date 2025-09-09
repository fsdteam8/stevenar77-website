"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ShopProductCard from "../shared/ShopProductCard";

// Mock product data using the provided images
const mockProducts = [
  {
    id: 1,
    image: "/images/product-1.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.8,
    reviews: 32,
    price: 129,
  },
  {
    id: 2,
    image: "/images/product-2.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.6,
    reviews: 52,
    price: 129,
  },
  {
    id: 3,
    image: "/images/product-3.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.8,
    reviews: 52,
    price: 129,
  },
  {
    id: 4,
    image: "/images/product-4.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.8,
    reviews: 52,
    price: 129,
  },
  {
    id: 5,
    image: "/images/product-2.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.6,
    reviews: 52,
    price: 129,
  },
  {
    id: 6,
    image: "/images/product-1.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.8,
    reviews: 52,
    price: 129,
  },
  {
    id: 7,
    image: "/images/product-3.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.8,
    reviews: 72,
    price: 129,
  },
  {
    id: 8,
    image: "/images/product-1.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.6,
    reviews: 52,
    price: 129,
  },
  {
    id: 9,
    image: "/images/product-4.jpg",
    title: "AquaLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    rating: 4.8,
    reviews: 72,
    price: 129,
  },
];

const categories = [
  { name: "All Categories", count: 50 },
  { name: "Masks", count: 10 },
  { name: "Fins", count: 8 },
  { name: "Apparels", count: 23 },
  { name: "Snorkels", count: 14 },
  { name: "Locums", count: 50 },
  { name: "esdrfgh", count: 50 },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [availability, setAvailability] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    if (checked) {
      setAvailability([...availability, option]);
    } else {
      setAvailability(availability.filter((a) => a !== option));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={category.name}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(
                              category.name,
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor={category.name}
                          className="text-sm text-gray-600 cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                      <span className="text-xs text-gray-400">
                        ({category.count})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      className="text-sm"
                    />
                    <Input
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      className="text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Availability
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={availability.includes("in-stock")}
                      onCheckedChange={(checked) =>
                        handleAvailabilityChange("in-stock", checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="in-stock"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      In Stock (7)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={availability.includes("on-sale")}
                      onCheckedChange={(checked) =>
                        handleAvailabilityChange("on-sale", checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="on-sale"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      On Sale (3)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col justify-between w-full sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-65">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className=" max-w-65">

              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockProducts.map((product) => (
                <ShopProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  rating={product.rating}
                  reviews={product.reviews}
                  price={product.price}
                  onSeeMore={() => console.log("See details:", product.id)}
                  onBookNow={() => console.log("Add to cart:", product.id)}
                />
              ))}
            </div>

            {/* Results Info */}
            <div className="text-sm text-gray-600 mb-4">
              Showing 1 to 9 of 12 results
            </div>

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 2}
                    onClick={() => setCurrentPage(2)}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 3}
                    onClick={() => setCurrentPage(3)}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" onClick={() => setCurrentPage(8)}>
                    8
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
