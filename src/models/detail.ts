export type DetailReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type DetailDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type DetailMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type DetailProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DetailDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: DetailReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: DetailMeta;
  images: string[];
  thumbnail: string;
};
