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
          <p>Hobbies: Gaming 🎮, Photography 📷, and Reading Sci-fi 📚</p>
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
        title: "Projects",
        body: "<p>Here are some projects I've built: Pac-Man Clone, React App, etc.</p>",
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
