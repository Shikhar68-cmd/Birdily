import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import treeImg from "../assets/tree.png";
import bgImg from "../assets/hero-poster.png";
import backVid from "../assets/birds.mp4";
import appImg from "../assets/app.png";
import { useNavigate } from "react-router-dom";
import FeatureCards from '../components/FeatureCards';
import Footer from '../components/Footer';



const Homepage = () => {
    
    const navigate = useNavigate();

    useGSAP(() => {
        const tl1 = gsap.timeline();

        gsap.to(".card", {
            scale: 0.4,
            x: 400,
            borderRadius: '40px',
            ease: "power4.inOut",


            scrollTrigger: {
                trigger: ".page1",
                start: "top top",
                end: "+=1300",
                scrub: 1.25,
                pin: true,
                

                onUpdate: (self) => {

                    const video = document.querySelector(".cardvideo");
                    if (self.progress > 0.3 && !window.textStarted) {
                        window.textStarted = true;
                        revealText();
                        logoAnim();
                    }

                    if (video) {
                        if (self.progress > 0.5 && !video.paused) {
                    
                            video.pause();
                    
                            gsap.to(".maincnt", {
                                opacity: 0,
                                duration: 1
                            });
                    
                            gsap.to(".img-after", {
                                opacity: 1,
                                duration: 1
                            });
                    
                        }
                    
                        if (self.progress <= 0.5 && video.paused) {
                    
                            video.play().catch(() => {});
                    
                            gsap.to(".maincnt", {
                                opacity: 1,
                                duration: 1
                            });
                    
                            gsap.to(".img-after", {
                                opacity: 0,
                                duration: 1
                            });
                    
                        }
                    }




                }
            }
        });



        function logoAnim(){
            

            gsap.from('.logo h2', {
                opacity: 0,
                duration: 2,
            }, )
            gsap.to(".logo h2", {
                    rotation: 2.5,
                    transformOrigin: "center center",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
            });
        }

        function revealText() {
            const lines = gsap.utils.toArray(".text-container");

            lines.forEach((line, i) => {
                const mover = line.querySelector(".mover");
                const letters = line.querySelectorAll(".letter");

                const tl = gsap.timeline({
                    delay: 1 + i * 0.15,

                });

                tl.to(mover, {
                    width: "100%",
                    duration: 0.7,
                    ease: "power3.inOut",
                })

                    .to(
                        letters,
                        {
                            opacity: 1,
                            stagger: 0.02,
                            duration: 0.4,
                            ease: "power2.out",
                        },
                        "-=0.4"
                    )

                    .to(
                        mover,
                        {
                            scaleX: 0,
                            transformOrigin: "right",
                            duration: 0.7,
                            ease: "power3.inOut",
                        },
                        "-=0.8"
                    );
            });
        }
    });

    return (
        <div className='homepagecnt'>
            <section className='page1'>

                <div className='tree-cnt'>
                    <img src={treeImg} alt="" />
                </div>

                <button onClick={() => navigate("/explore")} 
                className='explore'>Explore the Map</button>


                <div className='logo'>
                    <h2 className='mainlogo'>Birdily</h2>

                    <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 24C40 6 85 6 110 24C135 42 180 42 210 24"
                            stroke="#A855F7"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <div className='text-container'>
                        <h1>
                            {"From common backyard visitors to rare migratory species ,".split("").map((char, i) => (
                                <span key={i} className="letter">
                                    {char}
                                </span>
                            ))}
                        </h1>
                        <div className='mover'></div>
                    </div>

                    <div className='text-container'>
                        <h1>
                            {`Birdily helps you explore the latest bird observations`.split("").map((char, i) => (
                                <span key={i} className="letter">
                                    {char}
                                </span>
                            ))}
                        </h1>
                        <div className='mover'></div>
                    </div>

                    <div className='text-container'>
                        <h1>
                            {"in real time. Click anywhere on the map to discover".split("").map((char, i) => (
                                <span key={i} className="letter">
                                    {char}
                                </span>
                            ))}
                        </h1>
                        <div className='mover'></div>
                    </div>

                    <div className='text-container'>
                        <h1>
                            {"what's being spotted, where it's being seen , ".split("").map((char, i) => (
                                <span key={i} className="letter">
                                    {char}
                                </span>
                            ))}
                        </h1>
                        <div className='mover'></div>
                    </div>

                    <div className='text-container'>
                        <h1>
                            {"and how bird populations vary across regions .".split("").map((char, i) => (
                                <span key={i} className="letter">
                                    {char}
                                </span>
                            ))}
                        </h1>
                        <div className='mover'></div>
                    </div>
                </div>
                <div className="card">

                    <img src={appImg} className='img-after' alt="" />

                    <div className='maincnt'>
                        <video className='cardvideo'
                        poster="/hero-poster.png"
                        autoPlay muted loop playsInline>
                            <source src={backVid} type="video/mp4" />
                        </video>

                        <h1 className='title'>FOLLOW THE FLIGHT</h1>

                        <p className='small-title'>Every sighting tells a story. Explore them all.</p>
                    </div>



                </div>

                
            </section>

            <FeatureCards />
            <Footer />
        </div>
    )
}

export default Homepage