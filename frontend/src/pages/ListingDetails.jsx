import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

import ListingImage from "../components/Listing/ListingImage";
import ListingInfo from "../components/Listing/ListingInfo";
import ContactButton from "../components/Listing/ContactButton";

function ListingDetails() {
  const { user } = useAuth();


  const [listing] = useState({
   title: "Fundamentals of Database Systems" ,
    image: 'https://unsplash.com', 
    description: "Core textbook for the 3rd year Database course",
    condition: "Used ",
    location: 'Benha University - Faculty of Computers and Artificial Intelligence',
    ownerName: "Ahmed ",
    ownerEmail: " ",
  });

  const handleContactOwner = () => {
    if (listing.ownerEmail) {
      window.location.href = `mailto:${listing.ownerEmail}`;
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
    
      <ListingImage src={listing.image} alt={listing.title} />

      <ListingInfo 
        title={listing.title}
        description={listing.description}
        condition={listing.condition}
        location={listing.location}
        ownerName={listing.ownerName}
      />

      {user ? (
        <ContactButton onContact={handleContactOwner} />
      ) : (
        <p className="text-red-500 mt-4 text-sm font-semibold">
           يرجى تسجيل الدخول لتتمكن من التواصل مع صاحب الكتاب.
        </p>
      )}
    </div>
  );
}

export default ListingDetails
