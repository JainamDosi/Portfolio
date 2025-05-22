import { initGame, gameLoop, setGameStarted, setGamePaused } from "./game.js";
import { setupControls } from "./controls.js";
import { setupModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  setupControls();
  setupModal();

  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link.getAttribute("data-section");
      showSection(section);
    });
  });

  function showSection(section) {
    const modal = document.getElementById("portfolio-modal");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");

    // Example content (customize based on your portfolio)
    const content = {
      about: {
        title: "About Me",
        body: `
    <div style="max-height: 20rem; overflow-y: auto; scrollbar-width: none;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <h2 style="margin: 0 0 0.5rem 0;">Hey there! 👋</h2>
          <p style="margin: 0;">I'm a third-year B.Tech student at IIT Bombay with an interest in AI/ML, web development, and problem-solving. I enjoy working on full-stack projects and exploring machine learning and deep learning.</p>
        </div>
        <div style="flex-shrink: 0;">
          <img src="me.png" alt="My Photo"
            style="width: 150px; height: 180px; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" />
        </div>
      </div>

      <div class="mt-3" style="margin-top: 0.5rem;">
        <strong>Skills:</strong>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.5rem;">
          ${[
            { name: "JavaScript", icon: "javascript/javascript-original" },
            { name: "Python", icon: "python/python-original" },
            { name: "HTML5", icon: "html5/html5-original" },
            { name: "CSS3", icon: "css3/css3-original" },
            { name: "React", icon: "react/react-original" },
            { name: "Redux", icon: "redux/redux-original" },
            { name: "Node.js", icon: "nodejs/nodejs-original" },
            {
              name: "Express.js",
              icon: "express/express-original",
              extraStyle: "background:#fff; border-radius:4px;",
            },
            { name: "MongoDB", icon: "mongodb/mongodb-original" },
            { name: "Firebase", icon: "firebase/firebase-plain" },
            { name: "Git", icon: "git/git-original" },
            { name: "GitHub", icon: "github/github-original" },
            { name: "Figma", icon: "figma/figma-original" },
            { name: "C++", icon: "cplusplus/cplusplus-original" },
            { name: "Tensorflow", icon: "tensorflow/tensorflow-original" },
          ]
            .map(
              ({ name, icon, extraStyle = "" }) => `
    <div
      style="position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; padding: 1rem; border-radius: 0.5rem; background: rgba(255, 255, 255, 0.2); box-shadow: 0 4px 12px rgba(0,0,0,0.1); backdrop-filter: blur(8px); transition: transform 0.2s ease, box-shadow 0.2s ease;"
      onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.15)';"
      onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
    >
      <div style="
        content: '';
        position: absolute;
        top: -100%;
        left: -100%;
        width: 200%;
        height: 200%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
        transform: rotate(25deg);
        animation: shine 2.5s infinite;
        pointer-events: none;
      "></div>

      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg" alt="${name}" width="32" height="32" style="${extraStyle}" />
      <span style="margin-top: 0.5rem; font-size: 0.85rem; font-weight: 600; z-index: 1;">${name}</span>
    </div>
            `
            )
            .join("")}
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 0.5rem;">
          ${[1, 2]
            .map(
              () => `
            <div
              style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem; border-radius: 0.5rem; background: rgba(255, 255, 255, 0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.05); backdrop-filter: blur(8px); color: #aaa; font-size: 0.8rem; font-weight: 500;"
            >
              <i class="fas fa-lock" style="font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
              <span> Upskilling...</span>
            </div>
          `
            )
            .join("")}
        </div>

      </div>
    </div>
  `,
      },
      projects: {
        title: "My Projects",
        body: `
<div style="max-height: 15rem; overflow-y: auto; scrollbar-width: none; padding-right: 0.5rem; background: #0d0d0d;">
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">

    <!-- Project Alpha -->
    <div style="
      background: rgba(255, 255, 255, 0.08); 
      backdrop-filter: blur(12px) saturate(160%);
      -webkit-backdrop-filter: blur(12px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.15); 
      border-radius: 0.6rem; 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); 
      padding: 0.75rem; 
      color: #e0e0e0; 
      display: flex; 
      flex-direction: column; 
      align-items: flex-start; 
      gap: 0.8rem; 
      transition: transform 0.2s ease;
      transform-origin: center center;
      cursor: pointer;
    " 
    onmouseover="this.style.transform='scale(1.001)'" 
    onmouseout="this.style.transform='scale(1)'">
      
      <h3 style="font-weight: 600; font-size: 0.95rem; margin: 0;">Real Time Chat App : Talkie🎤</h3>
      
      <p style="
        font-size: 0.75rem; 
        margin: 0; 
        display: flex; 
        flex-wrap: wrap; 
        gap: 0.8rem;">
        <span style="border: 1.8px solid #4db33d; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">MongoDB</span>
        <span style="border: 1.8px solid #ffffff; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">Express.js</span>
        <span style="border: 1.8px solid #61dafb; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">React</span>
        <span style="border: 1.8px solid #3c873a; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">Node.js</span>
        <span style="border: 1.8px solid #ffffff; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">Socket.IO</span>
      </p>
      
      <div style="display: flex; gap: 0.5rem; justify-content: flex-start; margin: 0;">
        <a href="https://github.com/JainamDosi/Chat_MERN" target="_blank" title="GitHub">
          <i class="fab fa-github" style="margin-right: 0.5rem; color: #90EE90;"></i>
        </a>
        <a href="https://mern-chat-0rcb.onrender.com/login" target="_blank" title="Live Site">
          <i class="fas fa-external-link-alt" style="color: #ccc;"></i>
        </a>
      </div>
    </div>

    <!-- Project Beta -->
    <div style="
      background: rgba(255, 255, 255, 0.08); 
      backdrop-filter: blur(12px) saturate(160%);
      -webkit-backdrop-filter: blur(12px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.15); 
      border-radius: 0.6rem; 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); 
      padding: 0.75rem; 
      color: #e0e0e0; 
      display: flex; 
      flex-direction: column; 
      align-items: flex-start; 
      gap: 0.8rem; 
      transition: transform 0.2s ease;
      transform-origin: center center;
      cursor: pointer;
    " 
    onmouseover="this.style.transform='scale(1.001)'" 
    onmouseout="this.style.transform='scale(1)'">
      
      <h3 style="font-weight: 600; font-size: 0.95rem; margin: 0;">JEE mock test simulation</h3>
      
      <p style="
        font-size: 0.75rem; 
        margin: 0; 
        display: flex; 
        flex-wrap: wrap; 
        gap: 0.4rem;">
        <span style="border: 2px solid #4db33d; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">MongoDB</span>
        <span style="border: 2px solid #ffffff; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">Express.js</span>
        <span style="border: 2px solid #61dafb; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">React</span>
        <span style="border: 2px solid #3c873a; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">Node.js</span>
      </p>
      
      <div style="display: flex; gap: 0.5rem; justify-content: flex-start; margin: 0;">
        <a href="https://github.com/JainamDosi/Project_NSS" target="_blank" title="GitHub">
          <i class="fab fa-github" style="margin-right: 0.5rem; color: #90EE90;"></i> 
        </a>
      </div>
    </div>

    <!-- Project Gamma -->
    <div style="
      background: rgba(255, 255, 255, 0.08); 
      backdrop-filter: blur(12px) saturate(160%);
      -webkit-backdrop-filter: blur(12px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.15); 
      border-radius: 0.6rem; 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); 
      padding: 0.75rem; 
      color: #e0e0e0; 
      display: flex; 
      flex-direction: column; 
      align-items: flex-start; 
      gap: 0.8rem; 
      transition: transform 0.2s ease;
      transform-origin: center center;
      cursor: pointer;
    " 
    onmouseover="this.style.transform='scale(1.001)'" 
    onmouseout="this.style.transform='scale(1)'">
      
      <h3 style="font-weight: 600; font-size: 0.95rem; margin: 0;">Tech-Team website</h3>
      
      <p style="
        font-size: 0.75rem; 
        margin: 0; 
        display: flex; 
        flex-wrap: wrap; 
        gap: 0.3rem;">
        <span style="border: 2px solid #61dafb; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">React</span>
        <span style="border: 2px solid #764abc; border-radius: 9999px; padding: 0.2rem 0.5rem; background:black;">Tailwind</span>
      </p>
      
      <div style="display: flex; gap: 0.5rem; justify-content: flex-start; margin: 0;">
        <a href="https://github.com/JainamDosi/CHEMECA_IITB" target="_blank" title="GitHub">
          <i class="fab fa-github" style="margin-right: 0.5rem; color: #ffffff;"></i>   
        </a>
        <a href="https://chemecaiitb.github.io/ChemEca/#/Home" target="_blank" title="Live Site">
          <i class="fas fa-external-link-alt" style="color: #ccc;"></i>
        </a>
      </div>
    </div>

  </div>
</div>
`,
      },
      contact: {
        title: "Get In Touch!",
        body: `
        <p>Would love to hear from you!</p>
        <ul class="list-none mt-2 space-y-1" style="list-style: none; padding: 2px;gap: 2rem;">
          <li>
            <i class="fas fa-envelope" style="margin-right: 0.5rem; color: white;"></i>
            <strong>Email:</strong> <span style="color: white;">dosijainamiitb@gmail.com</span>
          </li>
          <li>
            <i class="fab fa-linkedin" style="margin-right: 0.5rem; color: #0077B5;"></i>
            <strong>LinkedIn:</strong>
            <a href="https://www.linkedin.com/in/jainam-dosi/" target="_blank" style="color: white; text-decoration: underline;">linkedin.com/in/jainam-dosi/</a>
          </li>
          <li>
            <i class="fab fa-github" style="margin-right: 0.5rem; color: #90EE90;"></i>
            <strong>GitHub:</strong>
            <a href="https://github.com/JainamDosi" target="_blank" style="color: white; text-decoration: underline;">github.com/JainamDosi</a>
          </li>
        </ul>
      `,
      },
      resume: {
        title: "Resume",
        body: `
  <div style="max-height:15rem; overflow-y: auto; scrollbar-width: none; display: flex; justify-content: center; align-items: center;">
    <a href="https://drive.google.com/file/d/1YECk0tDhlc55GGabWbFP5P_wAJrRu0Mc/view?usp=sharing" target="_blank"
       style="display: flex; align-items: center; justify-content: center; text-decoration: none; background: #ffd700cc; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; color: white; box-shadow: 0 2px 8px #000a; transition: background 0.3s ease;">
      <i class="fas fa-eye" style="margin-right: 0.6rem; font-size: 24px;"></i>
       View My Resume
    </a>
  </div>
`,
      },
    };

    title.innerText = content[section].title;
    body.innerHTML = content[section].body;
    modal.classList.remove("hidden");
  }

  startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    document.querySelector(".floating-navbar").classList.remove("hidden");
    setGameStarted(true);
    setGamePaused(false);
    initGame();
    gameLoop();
  });
});
