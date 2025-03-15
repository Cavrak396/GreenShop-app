import frontendDev from "../../../../assets/images/developers/marko-cavrak-frontend.webp";
import backendDev from "../../../../assets/images/developers/ana-jurisic-backend.webp";
import react from "../../../../assets/images/developers/react.svg";
import javascript from "../../../../assets/images/developers/js.svg";
import css from "../../../../assets/images/developers/css-3.svg";
import net from "../../../../assets/images/developers/net.svg";
import c from "../../../../assets/images/developers/c-sharp.svg";
import mySql from "../../../../assets/images/developers/mysql.svg";
import github from "../../../../assets/images/developers/github.svg";
import linkedin from "../../../../assets/images/developers/linkedin.svg";
import { DevelopersTypes } from "../../types/developersTypes";

export const developersInfo: DevelopersTypes[] = [
  {
    id: 1,
    name: "Marko Cavrak",
    job: "Front-End Developer",
    image: frontendDev,
    technologies: [
      { name: "React", icon: react },
      {
        name: "JavaScript",
        icon: javascript,
      },
      {
        name: "CSS",
        icon: css,
      },
    ],
    social: [
      {
        name: "GitHub",
        icon: github,
        link: "https://github.com/Cavrak396",
      },
      {
        name: "LinkedIn",
        icon: linkedin,
        link: "https://www.linkedin.com/in/marko-%C4%8Davrak-32b89a330/?originalSubdomain=rs",
      },
    ],
    alt: "Marko Cavrak frontend developer",
    text: "Marko is a frontend developer focused on creating modern, responsive, and functional web applications. Throughout this project, he has utilized the latest technologies such as React, TypeScript, and CSS preprocessors to build intuitive and scalable user experiences. Marko’s focus is on understanding user needs and implementing efficient solutions that enhance the interaction with the application. During development, he worked on optimizing performance and integrating frontend components with backend systems, ensuring the app runs smoothly and provides a reliable experience for end users.",
  },
  {
    id: 2,
    name: "Ana Jurisic",
    job: "Back-End Developer",
    image: backendDev,
    technologies: [
      { name: "Net", icon: net },
      {
        name: "C",
        icon: c,
      },
      {
        name: "MysQL",
        icon: mySql,
      },
    ],
    social: [
      { name: "GitHub", icon: github, link: "https://github.com/hortusanima" },
      {
        name: "LinkedIn",
        icon: linkedin,
        link: "https://www.linkedin.com/in/ana-juri%C5%A1i%C4%87-733841316/",
      },
    ],
    alt: "Ana Jurisic backend developer",
    text: "Ana is a backend developer specialized in building scalable and efficient server-side solutions. For this project, she worked with .NET 8 Web API and MySQL database, developing a robust infrastructure to support the application’s functionality. Ana is responsible for designing and implementing RESTful APIs, optimizing database queries, and ensuring data security through encryption and authentication. Her expertise in server-side technologies enables the creation of high-performance systems that can scale according to the application’s needs. With her focus on backend optimization, the application is secure, efficient, and ready for production.",
  },
];
