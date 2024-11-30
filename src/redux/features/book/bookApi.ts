import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // book means products 
    getAllBooks: builder.query({
      query: () => ({
        url: "product",
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
    addBook: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `product/create-product`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Book"],
    }),

    singleBook: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({data, id}) => {
        console.log(data);
        return {
          url: `/product/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Book"],
    }),

    deleteBook: builder.mutation({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Book"],
    }),

    rejectBook: builder.mutation({
      query: (id) => {
        return {
          url: `admin/reject/${id}`,
          method: "PUT",
          // body: userInfo,
        };
      },
      invalidatesTags: ["Book"],
    }),

    startReading: builder.mutation({
      query: ({ id }) => {
        return {
          url: `reading/start-reading/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Book"],
    }),
    finishReading: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `reading/finish-reading/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Book"],
    }),
    requestReview: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `book/get-reviewed/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Book"],
    }),
    completeReview: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `reading/give-review/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useRejectBookMutation,
  useAddBookMutation,
  useStartReadingMutation,
  useFinishReadingMutation,
  useCompleteReviewMutation,
  useRequestReviewMutation,
} = authApi;
