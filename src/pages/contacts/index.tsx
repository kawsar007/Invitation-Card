import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { getAuthToken } from "@/utils/auth";
import { toast } from "sonner";

const ContactPage = () => {
  const token = getAuthToken();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [limit] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedTags, setSelectedTags] = useState("");

  console.log("My Contact List:--->", contacts);

  // Mock data for demonstration

  // Simulate API call
  const fetchContacts = async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, you would make an API call like:
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/contacts/list?search=${searchTerm}&page=${currentPage}&limit=${limit}&tags=${selectedTags}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      //   const data = mockContacts;
      setContacts(data.contacts);
      setTotalPages(data.pagination?.totalPages);
      setTotalContacts(data.pagination?.total);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchTerm, selectedTags]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleView = (contactId) => {
    console.log(`View contact ${contactId}`);
    // In a real app: fetch(`{{base_url}}/api/contacts/${contactId}`)
    alert(`View contact ${contactId}`);
  };

  const handleUpdate = (contactId) => {
    console.log(`Update contact ${contactId}`);
    // In a real app: navigate to update form or open modal
    alert(`Update contact ${contactId}`);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts/${contactToDelete.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      console.log(`Delete contact ${contactToDelete.id}`);

      // Remove from local state
      setContacts(
        contacts.filter((contact) => contact.id !== contactToDelete.id)
      );
      setShowDeleteModal(false);
      setContactToDelete(null);

      // Show success message
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Error deleting contact. Please try again.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Management
          </h1>
          <p className="text-gray-600">
            Manage your contacts efficiently with search, filter, and action
            capabilities.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts by name, email, or phone..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="lg:w-64">
              <input
                type="text"
                placeholder="Filter by tags (e.g., Friends)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedTags}
                onChange={(e) => setSelectedTags(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {contacts?.length} of {totalContacts} contacts
          </p>
        </div>

        {/* Contact Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email & Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td col-span="5" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-500">
                          Loading contacts...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : contacts?.length === 0 ? (
                  <tr>
                    <td
                      col-span="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No contacts found. Try adjusting your search criteria.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {contact.first_name} {contact.last_name}
                            </div>
                            {contact.has_tied_contact && (
                              <div className="text-xs text-blue-600 font-medium">
                                Has tied contacts
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            {contact.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {contact.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags && contact.tags?.length > 0 ? (
                            contact.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">
                              No tags
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(contact.id)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                            title="View contact"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleUpdate(contact.id)}
                            className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50 transition-colors"
                            title="Update contact"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(contact)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete contact"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {renderPagination()}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Delete
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-500 mb-4">
                Are you sure you want to delete this contact? This action cannot
                be undone.
              </p>

              {contactToDelete && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {contactToDelete.first_name} {contactToDelete.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contactToDelete.email}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
