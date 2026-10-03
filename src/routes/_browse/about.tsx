import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/_browse/about")({
	component: About,
});

function About() {
	return (
		<div
			className={clsx(
				"page-container",
				"box-border",
				"w-full h-full max-h-full",
				"overflow-y-auto",
				"overflow-x-hidden",
			)}
		>
			<div
				id="about-page"
				className={clsx(
					"relative",
					"w-full h-auto",
					"bg-linear-to-b from-secondary-200 to-secondary-300 bg-fixed",
					"font-website",
				)}
			>
				<div
					className={clsx(
						"fixed",
						"z-4",
						"pointer-events-none",
						"size-full",
						"bg-[url('https://assets.hellogirls.info/portfolio/assets/texture.png')]",
						"bg-fixed bg-repeat",
						"opacity-15",
						"mix-blend-multiply",
					)}
				></div>
				<div
					id="about-page-container"
					className={clsx(
						"relative",
						"z-6",
						"w-full max-w-3xl min-h-full",
						"m-auto",
						"bg-base-50",
						"pb-4",
						"border-x border-dashed border-secondary-700",
					)}
				>
					<header
						id="about-page-header"
						className={clsx(
							"relative",
							"w-full h-65",
							"bg-[url('https://assets.hellogirls.info/portfolio/assets/header3.gif')] bg-cover bg-bottom",
							"flex items-center justify-center",
						)}
					>
						<h1
							className={clsx(
								"text-5xl",
								"text-base-50",
								"p-2",
								"text-center",
								"text-shadow-lg",
								"font-bold",
							)}
						>
							About me!!
						</h1>
					</header>
					<div className="w-full mt-4 bg-primary-600">
						<Marquee speed={50} className="font-serif text-base-50">
							welcome to my website!!!!!!!!!!! have a great day :)
						</Marquee>
					</div>
					<div id="about-content" className="font-serif px-4 py-2">
						<p>
							{[
								"CM150sW.png",
								"Uta4nHJ.gif",
								"caramel.gif",
								"kjXOi91.gif",
								"meta9.jpg",
								"wiggly.png",
								"alphys.png",
								"bunnie.png",
								"mymelo.png",
								"parappa.png",
								"snufkin.png",
								"homestuck.gif",
								"goredoq-bonzi-buddy-stamp.gif",
								"blinkblink.gif",
							].map((file) => (
								<img
									alt={file}
									key={file}
									src={`https://assets.hellogirls.info/portfolio/stamps/${file}`}
									className="inline"
								/>
							))}
							<br />
							{[
								"forumlurker.gif",
								"neversleep.gif",
								"got_love.gif",
								"online_friends.gif",
								"JCqeEwu.gif",
							].map((file) => (
								<img
									alt={file}
									key={file}
									src={`https://assets.hellogirls.info/portfolio/stamps/${file}`}
									className="inline"
								/>
							))}
							<br />
							(stamps from{" "}
							<a
								href="https://clampshell.neocities.org/stamps"
								className="underline text-primary-500"
								target="_blank"
								rel="noreferrer"
							>
								neocities :3
							</a>
							)
						</p>
						<hr className="my-4" />
						<p className="mt-2">
							hi!! my name is son and i am the webmaster for hellogirls.info. i
							can't share my real name because of internet safety u_u i love
							spending time online!! i love watching cat videos and looking at
							funny memes.
						</p>
						<h2 className="text-primary-600 mt-4 mb-2 text-2xl font-website">
							Things I like
						</h2>
						<p>
							<ul className="list-disc ml-4">
								<li>
									<strong>pokemon!!!!!!</strong>
								</li>
								<li>cats</li>
								<li>animal crossing</li>
								<li>cosplay</li>
								<li>public transit</li>
								<li>anime idols</li>
								<li>hyperpop music</li>
								<li>making websites</li>
							</ul>
						</p>
						<h2 className="text-primary-600 mt-4 mb-2 text-2xl font-website">
							My Coding Journey
						</h2>
						<p>
							i started coding at a very young age (when i was ten years old!).
							it's embarrassing to admit, but what got me into web design was
							seeing the various pokemon fansites that were popular in the mid
							2000's to early 2010's. it was a niche community, yet i wouldn't
							be where i am if i never discovered them. i expanded my knowledge
							of coding in high school, where i learned object-oriented
							programming. then, i picked up the tools necessary for front-end
							development in college and managed to score myself some
							internships.
						</p>
						<h2 className="text-primary-600 mt-4 mb-2 text-2xl font-website">
							About this Portfolio
						</h2>
						<p>
							i wanted to invoke how the internet looked when i first started
							coding. i remember booting up our shared family computer on the
							weekends and being greeted by windows vista. i would type out html
							pages in notepad and share the finished product with my friends.
							the internet was so customized and had a lot of personality.
							replicating the shiny, maximalist vibes of frutiger aero in an
							accessible way is my own challenge as a design engineer.
						</p>
					</div>
					<footer className="bg-primary-700 w-full"></footer>
				</div>
			</div>
		</div>
	);
}
