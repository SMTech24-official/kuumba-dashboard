import { IconType } from "react-icons/lib";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string
  profilePic: string;
  bannerPic: string;
  summary: string | null;
  birthday: string | null;
  skills: string[] | null;
  phone: string | null;
  address: string | null;
  otp: string | null;
  OtpExpires: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Metadata = {
  createdAt: string;
  updatedAt: string;
};

export type Book = {
  id: string;
  title: string;
  status: string;
  publishedDate: string;
  price: number;
  regularPrice: number;
  quantity: number;
  images: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewedBook = {
  _id: string;
  bookId: Book; // The book details
  userId: User; // The user details who reviewed
  readingStatus: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Button = {
  label: string;
  variant: "outline" | "solid"; // Can expand this based on button variants
  style: string;
};

export type SubscriptionPlan = {
  type: "monthly" | "yearly"; // Can expand this based on available types
  name: string;
  price: string;
  description: string;
  features: string[];
  button: Button;
  image: string; // URL or path to image
};

export type NavLink = {
  name: string;
  href: string;
  icon: IconType; // Using IconType from react-icons
};

type Product = {
  title: string;
  price: number;
};

export type Item = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
};

type OrderUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Order = {
  id: string;
  userId: string;
  status: 'Pending' | 'Completed' | 'Cancelled'; // You can extend status values as needed
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  user: OrderUser;
  items: Item[];
};
