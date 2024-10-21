import { apiSlice } from '../../../app/api/apiSlice';

const CONTACTS_URL = 'api/v1/contacts';

const contactApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => CONTACTS_URL,
      providesTags: ['Contacts'],
    }),

    createContact: builder.mutation({
      query: (contact) => ({
        url: CONTACTS_URL,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    updateContact: builder.mutation({
      query: (contact) => ({
        url: `${CONTACTS_URL}/${contact.id}`,
        method: 'PATCH',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `${CONTACTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;
