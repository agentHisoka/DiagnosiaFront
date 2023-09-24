import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import "./dashboardPatient.css";
import { isAuthenticated } from "../auth";

const DashboardPatient = () => {
  const [doctorLocations, setDoctorLocations] = useState([]);
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [articleAddedMessage, setArticleAddedMessage] = useState(""); // State for the success message
  const decodedToken = isAuthenticated();
  const user = decodedToken.role;

  useEffect(() => {
    axios
      .get("http://localhost:3001/articles") // Update the URL to match your backend route for fetching articles
      .then((response) => {
        setFetchedArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/doctors")
      .then((response) => {
        setDoctorLocations(response.data); // Use the correct state name here
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  // Sample medical articles and recommendations data (you should replace this with real data)
  // Sample medical articles and recommendations data (you should replace this with real data)
  const [medicalData, setMedicalData] = useState([
    {
      id: 1,
      title:
        "علاج اضطراب قلق انفصال الطفل عن والديه :اقرا المزيد من خلال موقع الطبي",
      content:
        " يعد قلق الرضيع أو الطفل الصغير عند انفصاله عن والديه أمرًا طبيعيًا ولكن إذا استمر ذلك بعد هذه المرحلة فقد يكون الطفل مصابًا باضطراب قلق الانفصال وهي حالة تستدعي تلقي العلاج. يهدف علاج اضطراب قلق الانفصال إلى مساعدة الطفل على التكيف مع مواقف الانفصال والتخفيف من قلقه، ويُجرى العلاج تحت إشراف معالج مختص بمعاونة الوالدين والمدرسين، وقد توصف الأدوية في بعض الحالات. [1] يعتبر بكاء الأطفال الصغار الذين تتراوح أعمارهم بين 6 أشهر و3 أعوام عند الانفصال عن والديهم جزءًًا طبيعيًا من مراحل التطور وعادة ما يختفي ذلك بمرور الوقت، ولكن يعد قلق الانفصال اضطرابًا نفسيًا في حال استمراره في الأطفال الأكبر عمرًا، وربما يصيب المراهقين والكبار أحيانًا في صورة قلق من الانفصال عن الشريك، أو الزوج والأبناء. [1][2]   ",
      image:
        "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
      author: "Dr. Yacine DOC",
      date: "September 10, 2023",
    },
    {
      id: 2,
      title: "Healthy Diet Tips",
      content: "Lorem .",
      image:
        "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
      author: "Dr. Jane Smith",
      date: "September 5, 2023",
    },
    // Add more articles here
  ]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next doctor index (circular)
      const nextDoctorIndex = (activeDoctorIndex + 1) % doctorLocations.length;
      setActiveDoctorIndex(nextDoctorIndex);
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [activeDoctorIndex, doctorLocations]);
  const quickAccessOptions = [
    { label: "Book Appointment", icon: "fa fa-book" },
    { label: "Request Early Access", icon: "fa fa-calendar" },
    // Add more quick access options here
  ];

  const [newArticle, setNewArticle] = useState({
    image:
      "https://media.istockphoto.com/id/1032637132/photo/a-cup-of-coffee-glasses-and-newspaper-titled-health-medical.jpg?s=612x612&w=0&k=20&c=W52Q_4CXrdJs24wI_5qt4t72Hcs1AzpzkoSzntByUoY=",
    title: "",
    content: "",
    author: "",
    authorImage: "",
    date: "",
  });

  const modalRef = useRef(null);

  const [selectedArticle, setSelectedArticle] = useState("");
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
  const handleAddArticleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/add-article",
        newArticle
      );

      if (response.status === 200) {
        // Update the state with the new article
        setMedicalData([...medicalData, response.data]);

        // Set the success message
        setArticleAddedMessage("Article has been added successfully.");

        // Clear the message after a few seconds (e.g., 3000 milliseconds = 3 seconds)
        setTimeout(() => {
          setArticleAddedMessage("");
        }, 3000); // You can adjust the duration as needed (3 seconds in this example)

        // Close the add article modal
        closeAddArticleModal();
      } else {
        console.error("Failed to add article:", response.data);
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  // Add a click event listener to close the modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Doctors Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Find a Doctor</h2>
          <div className="w-full">
            <Carousel
              showArrows={true}
              showStatus={false}
              showIndicators={false}
              selectedItem={activeDoctorIndex}
              renderThumbs={() => {}}
              showThumbs={false}
              emulateTouch={true}
              swipeable={true}
              dynamicHeight={true}
              infiniteLoop={true}
              centerMode={true}
              centerSlidePercentage={60} // Adjust this value to fit your cards
            >
              {doctorLocations.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="rounded-lg shadow-lg p-4"
                  style={{
                    width: "90%",
                    background: "linear-gradient(45deg, #334155, #1a2537)",
                  }}
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{doctor.speciality}</p>
                    <p className="text-gray-400">{doctor.address}</p>
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600">
                    Book Appointment
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
        {/* Medical Articles Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Medical Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div
              className="col-span-2 md:col-span-3"
              style={{ minWidth: "300px" }}
            >
              <div className="horizontal-scroll-container">
                {fetchedArticles.map((article) => (
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
                    <h3 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h3>
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
                      <span className="text-sm text-gray-300">
                        {article.date}
                      </span>
                    </div>
                    <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      New
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              {/* Add Article Card */}
              {user === "doctor" && (
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
              )}
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

              {/* Display the success message */}
              {articleAddedMessage && (
                <div className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4">
                  {articleAddedMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medical Recommendations Section */}
        {/* Quick Access Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {quickAccessOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-400 to-slate-800 text-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-2">
                  <i className={option.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.label}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default DashboardPatient;
