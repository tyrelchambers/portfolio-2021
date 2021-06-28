import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";

const Socials = () => {
  const socials = [
    {
      url: "https://twitter.com/imtyrelchambers",
      icon: <FontAwesomeIcon icon={faTwitter} />,
    },
    {
      url: "https://www.instagram.com/imtyrelchambers/",
      icon: <FontAwesomeIcon icon={faInstagram} />,
    },
    {
      url: "https://www.linkedin.com/in/tyrel-chambers-8ab581214/",
      icon: <FontAwesomeIcon icon={faLinkedin} />,
    },
    {
      url: "https://github.com/tyrelchambers",
      icon: <FontAwesomeIcon icon={faGithub} />,
    },
  ];
  return (
    <div className="flex gap-8">
      {socials.map((s) => (
        <Link href={s.url}>
          <a
            className="text-gray-700 text-xl"
            target="_blank"
            rel="noreferrer noopener"
          >
            {s.icon}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
