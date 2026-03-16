
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Services from './components/Services';
import CaseStudies from './components/Casestudies';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			<LoadingScreen onComplete={() => setLoaded(true)} />
			{loaded && (
				<>
					<Navbar />
					<Hero />
					<About />
					<Projects />
					<Skills />
					<Experience />
					<Services />
					<CaseStudies />
					<Contact />
					<Footer />
				</>
			)}
		</>
	);
}

