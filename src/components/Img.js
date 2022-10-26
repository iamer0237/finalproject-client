import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

// Import plugins
import { lazyload, responsive, placeholder } from "@cloudinary/react";
import { RoundCorners } from "@cloudinary/url-gen/actions";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

const Img = ({ uploadedImage }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dw0tdvwlh",
    },
  });
  // Use the image with public ID, 'front_face'.
  const newImage = cld.image(uploadedImage);
  newImage.resize(thumbnail().width(150).height(150));
  
  return (
    <>
      <AdvancedImage
        cldImg={newImage}
        plugins={[
          lazyload(),
          responsive(),
          placeholder({ mode: `predominat-color` }),
        ]}
      />
    </>
  );
};

export default Img;
