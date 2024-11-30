/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticImageData } from "next/image";

export interface TBooksAndMembers {
  _id: number;
  title: string;
  authorName?: string;
  createdAt: string;
  bookCover: string | StaticImageData;
}

interface BookId {
  isReadyForReview: boolean;
  _id: string;
  title: string;
  authorName: string;
  userId: string;
  amazonBookUrl: string;
  bookFormate: string;
  bookCover: string;
  bookPdf: string;
  status: string;
  genre: string;
  bookType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserId {
  _id: string;
  fullName: string;
  reviewerName: string;
  amazonCountry: string;
  email: string;
  role: string;
  points: number;
  otp: string | null;
  otpExpires: string | null;
  isVerified: boolean;
  isSubscribed: boolean;
  subscriptionPlane: string;
  invitedFriends: number;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookRecord {
  _id: string;
  bookId: BookId;
  userId: UserId;
  readingStatus: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type BookReviewData = {
  _id: string;
  bookId: {
    _id: string;
    title: string;
    status: string;
    publishedDate: string;
    po: number;
    reviewCount: number;
    bookCover: string;
    authorName: string;
    genre: string;
    bookFormate: string;
    userId: string;
    bookPdf: string;
    isReadyForReview: boolean;
    amazonBookUrl: string;
    bookType: string;
    createdAt: string;
    updatedAt: string;
  };
  userId: {
    _id: string;
    fullName: string;
    reviewerName: string;
    amazonCountry: string;
    email: string;
    role: string;
    points: number;
    otp: string | null;
    otpExpires: string | null;
    isVerified: boolean;
    isSubscribed: boolean;
    subscriptionPlane: string;
    invitedFriends: number;
    termsAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  readingStatus: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface Member {
  _id: string;
  fullName: string;
  profileImage?: string | StaticImageData;
  reviewerName: string;
  amazonCountry: string;
  email: string;
  role: string;
  points: number;
  isVerified: boolean;
  isSubscribed: boolean;
  subscriptionPlane: string;
  invitedFriends: number;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export type TQueryParam = {
  name: string;
  value: any;
};
