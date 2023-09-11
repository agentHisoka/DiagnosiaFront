import React, { useState, useRef, useEffect } from "react";
import "./dashboardPatient.css";

const DashboardPatient = () => {
  // Sample medical articles and recommendations data (you should replace this with real data)
  // Sample medical articles and recommendations data (you should replace this with real data)
  const [medicalData, setMedicalData] = useState([
    {
      id: 1,
      title: "The Importance of Regular Check-Ups",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit pellentesque habitant morbi. In dictum non consectetur a erat. Sollicitudin ac orci phasellus egestas tellus. Bibendum neque egestas congue quisque. Nibh praesent tristique magna sit amet purus gravida. Cursus vitae congue mauris rhoncus aenean vel. Urna duis convallis convallis tellus id interdum velit laoreet. Sed ullamcorper morbi tincidunt ornare massa eget. Sed vulputate mi sit amet mauris commodo. Non sodales neque sodales ut. In fermentum et sollicitudin ac orci phasellus. Tellus mauris a diam maecenas. At volutpat diam ut venenatis tellus in metus. Magna sit amet purus gravida quis blandit turpis. A arcu cursus vitae congue mauris rhoncus aenean. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Arcu odio ut sem nulla. Et tortor at risus viverra adipiscing at in tellus integer. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Varius quam quisque id diam vel. Sagittis id consectetur purus ut faucibus pulvinar. Et malesuada fames ac turpis egestas sed. Vulputate mi sit amet mauris commodo. Egestas egestas fringilla phasellus faucibus scelerisque. ",
      image:
        "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
      author: "Dr. John Doe",
      date: "September 10, 2023",
    },
    {
      id: 2,
      title: "Healthy Diet Tips",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit pellentesque habitant morbi. In dictum non consectetur a erat. Sollicitudin ac orci phasellus egestas tellus. Bibendum neque egestas congue quisque. Nibh praesent tristique magna sit amet purus gravida. Cursus vitae congue mauris rhoncus aenean vel. Urna duis convallis convallis tellus id interdum velit laoreet. Sed ullamcorper morbi tincidunt ornare massa eget. Sed vulputate mi sit amet mauris commodo. Non sodales neque sodales ut. In fermentum et sollicitudin ac orci phasellus. Tellus mauris a diam maecenas. At volutpat diam ut venenatis tellus in metus. Magna sit amet purus gravida quis blandit turpis. A arcu cursus vitae congue mauris rhoncus aenean. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Arcu odio ut sem nulla. Et tortor at risus viverra adipiscing at in tellus integer. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Varius quam quisque id diam vel. Sagittis id consectetur purus ut faucibus pulvinar. Et malesuada fames ac turpis egestas sed. Vulputate mi sit amet mauris commodo. Egestas egestas fringilla phasellus faucibus scelerisque.",
      image:
        "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
      author: "Dr. Jane Smith",
      date: "September 5, 2023",
    },
    // Add more articles here
  ]);

  const [newArticle, setNewArticle] = useState({
    image: "",
    title: "",
    content: "",
    author: "",
    authorImage: "",
    date: "",
  });

  const [recommendationData, setRecommendationData] = useState([
    {
      id: 1,
      title: "Maintaining a Healthy Lifestyle",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit pellentesque habitant morbi. In dictum non consectetur a erat. Sollicitudin ac orci phasellus egestas tellus. Bibendum neque egestas congue quisque. Nibh praesent tristique magna sit amet purus gravida. Cursus vitae congue mauris rhoncus aenean vel. Urna duis convallis convallis tellus id interdum velit laoreet. Sed ullamcorper morbi tincidunt ornare massa eget. Sed vulputate mi sit amet mauris commodo. Non sodales neque sodales ut. In fermentum et sollicitudin ac orci phasellus. Tellus mauris a diam maecenas. At volutpat diam ut venenatis tellus in metus. Magna sit amet purus gravida quis blandit turpis. A arcu cursus vitae congue mauris rhoncus aenean. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Arcu odio ut sem nulla. Et tortor at risus viverra adipiscing at in tellus integer. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Varius quam quisque id diam vel. Sagittis id consectetur purus ut faucibus pulvinar. Et malesuada fames ac turpis egestas sed. Vulputate mi sit amet mauris commodo. Egestas egestas fringilla phasellus faucibus scelerisque.",
      image:
        "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
      author: "Dr. Jane Smith",
      date: "September 5, 2023",
    },
    {
      id: 2,
      title: "Exercise and Fitness",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra vitae congue eu consequat. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit pellentesque habitant morbi. In dictum non consectetur a erat. Sollicitudin ac orci phasellus egestas tellus. Bibendum neque egestas congue quisque. Nibh praesent tristique magna sit amet purus gravida. Cursus vitae congue mauris rhoncus aenean vel. Urna duis convallis convallis tellus id interdum velit laoreet. Sed ullamcorper morbi tincidunt ornare massa eget. Sed vulputate mi sit amet mauris commodo. Non sodales neque sodales ut. In fermentum et sollicitudin ac orci phasellus. Tellus mauris a diam maecenas. At volutpat diam ut venenatis tellus in metus. Magna sit amet purus gravida quis blandit turpis. A arcu cursus vitae congue mauris rhoncus aenean. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Arcu odio ut sem nulla. Et tortor at risus viverra adipiscing at in tellus integer. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Varius quam quisque id diam vel. Sagittis id consectetur purus ut faucibus pulvinar. Et malesuada fames ac turpis egestas sed. Vulputate mi sit amet mauris commodo. Egestas egestas fringilla phasellus faucibus scelerisque.",
      image:
        "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
      author: "Dr. Jane Smith",
      date: "September 5, 2023",
    },
    // Add more recommendations here
  ]);

  const [newRecommendation, setNewRecommendation] = useState({
    image: "",
    title: "",
    content: "",
    author: "",
    authorImage: "",
    date: "",
  });

  const modalRef = useRef(null);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  const openAddArticleModal = () => {
    setIsAddArticleModalOpen(true);
  };

  const closeAddArticleModal = () => {
    setIsAddArticleModalOpen(false);
  };

  const handleAddArticle = (newArticle) => {
    setMedicalData([...medicalData, newArticle]);
    closeAddArticleModal();
  };

  // Add a click event listener to close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeArticleModal();
        closeAddArticleModal();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleAddArticleFormSubmit = (e) => {
    e.preventDefault();

    // Add validation here if needed

    handleAddArticle(newArticle);

    // Reset the form fields
    setNewArticle({
      image: "",
      title: "",
      content: "",
      author: "",
      authorImage: "",
      date: "",
    });
  };

  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [isAddRecommendationModalOpen, setIsAddRecommendationModalOpen] =
    useState(false);

  const openRecommendationModal = (recommendation) => {
    setSelectedRecommendation(recommendation);
  };

  const closeRecommendationModal = () => {
    setSelectedRecommendation(null);
  };

  const openAddRecommendationModal = () => {
    setIsAddRecommendationModalOpen(true);
  };

  const closeAddRecommendationModal = () => {
    setIsAddRecommendationModalOpen(false);
  };

  const handleAddRecommendation = (newRecommendation) => {
    setRecommendationData([...recommendationData, newRecommendation]);
    closeAddRecommendationModal();
  };

  // Add a click event listener to close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeRecommendationModal();
        closeAddRecommendationModal();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleAddRecommendationFormSubmit = (e) => {
    e.preventDefault();

    // Add validation here if needed

    handleAddRecommendation(newRecommendation);

    // Reset the form fields
    setNewRecommendation({
      image: "",
      title: "",
      content: "",
      author: "",
      authorImage: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Medical Articles Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Medical Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicalData.map((article) => (
              <div
                key={article.id}
                className="bg-slate-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out relative overflow-hidden cursor-pointer"
                onClick={() => openArticleModal(article)}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {article.content}
                </p>
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <img
                    src="https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-homme-affaires-image-masculine-de-profil-avatar-m%C3%A2le-182095609.jpg" // Replace with the author's avatar URL
                    alt={`Avatar for ${article.author}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-300">
                    {article.author}
                  </span>
                  <span className="text-sm text-gray-300">•</span>
                  <span className="text-sm text-gray-300">{article.date}</span>
                </div>
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  New
                </div>
              </div>
            ))}
            {/* Add Article Card */}
            <div
              className="bg-gradient-to-br from-slate-400 to-slate-800 hover:from-slate-600 hover:to-slate-950 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              onClick={openAddArticleModal}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-blue-600 text-4xl font-bold shadow-md mb-4">
                +
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Add Article
              </h3>
              <p className="text-sm text-gray-300">
                Click to add a new Article.
              </p>
            </div>
          </div>
        </section>

        {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div
              className="bg-white p-8 rounded-lg shadow-lg overflow-y-auto model"
              ref={modalRef}
            >
              <h2 className="text-2xl font-semibold mb-4">
                {selectedArticle.title}
              </h2>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-600 text-base">
                {selectedArticle.content}
              </p>
              <div className="text-sm text-gray-600 mt-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-homme-affaires-image-masculine-de-profil-avatar-m%C3%A2le-182095609.jpg" // Replace with the author's avatar URL
                    alt={`Avatar for ${selectedArticle.author}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{selectedArticle.author}</span>
                </div>
                <div>{selectedArticle.date}</div>
              </div>
              <button
                onClick={closeArticleModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Article Modal */}
        {isAddArticleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-gradient-to-br from-slate-400 to-slate-800 p-8 rounded-lg shadow-lg overflow-y-auto model"
              ref={modalRef}
            >
              <h2 className="text-2xl font-semibold mb-4">Add New Article</h2>
              <form onSubmit={handleAddArticleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Image URL:
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter image URL"
                    value={newArticle.image}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, image: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter title"
                    value={newArticle.title}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="content"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Content:
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="4"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter content"
                    value={newArticle.content}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, content: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="author"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Author Name:
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter author name"
                    value={newArticle.author}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, author: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="authorImage"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Author Image URL:
                  </label>
                  <input
                    type="text"
                    id="authorImage"
                    name="authorImage"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter author image URL"
                    value={newArticle.authorImage}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        authorImage: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    value={newArticle.date}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, date: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  Add Article
                </button>
              </form>
              <button
                onClick={closeAddArticleModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Medical Recommendations Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Medical Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendationData.map((recommendation) => (
              <div
                key={recommendation.id}
                className="bg-slate-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out relative overflow-hidden cursor-pointer"
                onClick={() => openRecommendationModal(recommendation)}
              >
                <img
                  src={recommendation.image}
                  alt={recommendation.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {recommendation.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {recommendation.content}
                </p>
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <img
                    src="https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-homme-affaires-image-masculine-de-profil-avatar-m%C3%A2le-182095609.jpg" // Replace with the author's avatar URL
                    alt={`Avatar for ${recommendation.author}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-300">
                    {recommendation.author}
                  </span>
                  <span className="text-sm text-gray-300">•</span>
                  <span className="text-sm text-gray-300">
                    {recommendation.date}
                  </span>
                </div>
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  New
                </div>
              </div>
            ))}
            {/* Add Article Card */}
            <div
              className="bg-gradient-to-br from-slate-400 to-slate-800 hover:from-slate-600 hover:to-slate-950 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              onClick={openAddRecommendationModal}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-blue-600 text-4xl font-bold shadow-md mb-4">
                +
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Add Recommendation
              </h3>
              <p className="text-sm text-gray-300">
                Click to add a new recommendation.
              </p>
            </div>
          </div>
        </section>

        {/* Recommendation Modal */}
        {selectedRecommendation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div
              className="bg-white p-8 rounded-lg shadow-lg overflow-y-auto model"
              ref={modalRef}
            >
              <h2 className="text-2xl font-semibold mb-4">
                {selectedRecommendation.title}
              </h2>
              <img
                src={selectedRecommendation.image}
                alt={selectedRecommendation.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <p className="text-gray-600 text-base">
                {selectedRecommendation.content}
              </p>
              <div className="text-sm text-gray-600 mt-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-homme-affaires-image-masculine-de-profil-avatar-m%C3%A2le-182095609.jpg" // Replace with the author's avatar URL
                    alt={`Avatar for ${selectedRecommendation.author}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{selectedRecommendation.author}</span>
                </div>
                <div>{selectedRecommendation.date}</div>
              </div>
              <button
                onClick={closeRecommendationModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Recommendation Modal */}
        {isAddRecommendationModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-gradient-to-br from-slate-400 to-slate-800 p-8 rounded-lg shadow-lg overflow-y-auto model"
              ref={modalRef}
            >
              <h2 className="text-2xl font-semibold mb-4">
                Add New Recommendation
              </h2>
              <form onSubmit={handleAddRecommendationFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Image URL:
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter image URL"
                    value={newRecommendation.image}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        image: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter title"
                    value={newRecommendation.title}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="content"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Content:
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="4"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter content"
                    value={newRecommendation.content}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        content: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="author"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Author Name:
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter author name"
                    value={newRecommendation.author}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        author: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="authorImage"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Author Image URL:
                  </label>
                  <input
                    type="text"
                    id="authorImage"
                    name="authorImage"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Enter author image URL"
                    value={newRecommendation.authorImage}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        authorImage: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    value={newRecommendation.date}
                    onChange={(e) =>
                      setNewRecommendation({
                        ...newRecommendation,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  Add Recommendation
                </button>
              </form>
              <button
                onClick={closeAddRecommendationModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardPatient;
