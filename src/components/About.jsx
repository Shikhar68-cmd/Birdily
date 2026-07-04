import "./about.css";
import { Bird, Code2, Cpu, Rocket } from "lucide-react";

export default function About() {
    return (
        <section className="about-page">

            <div className="about-container">

                <div className="about-left">
                    <span className="about-tag">
                        <Bird size={16} />
                        About the Creator
                    </span>

                    <h1>
                        Hi, I'm <span>Shikhar.</span>
                    </h1>

                    <p>
                        I'm an 18-year-old developer from India with a passion for building
                        interactive web applications and exploring the world of Artificial
                        Intelligence.
                    </p>

                    <p>
                        Birdily began as a project to combine my love for clean interfaces,
                        maps and real-world data into something people could genuinely enjoy
                        using. It uses the eBird API to help users discover bird sightings,
                        explore species and visualize bird activity around the globe.
                    </p>

                    <p>
                        Every feature has been designed and built by me as a way to improve
                        my skills while creating something meaningful.
                    </p>
                </div>

                <div className="about-right">

                    <div className="info-card">
                        <Code2 size={34} />
                        <h3>Currently Learning</h3>

                        <p>
                            React, C++, Data Structures & Algorithms, APIs and modern web
                            development.
                        </p>
                    </div>

                    <div className="info-card">
                        <Cpu size={34} />
                        <h3>Future Goals</h3>

                        <p>
                            Pursue Artificial Intelligence and Machine Learning while building
                            larger projects that combine beautiful design with useful
                            technology.
                        </p>
                    </div>

                    <div className="info-card">
                        <Rocket size={34} />
                        <h3>What's Next?</h3>

                        <p>
                            Birdily is only the beginning. I plan to add migration tracking,
                            bird call recognition, AI-powered identification, personalized
                            birding journals and many more features in future updates.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}